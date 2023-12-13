import axios from "axios";
import { useFormik } from "formik"
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

export function AddSubject(){
    const [exam,setExam] = useState([])
    const editor = useRef(null);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues : {
            name : "",
            abbreviation : "",
            description : "",
            exam : "",
        },
        onSubmit:(values,{resetForm})=>{
            alert(JSON.stringify(values));
            axios({
                method : "POST",
                url : "http://127.0.0.1:8000/ExamApp/subjectCreate/",
                data : values,
            })
            .then(()=>{
                alert("Exam Added")
                resetForm()
            })
            .catch((error)=>{
                console.error("Error:-",error)
            }); 
            navigate("/addCategory")
        }
    })
    
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/ExamApp/examList/")
        .then((response)=>response.json())
        .then((data)=>{
            setExam(data);
            console.log(data);
        })
    },[])
    
    const handleEditorChange = (newContent) =>{
        formik.setFieldValue("description",newContent);
    };
    
    return(
        <div className="container bg-light shadow my-3">
            <div className="jumbotron jumbotron-fluid py-3 px-3">
                <h3>Add Subject</h3>
                <form noValidate onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt className="mt-3 mb-1">Name</dt>
                        <dd><input type="text" className="form-control" name="name" onChange={formik.handleChange} value={formik.values.name}/></dd>
                        <dt className="mt-3 mb-1">Abbreviation</dt>
                        <dd><input type="text" className="form-control" name="abbreviation" onChange={formik.handleChange} value={formik.values.abbreviation}/></dd>
                        <dt className="mt-3 mb-1">Description</dt>
                        <dd><JoditEditor type="text" className="form-control"
                                name="description"
                                value={formik.values.description}
                                ref={editor}
                                tabIndex = {2}
                                onChange={handleEditorChange}
                                />
                        </dd>
                        <dt className="mt-3 mb-1">Exam</dt>
                        <dd>
                            <select className="form-select" aria-label="Default select example" name="exam" onChange={formik.handleChange} value={formik.values.exam}>
                                <option value="">select</option>
                                    {
                                        exam.map((examList)=>(
                                            <option key={examList.id} className="text-dark" value={examList.id}>{examList.name}</option>
                                        ))
                                    }
                            </select>
                        </dd>
                    </dl>
                    <button type="submit" className="btn btn-primary">Add</button>
                    <h5><Link to="/addCategory">Category</Link></h5>
                </form>
            </div>
        </div>
    )
}