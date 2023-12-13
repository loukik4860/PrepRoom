import React from "react";
import { Link } from "react-router-dom";
import "../IndexComponent/staticFile/SubNavBar.css";

export function SubNavbar() {
  return (
    <nav className="SubNavBar navbar navbar-expand-lg bg-danger text-light">
      <div className="ms-5">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/ga" className="nav-link text-white">
                General Awareness
              </Link>
              <Link to="/ca" className="nav-link text-white">
                Current Affairs
              </Link>
              <Link to="/history" className="nav-link active text-white" aria-current="page">
                History
              </Link>
              <Link to="/geography" className="nav-link text-white"> Geography
              </Link>
              <Link to="/polity" className="nav-link text-white">
                Polity
              </Link>
              <Link to="/eco" className="nav-link text-white">
                Economics
              </Link>
              <Link to="/science" className="nav-link text-white">
                Science
              </Link>
              <Link to="/eng" className="nav-link text-white">
                English
              </Link>
              <Link to="/eng" className="nav-link text-white">
                  
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
