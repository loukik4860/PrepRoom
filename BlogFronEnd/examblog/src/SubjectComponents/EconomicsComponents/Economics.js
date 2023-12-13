import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TagComponent } from "../../BlogAppComponent/TagComponent";
import "./economics.css";  // Assuming your CSS file is in the same directory
import { AlsoReadComponent } from "../../ExamComponent/AlsoReadComponent";


export function Economics() {
  const [categoryList, setcategoryList] = useState([]);
  const [chapterList,setChapterList] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  
  useEffect(() => {
    fetch("http://127.0.0.1:8000/ExamApp/categoryList/economics/")
      .then((response) => response.json())
      .then((data) => {
        setcategoryList(data);
        console.log(data);
        console.log("data:-",data[1]);
        if(data.length>0){
          handleCategoryClick(data[0].id);
        }
      });
  }, []); // Pass an empty dependency array

  const handleCategoryClick = (categoryId) => {
    fetch(`http://127.0.0.1:8000/ExamApp/ChapterCategory/${categoryId}/`)
    .then(response=>response.json())
    .then((data)=>{
      setChapterList(data);
      console.log(data);
    });
    setSelectedCategoryId(categoryId);
  }

  const subjectName = categoryList.length > 0 ? categoryList[0].Related_Subject?.name : '';

  return (
    <div className="container-sm">
      <div className="jumbotron shadow rounded-top bg-light mt-3">
        <div className="container">
          <h2 className="ps-1 pt-2" id="Politytitle">{subjectName}</h2>
            <hr/>
              <div className="row">
                <div className="col-md-3 my-3">
                  <div className="list-group">
                      <button type="button" className="list-group-item list-group-item-danger text-center" aria-current="true">
                        Category
                      </button>
                      {
                        categoryList.map((category)=>(
                          <Link className={`list-group-item list-group-item-action ${
                            selectedCategoryId === category.id ? "list-group-item-info" : ""
                            }`}  key={category.id} onClick={()=>handleCategoryClick(category.id)}>
                            {category.Category}
                          </Link>
                        ))
                      }
                        <button type="button" className="list-group-item list-group-item-action">Syllabus</button>
                        <button type="button" className="list-group-item list-group-item-action" disabled>Test</button>
                  </div>
                </div>
                <div className="col-md-6 my-3">
                  <div className="jumbotron bg-light">
                    <div className="container">
                      <div className="list-group">
                        <span className="list-group-item list-group-item-danger text-center" aria-current="true">
                          Chapter's
                        </span>
                          {
                              chapterList.map((chapter)=>(
                                  <Link to={"/topic/"+ chapter.id} key={chapter.id} className="list-group-item list-group-item-action " >
                                    {chapter.chapterName}
                                  </Link>
                              ))
                          }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 my-3 ">
                                    <div className="jumbotron">
                                        <div className="container">
                                            <div className="list-group">
                                                <span className="px-5 list-group-item list-group-item-danger text-center" aria-current="true">
                                                    Daily Update
                                                </span>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
              </div>
          </div>
      </div>
      <div className="container-sm pt-3">
        <div className="row">
          <div className="jumbotron shadow bg-light">
            <div className="container">
              <h5 className="text-center">Advertisement</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="container-sm pt-3">
        <div className="row">
          <div className="jumbotron shadow bg-light">
            <div className="container">
              <h5>
                <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap" to="/ecoNotes">
                  Notes
                </Link>
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* Also Read */}
      <div className="container-sm pt-3">
                <div className="row">
                    <div className="jumbotron shadow bg-light">
                        <div className="container">
                            <h5 className="text-center">Also read</h5>
                            <AlsoReadComponent subjectName={subjectName}/>
                        </div>
                    </div>
                </div>
            </div>
            {/* Also Read */}
      <div className="container-sm pt-3">
        <div className="row">
          <div className="jumbotron shadow bg-light">
            <div className="container pb-3">
              <TagComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
