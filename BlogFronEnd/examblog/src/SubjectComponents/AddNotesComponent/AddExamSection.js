import { useFormik } from "formik"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";



export function AddExamSection(){
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues:{
            name : "",
            abbreviation : ""
        },
        onSubmit: (values,{resetForm}) => {
            axios({
              method: "POST",
              url: "http://127.0.0.1:8000/ExamApp/examSectionCreate/",
              data: values,
            })
              .then((response) => {
                console.log("ExamSection added successfully", response.data);
                alert("ExamSection added successfully");
              })
              .catch((error) => {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.error("Error adding ExamSection", error.response.data);
                  if (error.response.data.abbreviation) {
                    alert(`Error: ${error.response.data.abbreviation[0]}`);
                  } else {
                    alert("An error occurred while adding ExamSection");
                  }
                  resetForm()
                } else if (error.request) {
                  // The request was made but no response was received
                  console.error("No response received", error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.error("Error setting up the request", error.message);
                }
              });
              navigate("/addCommission" ,{ state: { name: formik.values.name } })
          }
    })
    return(
        <div className="container bg-light shadow my-3">
          <div className="jumbotron jumbotron-fluid py-3 px-3">
            <h3>Add Exam Section</h3>
              <form onSubmit={formik.handleSubmit}>
                  <dl>
                      <dt>Name</dt>
                      <dd><input type="text" className="form-control" name="name" onChange={formik.handleChange} value={formik.values.name}/></dd>
                      <dt>Abbreviation</dt>
                      <dd><input type="text"  className="form-control" name="abbreviation" onChange={formik.handleChange} value={formik.values.abbreviation}/></dd>
                  </dl>
                  <button className="btn btn-primary">Add</button>
              </form>
              <h5><Link to="/addCommission">Commission</Link></h5>
          </div>
        </div>
    )
}