import { useEffect, useState } from "react"


export function GeographyCarasoul(){
    const[geographyList,setGeographyList] = useState([]);
    const[geographyIndex,setGeographyIndex] = useState(0);
    
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/24/") //Geography
        .then(response=>response.json())
        .then((data)=>{
            setGeographyList(data);
        });  
    },[])
    
    const HandleGeographyCarasouselChange=(direction)=>{
        const newIndex = direction === "prev" ? (geographyIndex - 1 + geographyList.length) % geographyList.length
        : (geographyIndex + 1) % geographyList.length;
    
    // Set the new index in the state
        setGeographyIndex(newIndex);
    }
    return(
        <div className="container">
          <div  id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-indicators">
                    {
                        geographyList.map((geography,index4)=>(
                            <button key={index4} 
                            type="button" 
                            data-bs-target="#carouselExampleDark3"
                            data-bs-slide-to={index4}
                            className={index4 === 0 ? "active" : ""}
                            aria-current={index4 === 0 ? "true" : ""}
                            aria-label={`Slide ${index4 + 1}`}
                        ></button>
                        ))
                    }
                </div>
                <div className="carousel-inner">
                    {
                        geographyList.map((geography,index4)=>(
                            <div key={index4}  className={`carousel-item ${index4 === geographyIndex ? "active" : ""}`}>
                                <img style={{ width: '54rem', height: '25rem' }} src={geography.Title_image?.image} className="img-fluid d-block w-100 px-3" alt={geography.blogTitleImage?.caption} />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className="bg-light">{geography.title}</h5>
                                    <h6 className="bg-light mx-5">{geography.subTitle}</h6>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark3" data-bs-slide="prev" onClick={() => HandleGeographyCarasouselChange("prev")}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark3" data-bs-slide="next" onClick={() => HandleGeographyCarasouselChange("next")}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>  
        </div>
    )
}