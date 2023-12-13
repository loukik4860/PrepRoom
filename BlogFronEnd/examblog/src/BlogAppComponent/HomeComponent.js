import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../BlogAppComponent/static/HomeComponentsCss.css'

export function HomeComponent(){
    
    const[blogList,setBlogList] = useState([]);
    const[historyList,setHistoryList] = useState([]);
    const[geographyList,setGeographyList] = useState([]);
    const[economicsList,setEconomicsList] = useState([]);
    const[scienceList,setScienceList] = useState([]);
    const[englishList,setEnglishList] = useState([]);
    const[polityList,setPolityList] = useState([]);
    const[currentAffairs,setCurrentAffairs] = useState([]);
    const[generalAwareness,setGeneralAwareness] = useState([]);
    const[notificationList,setNotificationList] = useState([]);
    const[generalAwarenessIndex, setGeneralAwarenessIndex] = useState(0);
    const[currentAffairsIndex, setCurrentAffairsIndex] = useState(0);
    const[polityIndex,setPolityIndex] = useState(0);
    const[historyIndex,setHistoryIndex] = useState(0);
    const[economicsIndex,setEconomicsIndex] = useState(0);
    const[englishIndex,setEnglishIndex] = useState(0);

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/blogApp/postblog/')
        .then(response=>response.json())
        .then((data)=>{
            setBlogList(data);
            console.log(data);
        });
        
        fetch('http://127.0.0.1:8000/ExamApp/noteSubject/23/') //History 
        .then(response=>response.json())
        .then((data)=>{
            setHistoryList(data);
        });

        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/24/") //Geography
        .then(response=>response.json())
        .then((data)=>{
            setGeographyList(data);
        });

        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/19/") //Economics
        .then(response=>response.json())
        .then((data)=>{
            setEconomicsList(data);
        });

        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/4/") //Science
        .then(response=>response.json())
        .then((data)=>{
            setScienceList(data);
        });

        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/21/") //English
        .then(response=>response.json())
        .then((data)=>{
            setEnglishList(data);
        });

        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/18/") // Polity
        .then(response=>response.json())
        .then((data)=>{
            setPolityList(data);
        });

        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/22/") // Current affairs
        .then(response=>response.json())
        .then((data)=>{
            setCurrentAffairs(data);
            console.log("currentAffairs:-",data);
        });

        fetch("http://127.0.0.1:8000/ExamApp/noteSubject/17/") // general awareness
        .then(response=>response.json())
        .then((data)=>{
            setGeneralAwareness(data);
            console.log("general:-",data);
        });

        fetch("http://127.0.0.1:8000/ExamApp/notificationList/")
        .then((response)=>response.json())
        .then((data)=>{
            setNotificationList(data);
            console.log("Notification:-",data);
        }
        );
    },[blogList.id]);

    const handleGeneralAwarenessCarouselChange = (direction) =>{
        const newIndex = direction === "prev" ? (generalAwarenessIndex - 1 + generalAwareness.length) % generalAwareness.length
        : (generalAwarenessIndex + 1) % generalAwareness.length;

    // Set the new index in the state
        setGeneralAwarenessIndex(newIndex);
    }

    const handleCurrentAffairsCarouselChange = (direction) => {
        const newIndex1 =
          direction === "prev"
            ? (currentAffairsIndex - 1 + currentAffairs.length) % currentAffairs.length
            : (currentAffairsIndex + 1) % currentAffairs.length;
      
        // Set the new index in the state
        setCurrentAffairsIndex(newIndex1);
      };
    
      const handlePolityCarouselChange = (direction) => {
        const newIndex2 =
          direction === "prev"
            ? (polityIndex - 1 + polityList.length) % polityList.length
            : (polityIndex + 1) % polityList.length;
      
        // Set the new index in the state
        setPolityIndex(newIndex2);
      };
      
      const handleHistoryCarouselChange = (direction) => {
        const newIndex3 =
          direction === "prev"
            ? (historyIndex - 1 + historyList.length) % historyList.length
            : (historyIndex + 1) % historyList.length;
      
        // Set the new index in the state
        setHistoryIndex(newIndex3);
      };

      const handleEconomicsCarouselChange = (direction) => {
        const newIndex4 =
          direction === "prev"
            ? (economicsIndex - 1 + economicsList.length) % economicsList.length
            : (economicsIndex + 1) % economicsList.length;
      
        // Set the new index in the state
        setEconomicsIndex(newIndex4);
      };

      const handleEnglishCarouselChange = (direction) => {
        const newIndex5 =
          direction === "prev"
            ? (englishIndex - 1 + englishIndex.length) % englishList.length
            : (englishIndex + 1) % englishList.length;
      
        // Set the new index in the state
        setEnglishIndex(newIndex5);
      };
    return(
        <div className="container-sm">
            <div className="jumbotron">
            <div className="row">
    <div className="col-lg-8 mt-2">
        <div className="col3 mt-2 shadow border border-dark-subtle rounded bg-light">
            <h5 className="mt-2 ms-3" id="title">
                Blog
            </h5>
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
                                aria-label={`Slide ${index + 1}`}
                            ></button>
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
        <div className="mt-2 shadow border border-dark-subtle rounded bg-light" style={{ height: "98%" }}>
            <h5 className="mt-2 ms-3" id="title">
                Notification
            </h5>
            <hr className="mx-2 my-3" />
            <div className="mx-4 my-3">
                <div className="card">
                    <ul className="list-group list-group-flush">
                        {notificationList
                            .slice()
                            .reverse()
                            .slice(0, 10)
                            .map((list) => (
                                <li key={list.id} className="list-group-item">
                                    {list.name}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                            <Link to="/ga"><h5 className="mt-2 ms-3" id="title">General Awareness</h5></Link>
                            <hr className="mx-3"/>
                                <div className="col2">
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
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                            <Link to="/ca"><h5 className="mt-2 ms-3" id="title">Current Affairs</h5></Link>
                                <hr className="mx-3"/>
                                    <div className="col2">
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
                        </div>
                    </div>    
                </div>
                <div className="row mt-2 px-2">
                    <div className="col2 mt-2 mb-0  shadow border border-dark-subtle rounded bg-light">
                        <h5 className="mt-2 ms-3" id="title">Advertisement</h5>
                            <div className="col2">
                                
                            </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                            <Link to="/polity"><h5 className="mt-2 ms-3" id="title">Polity</h5></Link>    
                                <hr className="mx-3"/>
                                    <div className="col2">
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
                        </div>  
                    </div>
                    <div className="col-md-6 ">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                         <Link to="/geography"><h5 className="mt-2 ms-3" id="title">Geography</h5></Link>
                            <hr className="mx-3"/>
                                <div className="col2">
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
                                                        <div key={index4}  className={`carousel-item ${index4 === polityIndex ? "active" : ""}`}>
                                                            <img style={{ width: '54rem', height: '25rem' }} src={geography.Title_image?.image} className="img-fluid d-block w-100 px-3" alt={geography.blogTitleImage?.caption} />
                                                            <div className="carousel-caption d-none d-md-block">
                                                                <h5 className="bg-light">{geography.title}</h5>
                                                                <h6 className="bg-light mx-5">{geography.subTitle}</h6>
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
                        </div>
                    </div>    
                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                        <Link to="history"><h5 className="mt-2 ms-3" id="title">History</h5></Link>
                                <hr className="mx-3"/>
                                    <div className="col2">
                                    <div id="carouselExampleDark" className="carousel carousel-dark slide">
                                            <div className="carousel-indicators">
                                                {
                                                    historyList.map((history, index5) => (
                                                        <button
                                                            key={index5}
                                                            type="button"
                                                            data-bs-target="#carouselExampleDark4"
                                                            data-bs-slide-to={index5}
                                                            className={index5 === historyIndex ? "active" : ""}
                                                            aria-current={index5 === historyIndex ? "true" : ""}
                                                            aria-label={`Slide ${index5 + 1}`}
                                                        ></button>
                                                    ))
                                                }
                                            </div>
                                            <div className="carousel-inner">
                                                {
                                                    historyList.map((history, index5) => (
                                                        <div key={index5} className={`carousel-item ${index5 === historyIndex ? "active" : ""}`}>
                                                            <img
                                                                style={{ width: '54rem', height: '25rem' }}
                                                                src={history.Title_image?.image}
                                                                className="img-fluid d-block w-100 px-3"
                                                                alt={history.blogTitleImage?.caption}
                                                            />
                                                            <div className="carousel-caption d-none d-md-block">
                                                                <h5 className="bg-light">{history.title}</h5>
                                                                <h6 className="bg-light mx-5">{history.subTitle}</h6>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <button
                                                className="carousel-control-prev"
                                                type="button"
                                                data-bs-target="#carouselExampleDark4"
                                                data-bs-slide="prev"
                                                onClick={() => handleHistoryCarouselChange("prev")}
                                            >
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Previous</span>
                                            </button>
                                            <button
                                                className="carousel-control-next"
                                                type="button"
                                                data-bs-target="#carouselExampleDark4"
                                                data-bs-slide="next"
                                                onClick={() => handleHistoryCarouselChange("next")}
                                            >
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="visually-hidden">Next</span>
                                            </button>
                                        </div>
  
                                    </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                            <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                                <Link to="/eco"><h5 className="mt-2 ms-3" id="title">Economy</h5></Link>    
                                    <hr className="mx-3"/>
                                        <div className="col2">
                                            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                                                <div className="carousel-indicators">
                                                    {
                                                        economicsList.map((eco, index6) => (
                                                            <button
                                                                key={index6}
                                                                type="button"
                                                                data-bs-target="#carouselExampleDark5"
                                                                data-bs-slide-to={index6}
                                                                className={index6 === historyIndex ? "active" : ""}
                                                                aria-current={index6 === historyIndex ? "true" : ""}
                                                                aria-label={`Slide ${index6 + 1}`}
                                                            ></button>
                                                        ))
                                                    }
                                                </div>
                                                <div className="carousel-inner">
                                                    {
                                                        economicsList.map((eco, index6) => (
                                                            <div key={index6} className={`carousel-item ${index6 === historyIndex ? "active" : ""}`}>
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
                            </div>
                    </div>

                </div>
                <div className="row mt-2">
                    <div className="col-md-6">
                        <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                           <Link to="/eng"><h5 className="mt-2 ms-3" id="title">English</h5>    </Link>
                                <hr className="mx-3"/>
                                    <div className="col2">
                                    <div id="carouselExampleDark" className="carousel carousel-dark slide">
                                                <div className="carousel-indicators">
                                                    {
                                                        englishList.map((english, index7) => (
                                                            <button
                                                                key={index7}
                                                                type="button"
                                                                data-bs-target="#carouselExampleDark6"
                                                                data-bs-slide-to={index7}
                                                                className={index7 === historyIndex ? "active" : ""}
                                                                aria-current={index7 === historyIndex ? "true" : ""}
                                                                aria-label={`Slide ${index7 + 1}`}
                                                            ></button>
                                                        ))
                                                    }
                                                </div>
                                                <div className="carousel-inner">
                                                    {
                                                        englishList.map((english, index7) => (
                                                            <div key={index7} className={`carousel-item ${index7 === historyIndex ? "active" : ""}`}>
                                                                <img
                                                                    style={{ width: '54rem', height: '25rem' }}
                                                                    src={english.Title_image?.image}
                                                                    className="img-fluid d-block w-100 px-3"
                                                                    alt={english.blogTitleImage?.caption}
                                                                />
                                                                <div className="carousel-caption d-none d-md-block">
                                                                    <h5 className="bg-light">{english.title}</h5>
                                                                    <h6 className="bg-light mx-5">{english.subTitle}</h6>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                                <button
                                                    className="carousel-control-prev"
                                                    type="button"
                                                    data-bs-target="#carouselExampleDark6"
                                                    data-bs-slide="prev"
                                                    onClick={() => handleEnglishCarouselChange("prev")}
                                                >
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button
                                                    className="carousel-control-next"
                                                    type="button"
                                                    data-bs-target="#carouselExampleDark6"
                                                    data-bs-slide="next"
                                                    onClick={() => handleEnglishCarouselChange("next")}
                                                >
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                    </div> 
                        </div>
                    </div>
                    <div className="col-md-6">
                            <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                                <h5 className="mt-2 ms-3" id="title">Science</h5>    
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
                <div className="row mt-2 px-2">
                    <div className="col2 mt-2 mb-1 shadow border border-dark-subtle rounded bg-light">
                        <h5 className="mt-2 ms-3" id="title">Advertisement</h5>
                            <div className="col2">
                                
                            </div>
                    </div>
                </div>
                <Link to="/tags"><span>tags</span></Link><br/>
                <Link to="/allblog"><span>All Blogs</span></Link><br/>
                <Link to="/allAuthor"><span>All Author</span></Link><br/>
                <Link to="/commissionList"><span>Commission List</span></Link><br/>     
                <Link to="/AlsoRead"><span>Also read</span></Link><br/>
                <Link to="/AdminPage"><span>Admin</span></Link><br/>
                <Link to="/notification"><span>Notification</span></Link>
            </div>
        </div>
    )
}

//  notificationList.slice().reverse().slice(0,10).map((list) => (
//                                                 <li key={list.id} className="list-group-item ">{list.name}</li>
//                                             ))