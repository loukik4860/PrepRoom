import { useEffect,useState } from "react";


export function EcoCarasoul(){
    const[economicsList,setEconomicsList] = useState([]);
    const[economicsIndex,setEconomicsIndex] = useState(0);

    useEffect(()=>{
        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/19/") //Economics
        .then(response=>response.json())
        .then((data)=>{
            setEconomicsList(data);
        });
    },[])
    const handleEconomicsCarouselChange = (direction) => {
        const newIndex4 =
          direction === "prev"
            ? (economicsIndex - 1 + economicsList.length) % economicsList.length
            : (economicsIndex + 1) % economicsList.length;
      
        // Set the new index in the state
        setEconomicsIndex(newIndex4);
    };
    return(
        <div className="container">
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-indicators">
                    {
                        economicsList.map((eco, index6) => (
                            <button
                                key={index6}
                                type="button"
                                data-bs-target="#carouselExampleDark5"
                                data-bs-slide-to={index6}
                                className={index6 === economicsIndex ? "active" : ""}
                                aria-current={index6 === economicsIndex ? "true" : ""}
                                aria-label={`Slide ${index6 + 1}`}
                            ></button>
                        ))
                    }
                </div>
                <div className="carousel-inner">
                    {
                        economicsList.map((eco, index6) => (
                            <div key={index6} className={`carousel-item ${index6 === economicsIndex ? "active" : ""}`}>
                                <img
                                    style={{ width: '54rem', height: '25rem' }}
                                    src={eco.Title_image?.image}
                                    className="img-fluid d-block w-100 px-3"
                                    alt={eco.blogTitleImage?.caption}
                                />
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className="bg-light">{eco.title}</h5>
                                    <h6 className="bg-light mx-5">{eco.subTitle}</h6>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleDark5"
                    data-bs-slide="prev"
                    onClick={() => handleEconomicsCarouselChange("prev")}
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleDark5"
                    data-bs-slide="next"
                    onClick={() => handleEconomicsCarouselChange("next")}
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}