import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import JoditEditor from "jodit-react";

export function AddCommission() {
  const editor = useRef(null);
  const [examSection, setExamSection] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [server_error,setServer_error] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      examSection: "",
    },
    onSubmit: (values,{resetForm}) => {
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/ExamApp/commissionCreate/",
        data: values,
        })
        .then(() => {
          alert("Commission Added");
          resetForm();
        })
        .catch((error) => {
          setServer_error(error.response.data)
        });
        navigate('/addExam');
    },
  });
  const nameFromState = location.state?.name;
  useEffect(() => {
    fetch("http://127.0.0.1:8000/ExamApp/examSectionList/")
      .then((response) => response.json())
      .then((data) => {
        setExamSection(data);
        console.log(data);
      })
      .catch((error)=>{
        console.error("Error fetching exam Section",error);
      })
  }, []);

  const handleEditorChange = (newContent) => {
    formik.setFieldValue("description", newContent);
    };

return (
    <div className="container bg-light shadow my-3">
      <div className="jumbotron jumbotron-fluid py-3 px-3">
        <h4>Add Commission</h4>
        <h4>{nameFromState}</h4>
        <form noValidate onSubmit={formik.handleSubmit}>
          <dl>
            <dt>Commission Name</dt>
            <dd>
              <input type="text" required className="form-control" name="name" onChange={formik.handleChange} value={formik.values.name}/>
              {server_error && server_error.name? <span><small className="text-danger">{server_error.name}</small></span>:""}
            </dd>
            <dt>Description</dt>
            <dd>
              <JoditEditor className="form-control" name="description" ref={editor} tabIndex={2} onChange={handleEditorChange} value={formik.values.description}/>
            </dd>
            <dt>Exam Section</dt>
            <dd>
              <select className="form-select" aria-label="Default select example" name="examSection" onChange={formik.handleChange} value={formik.values.examSection}>
                <option value="">select</option>
                {examSection.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </dd>
          </dl>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
          <h5>
            <Link to="/addExam">Add Exam</Link>
          </h5>
        </form>
      </div>
    </div>
  );
}
