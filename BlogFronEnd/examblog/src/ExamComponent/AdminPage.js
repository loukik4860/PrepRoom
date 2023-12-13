import { Link } from "react-router-dom";
import "../ExamComponent/static/admin.css";

export function AdminPage() {
  return (
    <div>
      <div className="container container-sm">
        <div className="jumbotron jumbotron-fluid bg-white shadow mb-3">
          <div className="row">
            <div className="col-md-3 my-3">
              <h5>Dashboard</h5>
            </div>
            <div className="col-md-9 my-3">
              <h5>Add</h5>
            </div>
          </div>
        </div>
        <div className="container-fluid text-center mb-3" style={{ height: "6rem" }}>
          <div className="row ">
            <div className="col-sm mx-3 bg-success-subtle shadow rounded-2 Mdiv" style={{ height: "6rem" }}>
              <div className="my-1">
                <h5>Monthly Earning</h5>
              </div>
            </div>
            <div className="col-sm mx-3 bg-primary-subtle shadow rounded-1" style={{ height: "6rem" }}>
              <div className="my-1">
                <h5>Yearly Earning</h5>
              </div>
            </div>
            <div className="col-sm mx-3 bg-warning-subtle shadow rounded-1" style={{ height: "6rem" }}>
              <div className="my-1">
                <h5>Task</h5>
              </div>
            </div>
            <div className="col-sm mx-3 bg-info-subtle shadow rounded-1" style={{ height: "6rem" }}>
              <div className="my-1">
                <h5>Pending</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 bg-primary-subtle mx-3 ms-3 shadow rounded-2">
              <div className="">
                <div className="card my-3 text-center" style={{ width: "19rem" }}>
                  <div className="card-header bg-warning-subtle">Add Data</div>
                  <ul className="list-group list-group-flush">
                    <Link to="/addSection" className="list-group-item">
                      Add Exam
                    </Link>
                    <Link to="/addCommission" className="list-group-item">
                      Commission
                    </Link>
                    <Link to="/addExam" className="list-group-item">
                      Exam
                    </Link>
                    <Link to="/addSubject" className="list-group-item">
                      Subject
                    </Link>
                    <Link to="/addCategory" className="list-group-item">
                      Category
                    </Link>
                    <Link to="/addChapter" className="list-group-item">
                      Chapter
                    </Link>
                    <Link to="/addNote" className="list-group-item">
                      Notes
                    </Link>
                    <Link to="/addImage" className="list-group-item">
                      Image
                    </Link>
                    <Link to="/ImageShow" className="list-group-item">
                      Show Image
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 bg-light mx-3 ms-3 shadow rounded-2">
              <div className="text-center">
                <h4>Data</h4>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div className="container my-3">
          <div className="row">
            <div className="col-lg-3 col-md-6 bg-primary-subtle mx-3 ms-3 shadow rounded-2">
              <div className="">
                <div className="card my-3 text-center" style={{ width: "19rem" }}>
                  <div className="card-header bg-warning-subtle">Author</div>
                  <ul className="list-group list-group-flush">
                    <Link to="/addSection" className="list-group-item">
                      Loukik
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-6 bg-light mx-3 ms-3 shadow rounded-2">
              <div className="text-center">
                <h4>Data</h4>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
