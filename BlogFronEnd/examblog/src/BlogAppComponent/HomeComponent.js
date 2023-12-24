import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../BlogAppComponent/static/HomeComponentsCss.css'
import { NotificationTable } from "../ExamComponent/NotificationTable";
import { HistoryCarasoul } from "./HomeCarasoul/HistoryCarasoul";
import { GACarasoul } from "./HomeCarasoul/GACarasoul";
import { CACarasoul } from "./HomeCarasoul/CACarasoul";
import { PolityCarasoul } from "./HomeCarasoul/PolityCarasoul";
import { GeographyCarasoul } from "./HomeCarasoul/GeographyCarasoul";
import { EcoCarasoul } from "./HomeCarasoul/EcoCarasoul";
import { EnglishCarasoul } from "./HomeCarasoul/EnglishCarasoul";
import { TagComponent } from "./TagComponent";
import "animate.css";


export function HomeComponent(){
    
    const[blogList,setBlogList] = useState([]);
    const[scienceList,setScienceList] = useState([]);
    

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/blogApp/postblog/')
        .then(response=>response.json())
        .then((data)=>{
            setBlogList(data);
            console.log(data);
        });
        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/4/") //Science
        .then(response=>response.json())
        .then((data)=>{
            setScienceList(data);
        });

    },[blogList.id]); 
    return(
        <div className="container-sm">
            <div className="jumbotron">
                <div className="row">
                    <div className="col-lg-8 mt-2">
                        <div className="col3 mt-2 shadow border border-dark-subtle rounded bg-light">
                            <div className="mx-3 mb-3">
                              <h5 className="my-2" id="title">
                                Blog
                              </h5>  
                            </div>
                            
                            <hr className="mx-3" />
                            <div className="col1">
                                <div id="carouselExampleDark" className="carousel carousel-dark slide">
                                    <div className="carousel-indicators">
                                        {blogList.map((blog, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                data-bs-target="#carouselExampleDark"
                                                data-bs-slide-to={index}
                                                className={index === 0 ? "active" : ""}
                                                aria-current={index === 0 ? "true" : ""}
                                                aria-label={`Slide ${index + 1}`}>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="carousel-inner">
                                        {blogList.map((blog, index) => (
                                            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                <img
                                                    style={{ maxWidth: '100%', height: '25rem' }}
                                                    src={blog.TitleBlog?.image}
                                                    className="img-fluid d-block w-100 px-3"
                                                    alt={blog.blogTitleImage?.caption}
                                                />
                                                <div className="carousel-caption d-none d-md-block">
                                                    <h5 className="bg-light">{blog.title}</h5>
                                                    <h6 className="bg-light mx-5">{blog.subTitle}</h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 mt-2">
                        <div className="mt-2 shadow border border-dark-subtle rounded bg-white" style={{ height: "98%" }}>
                            <Link to="/notification" className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap"><h5 className="mt-2 ms-3" id="title">
                                Notification
                            </h5></Link>
                            <hr className="mx-2 my-3" />
                            <NotificationTable/>
                            
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                            <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap" to="/ga"><h5 className="mt-2 ms-3" id="title">General Awareness</h5></Link>
                            <hr className="mx-3"/>
                                <div className="col2">
                                    <GACarasoul/>
                                </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                            <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap" to="/ca"><h5 className="mt-2 ms-3" id="title">Current Affairs</h5></Link>
                            <hr className="mx-3"/>
                                <div className="col2">
                                    <CACarasoul/>
                                </div>    
                        </div>
                    </div>    
                </div>
                <noscript>
                    <div className="row mt-2 px-2">
                    <div className="col2 mt-2 mb-0  shadow border border-dark-subtle rounded bg-light">
                        <h5 className="mt-2 ms-3" id="title">Advertisement</h5>
                            <div className="col2">
                                
                            </div>
                    </div>
                </div>
                </noscript>
                
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                            <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap" to="/polity"><h5 className="mt-2 ms-3" id="title">Polity</h5></Link>    
                                <hr className="mx-3"/>
                                    <div className="col2">
                                        <PolityCarasoul/>
                                    </div> 
                        </div>  
                    </div>
                    <div className="col-md-6 ">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                         <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap" to="/geography"><h5 className="mt-2 ms-3" id="title">Geography</h5></Link>
                            <hr className="mx-3"/>
                                <div className="col2">
                                    <GeographyCarasoul/>
                                </div>  
                        </div>
                    </div>    
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                            <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap" to="history"><h5 className="mt-2 ms-3" id="title">History</h5></Link>
                                <hr className="mx-3"/>
                                    <div className="col2">
                                        <HistoryCarasoul/>
                                    </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                            <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                                <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap" to="/eco"><h5 className="mt-2 ms-3" id="title">Economy</h5></Link>    
                                    <hr className="mx-3"/>
                                        <div className="col2">
                                           <EcoCarasoul/>
                                        </div>
                            </div>
                    </div>

                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                           <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap" to="/eng"><h5 className="mt-2 ms-3" id="title">English</h5></Link>
                                <hr className="mx-3"/>
                                    <div className="col2">
                                        <EnglishCarasoul/>
                                    </div> 
                        </div>
                    </div>
                    <div className="col-md-6">
                            <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                                <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap"><h5 className="mt-2 ms-3" id="title">Science</h5></Link>    
                                    <hr className="mx-3"/>
                                        <div className="col2">
                                            {
                                                scienceList.map((science,index)=>
                                                    <div key={index}>
                                                        <ul>
                                                            <li>{science.title}</li>
                                                        </ul>
                                                    </div>
                                                )
                                            }
                                        </div>
                            </div>
                    </div>
                </div>
                <noscript>
                  <div className="row mt-2 px-2">
                    <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                        <h5 className="mt-2 ms-3" id="title">Advertisement</h5>
                            <div className="col2">
                                
                            </div>
                    </div>
                </div>  
                </noscript>
                <div className="container container-fluid bg-light mb-3">
                    <TagComponent/>
                </div>
            </div>
        </div>
    )
}
