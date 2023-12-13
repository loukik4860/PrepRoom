import { useState,useEffect } from "react"
import { Link } from "react-router-dom";


export function CategoryComponent(){
    const [examSection,examSectionList] = useState([]);
    const [commissionList,setcommissionList] = useState([]);
    const [selectedExamId,setSelectedId] = useState(null);
    useEffect(() => {
        fetch("http://127.0.0.1:8000/ExamApp/examSectionList/")
          .then((response) => response.json())
          .then((data) => {
            examSectionList(data);
            console.log(data);
            if(data.length>0){
                handleExamSectionClick(data[0].id);
            }
          });
        
      }, []);
    
    const handleExamSectionClick=(examId)=>{
        fetch(`http://127.0.0.1:8000/ExamApp/commissionExam/${examId}/`)
        .then((response)=>response.json())
        .then((data)=>{
            setcommissionList(data);
            console.log(data);
        });
        setSelectedId(examId);
    }
    
    return (
        <div className="container-sm">
            <div className="jumbotron bg-light shadow my-3 py-3" >
                    <div className="row">
                        <div className="col-md-3 ">
                            <div className="card mx-3" style={{ width: "21rem" }}>
                                {/* ExamSection Links */}
                                <div className="card-header">Featured</div>
                                <ul className="list-group list-group-flush">
                                    {examSection.map((section) => (
                                        <Link
                                            key={section.id}
                                            className={`list-group-item list-group-item-action ${
                                                selectedExamId === section.id ? "list-group-item-info" : ""
                                            }`}
                                            onClick={() => handleExamSectionClick(section.id)}>
                                        {section.name}
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-9 ">
                            <div className="container">
                                {/* Commission Cards */}
                                <div className="row row-cols-1 row-cols-md-3 g-4 mx-2">
                                    {commissionList.map((commission) => (
                                        <div key={commission.id} className="col">
                                            <div className="card">
                                                <div className="card-body">
                                                    {/* Card content */}
                                                    <h5 className="card-title">{commission.name}</h5>
                                                    <h6 className="card-subtitle mb-2 text-body-secondary">
                                                        {commission.examSection.name}
                                                    </h6>
                                                    <p className="card-text">
                                                        Some quick example text to build on the card title and make up
                                                        the bulk of the card's content.
                                                    </p>
                                                    <Link className="card-link">Card link</Link>
                                                    <Link className="card-link">Another link</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    );
}