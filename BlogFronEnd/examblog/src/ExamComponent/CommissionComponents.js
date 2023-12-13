import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function CommissionComponent() {
  const [commissionList, setCommissionList] = useState([]);
  const [selectedCommission, setSelectedCommission] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ExamApp/commissionList/")
      .then((response) => response.json())
      .then((data) => {
        setCommissionList(data);
      },);
  }, []);

  const handleCommissionClick = (commission) => {
    setSelectedCommission(commission);
  };

  return (
    <div className="container">
      <div className="row">
            <div className="col-3 mt-3">
                {commissionList.map((commission, index) => (
                    <div key={index}>
                        <ul>
                            <li>
                              <Link to="#" onClick={() => handleCommissionClick(commission)}>
                                  {commission.name}
                              </Link>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
            <div className="col-9">
                <div className="jumbotron">
                    {selectedCommission && (
                      <div className="col3 mt-3 mb-3 shadow border border-dark-subtle rounded">
                        <h6>Commission Name: {selectedCommission.name}</h6>
                          <p>Description: {selectedCommission.description}</p>
                            {selectedCommission.examSection && (
                              <div>
                                <p>Exam Section:</p>
                                  <ul>
                                      <li>
                                          Name: {selectedCommission.examSection.name} (
                                          {selectedCommission.examSection.abbreviation})
                                      </li>
                                  </ul>
                              </div>
                            )}
                      </div>
                    )}
                </div>
            </div>
      </div>
      <div className="row">
        
      </div>
    </div>
  );
}
