import { useEffect, useState } from "react";

export function GACarasoul() {
  const[generalAwareness,setGeneralAwareness] = useState([]);
  const[generalAwarenessIndex, setGeneralAwarenessIndex] = useState(0);
  
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/ExamApp/noteSubject/17/") // general awareness
        .then(response=>response.json())
        .then((data)=>{
            setGeneralAwareness(data);
            console.log("general:-",data);
        });
  },[])

  const handleGeneralAwarenessCarouselChange = (direction) =>{
    const newIndex = direction === "prev" ? (generalAwarenessIndex - 1 + generalAwareness.length) % generalAwareness.length
    : (generalAwarenessIndex + 1) % generalAwareness.length;

// Set the new index in the state
    setGeneralAwarenessIndex(newIndex);
}

  return (
    <div className="container">
        <div  id="carouselExampleDark" className="carousel carousel-dark slide">
          <div className="carousel-indicators">
              {
                  generalAwareness.map((general,index1)=>(
                      <button key={index1} 
                      type="button" 
                      data-bs-target="#carouselExampleDark1"
                      data-bs-slide-to={index1}
                      className={index1 === 0 ? "active" : ""}
                      aria-current={index1 === 0 ? "true" : ""}
                      aria-label={`Slide ${index1 + 1}`}
                  ></button>
                  ))
              }
          </div>
          <div className="carousel-inner">
              {
                  generalAwareness.map((general,index1)=>(
                      <div key={index1}  className={`carousel-item ${index1 === generalAwarenessIndex ? "active" : ""}`}>
                          <img style={{ width: '54rem', height: '25rem' }} src={general.Title_image?.image} className="img-fluid d-block w-100 px-3" alt={general.blogTitleImage?.caption} />
                          <div className="carousel-caption d-none d-md-block">
                              <h5 className="bg-light">{general.title}</h5>
                              <h6 className="bg-light mx-5">{general.subTitle}</h6>
                          </div>
                      </div>
                  ))
              }
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark1" data-bs-slide="prev" onClick={() => handleGeneralAwarenessCarouselChange("prev")}>
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark1" data-bs-slide="next" onClick={() => handleGeneralAwarenessCarouselChange("next")}>
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>
      </div>
    </div>
  );
}
