import { useEffect,useState } from "react"


export function PolityCarasoul(){
    const[polityList,setPolityList] = useState([]);
    const[polityIndex,setPolityIndex] = useState(0);

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/18/") // Polity
        .then(response=>response.json())
        .then((data)=>{
            setPolityList(data);
        });
    },[])
    const handlePolityCarouselChange = (direction) => {
        const newIndex2 =
          direction === "prev"
            ? (polityIndex - 1 + polityList.length) % polityList.length
            : (polityIndex + 1) % polityList.length;
      
        // Set the new index in the state
        setPolityIndex(newIndex2);
      };
    return(
        <div className="container">
            <div  id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-indicators">
                    {
                        polityList.map((polity,index3)=>(
                            <button key={index3} 
                            type="button" 
                            data-bs-target="#carouselExampleDark3"
                            data-bs-slide-to={index3}
                            className={index3 === 0 ? "active" : ""}
                            aria-current={index3 === 0 ? "true" : ""}
                            aria-label={`Slide ${index3 + 1}`}
                        ></button>
                        ))
                    }
                </div>
                <div className="carousel-inner">
                    {
                        polityList.map((polity,index3)=>(
                            <div key={index3}  className={`carousel-item ${index3 === polityIndex ? "active" : ""}`}>
                                <img style={{ width: '54rem', height: '25rem' }} src={polity.Title_image?.image} className="img-fluid d-block w-100 px-3" alt={polity.blogTitleImage?.caption} />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className="bg-light">{polity.title}</h5>
                                    <h6 className="bg-light mx-5">{polity.subTitle}</h6>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark3" data-bs-slide="prev" onClick={() => handlePolityCarouselChange("prev")}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark3" data-bs-slide="next" onClick={() => handlePolityCarouselChange("next")}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}