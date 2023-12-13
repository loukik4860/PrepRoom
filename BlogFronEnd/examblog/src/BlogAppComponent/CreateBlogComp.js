import { useEffect,useRef,useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import JoditEditor from "jodit-react";

export function CreateBlog(){
    const [imageList,setImageList]= useState([]);
    const [tagList,setTagList] = useState([]);
    const editor = useRef(null);

    const formik = useFormik({
        initialValues:{
            title: "",
            sub_title : "",
            content : "",
            is_published : false,
            author : "",
            blog_title_image : "",
            tag : []
        },
        onSubmit:(values)=>{
            console.log(JSON.stringify(values));
            axios({
                method : "POST",
                url : "http://127.0.0.1:8000/blogApp/postblog/",
                data : values,
            })
            .then(()=>{
                alert("Blog Added")
            })
            .catch((error)=>{
                console.error("Error",error);
            });
        }
    });
    useEffect(() => {
        fetch("http://127.0.0.1:8000/blogApp/postImage/")
          .then((response) => response.json())
          .then((data) => {
            setImageList(data);
            console.log(data);
          });
        fetch("http://127.0.0.1:8000/blogApp/taglist/")
        .then((response)=>response.json())
        .then((data)=>{
            setTagList(data)
            console.log(data);
        })
      }, []); // Empty dependency array means this effect runs once, equivalent to componentDidMount
      const handleEditorChange = (newContent) =>{
        formik.setFieldValue("content",newContent);
      };
      return(
        <div className="container container-fluid my-3">
            <div className="container container-fluid bg-light p-3">
                <h5 className="text-center">Write Blog</h5>
                <form onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>Title</dt>
                        <dd>
                            <input type="text" className="form-control" name="title" onChange={formik.handleChange} value={formik.values.title}/>
                        </dd>
                        <dt>Sub Title</dt>
                        <dd>
                            <input type="text" className="form-control" name="sub_title"  onChange={formik.handleChange} value={formik.values.sub_title}/>
                        </dd>
                        <dt>Content</dt>
                        <dd>
                            <JoditEditor type="text" ref={editor} tabIndex = {2} className="form-control" name="content" onChange={handleEditorChange} value={formik.values.content}/>
                        </dd>
                        <dt>Title Image</dt>
                        <dd>
                            <select className="form-select mb-3" aria-label="Default select example" name="blog_title_image" onChange={formik.handleChange} value={formik.values.title} >
                                <option value="">select</option>
                                {
                                    imageList.map((image)=>(
                                        <option key={image.id} value={image.id}>{image.caption}</option>
                                    ))
                                }
                            </select>
                        </dd>
                        <dt>Tags</dt>
                        <dd>
                        <select className="form-select mb-3" multiple aria-label="Multiple select example" name="tag" onChange={formik.handleChange} value={formik.values.tag} size={15}>
                                {
                                    tagList.map((tag) => (
                                        <option key={tag.id} className="form-button" value={tag.id}>
                                            {tag.name}
                                        </option>
                                    ))
                                }
                            </select> 
                        </dd>
                        <div className="d-flex">
                           <dt>Is Published</dt>
                            <dd>
                                <div className="form-check form-switch">
                                    <input className="form-check-input mx-0 mt-2 mb-3" type="checkbox" id="flexSwitchCheckChecked" name="is_published" onChange={formik.handleChange} value={formik.values.tag}  />
                                </div>
                            </dd> 
                        </div>
                    </dl>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}