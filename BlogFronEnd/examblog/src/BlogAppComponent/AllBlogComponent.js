import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../BlogAppComponent/static/HomeComponentsCss.css'
import { TagComponent } from "./TagComponent";

// ... (your other imports)

export function AllBlogComponent() {
    const [blogContent, setBlogContent] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/blogApp/postblog/')
            .then(response => response.json())
            .then(data => {
                setBlogContent(data);
                console.log(data);
            });
    }, []);
    
    const extractFirst50Words = (content) => {
        const words = content.split(" ");
        if (words.length <= 50) {
            return content;
        }
        return words.slice(0, 50).join(" ") + " ...";
    };

    return (
        <div className="container">
            <div className="container container-fluid bg-light mt-3">
                <span className="text-center">
                    <h5>Advertisement</h5>
                </span>
            </div>
            <div className="container container-fluid bg-light mt-2 pt-2">
                {blogContent && blogContent.map((blog, index) => (
                    <div className="card shadow p-2 my-1 mx-3 rounded" key={index}>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card-body rounded border-1">
                                    <img
                                        src={blog.TitleBlog.image}
                                        className="card-img-top img-fluid" // Added Bootstrap class img-fluid
                                        alt={blog.TitleBlog.id}
                                    />
                                </div>
                            </div>
                            <div className="col-md-9 ">
                                <div className="card-body">
                                    <Link
                                        className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap"
                                        to={'/singleblog/' + blog.id}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <h5 className="title">{blog.title}</h5>
                                    </Link>
                                    <hr/>
                                    <p className="paragraphContent">{blog.sub_title}</p>
                                    {
                                        blog.Tag.map((tags,index)=>(
                                            <button key={tags.id} className="btn btn-danger btn-sm mt-3 mx-1">{tags.name}</button>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="container container-fluid bg-light">
                <span className="text-center">
                    <h5>Advertisement</h5>
                </span>
            </div>
            <div className="container container-fluid bg-light mb-3">
                <TagComponent />
            </div>
        </div>
    );
}
