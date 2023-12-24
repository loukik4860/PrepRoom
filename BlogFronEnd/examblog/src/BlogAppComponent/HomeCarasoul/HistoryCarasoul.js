import { useEffect, useState } from "react";

export function HistoryCarasoul() {
  const [historyList, setHistoryList] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/ExamApp/noteSubject/23/') // History
      .then(response => response.json())
      .then((data) => {
        setHistoryList(data);
        console.log(data);
      });
  }, []);

  const handleHistoryCarouselChange = (direction) => {
    const newIndex3 =
      direction === "prev"
        ? (historyIndex - 1 + historyList.length) % historyList.length
        : (historyIndex + 1) % historyList.length;

    // Set the new index in the state
    setHistoryIndex(newIndex3);
  };

  return (
    <div className="container">
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
        <div className="carousel-indicators">
          {historyList.map((history, index5) => (
            <button
              key={index5}
              type="button"
              data-bs-target="#carouselExampleDark4"
              data-bs-slide-to={index5}
              className={index5 === historyIndex ? "active" : ""}
              aria-current={index5 === historyIndex ? "true" : ""}
              aria-label={`Slide ${index5 + 1}`}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {historyList.map((history, index5) => (
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
          ))}
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
  );
}
