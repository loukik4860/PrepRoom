import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../BlogAppComponent/static/SingleComponent.css"


export function SingleBlogComponent() {
  const params = useParams();
  const [bid, setId] = useState();
  const [blog, setBlog] = useState({}); // Initialize with an empty object

  useEffect(() => {
    setId(params.id);
    fetch(`http://127.0.0.1:8000/blogApp/postblog/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBlog(data);
      });
  }, [params.id]); 

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
        <div className="container container-fluid bg-light shadow my-3">
            <div className="container-sm">
                <div className="d-flex flex-wrap">
                   {
                        blog.Tag &&
                        blog.Tag?.map((tag) => (
                        <Link key={tag.id} to={'/tagDetails/'+tag.id}><button className="btn btn-danger btn-sm mt-3 mx-1" >{tag.name?.toUpperCase()}</button></Link>
                        ))
                    } 
                </div>
                <div className="row">
                    <div className="col-2">
                        
                    </div>
                    <div className="col-10">
                      <div className="my-1">
                            <h3 className="text-center py-1">{blog.title}</h3>
                        </div>
                        <div className="">
                             <p className="fw-lighter fst-italic">{blog.sub_title}</p>
                        </div>  
                    </div>
                </div>
                <hr className="hr hr-blurry"/>
                <div className="ImageDiv">
                    {
                        blog.TitleBlog && (
                        <img id="titleImg" src={blog.TitleBlog.image} alt={blog.TitleBlog.caption} key={blog.TitleBlog.id} className="px-1" />
                    )}
                </div>
                <hr/>
                <div className="row">
                    <div className="col3 col-md-3">
                        <p>Author</p>
                        <p>Name:- {blog.Author?.Author_firstName} {blog.Author?.Author_lastName} </p>
                        <p>{formatDate(blog.publish_date)}</p>
                    </div>
                    <div className="col-md-9">
                        <p>{blog.content}</p>
                        <hr/>        
                    </div>
                </div>
            </div>
        </div>
  );
}
