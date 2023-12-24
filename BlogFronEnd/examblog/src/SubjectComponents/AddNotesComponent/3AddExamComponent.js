import axios from "axios";
import { useFormik } from "formik"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import JoditEditor from "jodit-react";

export function AddExam(){
    const [commissionList,setCommissionList] = useState([]);
    const editor = useRef(null);
    // const navigate = useNavigate();
    const [server_error,setServer_error] = useState({});
    const formik = useFormik({
        initialValues : {
            name : "",
            abbreviation: "",
            description : "",
            commission : "",
        },
        onSubmit : (values,{resetForm}) =>{
            alert(JSON.stringify(values));
            axios({
                method : "POST",
                url :   "http://127.0.0.1:8000/ExamApp/examCreate/",
                data : values,
            })
            .then(()=>{
                alert("Exam Added")
                resetForm()
            })
            .catch((error)=>{
                console.error("Error:-",error)
                console.log("Error",error.response.data);
                setServer_error(error.response.data);
            });       
        },
    });

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/ExamApp/commissionList/")
        .then((response)=>response.json())
        .then((data)=>{
            setCommissionList(data)
            // console.log("commission List:-",data);
        })
    },[]);
    
    const handleEditorChange = (newContent) => {
        formik.setFieldValue("description", newContent);
        };
    
    return(
        <div className="container bg-light shadow my-3">
            {server_error && server_error.name ? console.log(server_error.name):"" }
            <div className="jumbotron jumbotron-fluid py-3 px-3">
                <h4>ADD EXAM</h4>
                <form noValidate onSubmit={formik.handleSubmit} className="" >
                    <dl>
                        <dt className="mt-3 mb-1" >Name</dt>
                        <dd><input type="text" className="form-control" name="name"value={formik.values.name} onChange={formik.handleChange}/></dd>
                        {server_error && server_error.name ? <span><small className="text-danger">{server_error.name}</small></span>:"" }
                        <dt className="mt-3 mb-1" >Abbreviation</dt>
                        <dd><input type="text" className="form-control" name="abbreviation" value={formik.values.abbreviation} onChange={formik.handleChange} /></dd>
                        <dt className="mt-3 mb-1" >Description</dt>
                        <dd><JoditEditor type="text" rows="10" tabIndex={2} ref={editor} className="form-control" name="description" value={formik.values.description} onChange={handleEditorChange} /></dd>
                        <dt className="mt-3 mb-1">Commission</dt>
                        <dd>
                            <select className="form-select" aria-label="Default select example" name="commission" onChange={formik.handleChange} value={formik.values.commission}>
                                <option value="">select</option>
                                    {
                                        commissionList.map((section)=>(
                                            <option key={section.id} value={section.id}>{section.name}</option>
                                        ))
                                    }
                            </select>
                        </dd>
                    </dl>
                    <button type="submit" className="btn btn-primary">Add</button>
                    <h5><Link to="/addSubject">Subject</Link></h5>
                </form>
            </div>
        </div>
    )
}