import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AddChapter() {
  const [category, setCategory] = useState([]);

  const formik = useFormik({
    initialValues: {
      chapterName: "",
      category: "",
    },
    onSubmit: (values,{resetForm}) => {
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/ExamApp/ChapterCreate/",
        data: values,
      })
      .then(() => {
        alert("Chapter Added");
        resetForm()
      })
      .catch((error) => {
        console.error("Error:", error);
        resetForm()
        // Handle error as needed
      });
    },
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ExamApp/categoryList/")
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="container bg-light shadow my-3">
      <div className="jumbotron jumbotron-fluid py-3 px-3">
        <h3>Add Chapter</h3>
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dt>Chapter Name</dt>
            <dd>
              <input
                type="text"
                className="form-control"
                name="chapterName"
                onChange={formik.handleChange}
                value={formik.values.chapterName}
              />
            </dd>
            <dt>Category</dt>
            <dd>
              <select
                className="form-select"
                aria-label="Default select example"
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
              >
                <option value="">select</option>
                {category.map((categoryList) => (
                  <option
                    key={categoryList.id}
                    className="text-dark"
                    value={categoryList.id}
                  >
                    {categoryList.Category}
                  </option>
                ))}
              </select>
            </dd>
          </dl>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        <h5><Link to="/addNote">Notes</Link></h5>
      </div>
    </div>
  );
}
