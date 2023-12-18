import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../BlogAppComponent/static/TagDetailsComponent.css"
import { TagComponent } from "./TagComponent";



export function TagDetailsComponent() {
  const params = useParams();
  const [tagData, setTagData] = useState([]);
  const [NotesTagData,setNotesTagData] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/blogApp/taglist/${params.id}`)
      .then(response => response.json())
      .then(data => {
        console.log("blog Tag data:-",data);
        setTagData(data);
        
      });

    fetch(`http://127.0.0.1:8000/ExamApp/notesTags/${params.id}/`)
    .then(response => response.json())
    .then(data => {
      console.log("Notes Blog data:-",data);
      setNotesTagData(data);
    });
  }, [params.id]);

  const extractFirst50Words = (content) => {
    const words = content.split(" ");
    if (words.length <= 50) {
      return content;
    }
    return words.slice(0, 50).join(" ") + "...";
  };

  return (
    
    <div className="container mt-5">
      <div className="row">
        <div className="jumbotron jumbotron-fluid">
          {
            tagData.map(tags => (
            <div key={tags.id}> 
              <h4 className="tagName ms-3">{tags.name}</h4>
                <div className="container">
                  {
                    tags.tag && tags.tag.map(blog => (
                    <div className="card shadow p-3 mb-1 mt-3 bg-body-tertiary bg-white rounded shadow" key={blog.id}>
                      <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover" to={'/singleblog/'+blog.id}>
                        <h5 className="blogTitle ms-3">{blog.title}</h5>
                      </Link>
                      <hr className="border border-danger border-1 opacity-25" />
                      <p className="mb-4">{extractFirst50Words(blog.content)}</p>
                      <div className="d-flex ms-2">
                        {
                          blog.Tag && blog.Tag.map((Tags=>(
                            <Link key={Tags.id} to={`/tagDetails/${Tags.id}`} target="_blank" rel="noopener noreferrer">
                              <button className="btn btn-danger btn-sm ms-2">{Tags.name}</button>
                            </Link>
                            
                          )))
                        }
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          ))
          }
        </div>
      </div>
      <div className="row">
        <div className="jumbotron jumbotron-fluid">
          {
            NotesTagData.map(notes=>(
              <div key={notes.id}>
                  <div className="container">
                    <div className="card shadow p-3 mb-1 mt-3 bg-body-tertiary bg-white rounded shadow" key={notes.id}>
                      <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover" to={'/singleblog/'+notes.id}>
                        <h5 className="blogTitle ms-3">{notes.title}</h5>
                      </Link>
                        <hr className="border border-danger border-1 opacity-25" />
                        <p className="mb-4">{extractFirst50Words(notes.content)}</p>
                      <div className="d-flex ms-2">
                        {
                          notes.Tags.map(notesTags => (
                            <Link key={notesTags.id} to={`/tagDetails/${notesTags.id}`} target="_blank" rel="noopener noreferrer">
                              <button type="button" className="btn btn-danger btn-sm ms-2">{notesTags.name}</button>
                            </Link>
                        ))}
                      </div>
                    </div>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="row">
          <TagComponent/>
      </div>
    </div>
  );
}
