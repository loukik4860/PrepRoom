import { useEffect, useState } from "react";
import "../ExamComponent/static/Notification.css";
export function NotificationComponent() {
  const [commissionList, setCommissionList] = useState([]);
  const [examList, setExamList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ExamApp/commissionList/")
      .then((response) => response.json())
      .then((data) => {
        // Add isOpen property to each commission item
        const commissionsWithState = data.map((commission) => ({
          ...commission,
          isOpen: false,
        }));
        console.log("commissionsWithState",commissionsWithState);
        setCommissionList(commissionsWithState);
        console.log(data);

        // Use the first commissionId from the list, or choose an appropriate one based on your logic
        const firstCommissionId = data.length > 0 ? data[0].id : null;
        console.log("firstCommissionId:-",firstCommissionId);
        if (firstCommissionId) {
          const promises = data.map((commission) => {
            const commissionId = commission.id;

            return fetch(`http://127.0.0.1:8000/ExamApp/examCommission/${commissionId}/`)
              .then((response) => response.json())
              .then((examData) => {
                return {
                  commissionId,
                  examData,
                };
              });
          });

          Promise.all(promises)
            .then((examDataArray) => {
              // examDataArray is an array of objects { commissionId, examData }
              const examListObject = {};
              examDataArray.forEach(({ commissionId, examData }) => {
                examListObject[commissionId] = examData;
              });
              setExamList(examListObject);
              console.log("examList:", examListObject);
            });
        }
      });
  }, []); // Empty dependency array to ensure this effect runs only once

  const handleAccordionToggle = (index) => {
    setCommissionList((prevList) =>
      prevList.map((commission, i) => ({
        ...commission,
        isOpen: i === index ? !commission.isOpen : false,
      }))
    );
  };

  return (
    <div className="container container-fluid bg-light">
      <div className="container container-fluid my-3">
        <div className="row d-flex">
            <div className="col-sm-4 text-center px-2">
                <h5>Section</h5>
                <hr/>                
                {
                    commissionList.map((data, index) => (
                    <div className="mx-3 my-3" key={data.id}>
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`heading${data.id}`}>
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${data.id}`} aria-expanded={data.isOpen ? "true" : "false"} aria-controls={`collapse${data.id}`} onClick={() => handleAccordionToggle(index)}>
                                        {data.name}
                                    </button>
                                </h2>
                                <div id={`collapse${data.id}`} className={`accordion-collapse collapse ${data.isOpen ? "show" : ""}`}
                                    aria-labelledby={`heading${data.id}`}
                                    data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <div className="card px-5" style={{ width: "21em" }}>
                                            <ul className="list-group list-group-flush">
                                                {
                                                    examList[data.id]?.map((list) => (
                                                        <li style={{ width: "16rem" }} className="list-group-item" key={list.id}>
                                                            {list.name}
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                }
            </div>
            <div className="col-sm-8 ">
                <div className="mx-3 px-2">
                    <h5 className="text-center">Notification</h5>

                    <hr/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
