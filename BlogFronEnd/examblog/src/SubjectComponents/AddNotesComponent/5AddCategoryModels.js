import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AddCategory(){
    const [subject,setSubject] = useState([]);
    // navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            Category:"",
            subject:"",
        },
        onSubmit:(values,{resetForm})=>{
            alert(JSON.stringify(values));
            axios({
                method : "POST",
                url : "http://127.0.0.1:8000/ExamApp/categoryCreate/",
                data : values,
            }).then(()=>{
                alert("Exam Added")
                resetForm()
            })
            .catch((error)=>{
                console.error("Error:-",error)
            }); 
            // navigate("/")
        }
    })
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/ExamApp/subjectList/")
        .then((response)=>response.json())
        .then((data)=>{
            setSubject(data)
            console.log(data);
        })
    },[])
    return(
        <div className="container bg-light shadow my-3">
            <div className="jumbotron jumbotron-fluid py-3 px-3">
                <h3>Add Category</h3>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt className="mt-3 mb-1">Name</dt>
                        <dd><input type="text" className="form-control" name="Category" onChange={formik.handleChange} value={formik.values.Category}/></dd>
                        <dt className="mt-3 mb-1">Subject</dt>
                        <dd>
                            <select className="form-select" aria-label="Default select example" name="subject" onChange={formik.handleChange} value={formik.values.subject}>
                                <option value="">select</option>
                                    {
                                        subject.map((subjectList)=>(
                                            <option key={subjectList.id} value={subjectList.id}>{subjectList.name}</option>
                                        ))
                                    }
                            </select>
                        </dd>
                    </dl>
                    <button type="submit" className="btn btn-primary">Add</button>
                    <h5><Link to="/addChapter">Chapter</Link></h5>
                </form>
            </div>
        </div>
    )
}