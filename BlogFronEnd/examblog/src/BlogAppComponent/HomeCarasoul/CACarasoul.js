import { useEffect, useState } from "react"


export function CACarasoul(){

    const[currentAffairs,setCurrentAffairs] = useState([]);
    const[currentAffairsIndex, setCurrentAffairsIndex] = useState(0);
    
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/22/") // Current affairs
        .then(response=>response.json())
        .then((data)=>{
            setCurrentAffairs(data);
            console.log("currentAffairs:-",data);
        });
    },[])

    const handleCurrentAffairsCarouselChange = (direction) => {
        const newIndex1 =
          direction === "prev"
            ? (currentAffairsIndex - 1 + currentAffairs.length) % currentAffairs.length
            : (currentAffairsIndex + 1) % currentAffairs.length;
      
        // Set the new index in the state
        setCurrentAffairsIndex(newIndex1);
      };
    return(
        <div className="container">
          <div  id="carouselExampleDark" className="carousel carousel-dark slide">
            <div className="carousel-indicators">
                {
                    currentAffairs.map((Current,index2)=>(
                        <button key={index2} 
                        type="button" 
                        data-bs-target="#carouselExampleDark2"
                        data-bs-slide-to={index2}
                        className={index2 === 0 ? "active" : ""}
                        aria-current={index2 === 0 ? "true" : ""}
                        aria-label={`Slide ${index2 + 1}`}
                    ></button>
                    ))
                }
            </div>
            <div className="carousel-inner">
                {
                    currentAffairs.map((Current,index2)=>(
                        <div key={index2}  className={`carousel-item ${index2 === currentAffairsIndex ? "active" : ""}`}>
                            <img style={{ width: '54rem', height: '25rem' }} src={Current.Title_image?.image} className="img-fluid d-block w-100 px-3" alt={Current.blogTitleImage?.caption} />
                            <div className="carousel-caption d-none d-md-block">
                                <h5 className="bg-light">{Current.title}</h5>
                                <h6 className="bg-light mx-5">{Current.subTitle}</h6>
                            </div>
                        </div>
                    ))
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="prev" onClick={() => handleCurrentAffairsCarouselChange("prev")}>
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark2" data-bs-slide="next" onClick={() => handleCurrentAffairsCarouselChange("next")}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>  
        </div>
    )
}