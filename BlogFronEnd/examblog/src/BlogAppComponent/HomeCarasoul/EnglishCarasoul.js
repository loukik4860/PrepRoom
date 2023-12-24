import { useEffect, useState } from "react";

export function EnglishCarasoul() {
  const [englishList, setEnglishList] = useState([]);
  const [englishIndex, setEnglishIndex] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ExamApp/noteSubject/21/") // English
      .then((response) => response.json())
      .then((data) => {
        setEnglishList(data);
      });
  }, []);

  const handleEnglishCarouselChange = (direction) => {
    const newIndex5 =
      direction === "prev"
        ? (englishIndex - 1 + englishList.length) % englishList.length
        : (englishIndex + 1) % englishList.length;

    // Set the new index in the state
    setEnglishIndex(newIndex5);
  };

  return (
    <div className="container">
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <div className="carousel-indicators">
          {englishList.map((english, index7) => (
            <button
              key={index7}
              type="button"
              data-bs-target="#carouselExampleDark6"
              data-bs-slide-to={index7}
              className={index7 === englishIndex ? "active" : ""}
              aria-current={index7 === englishIndex ? "true" : ""}
              aria-label={`Slide ${index7 + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {englishList.map((english, index7) => (
            <div key={index7} className={`carousel-item ${index7 === englishIndex ? "active" : ""}`}>
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
          ))}
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
  );
}
