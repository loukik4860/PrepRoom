import { Link, useNavigate } from "react-router-dom";
import "../IndexComponent/staticFile/NavBar.css";
import { getToken, removeToken } from "../AuthAppComponent/Services/LocalStorage";

export function NavbarIndex() {
  const navigate = useNavigate();
  const closeNavbar = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler && window.innerWidth < 992) {
       navbarToggler.click();
    }
 };

 const handleLogOut=()=>(
  removeToken(),
  navigate('/Authentication')
 )
 const {access_token} = getToken()
  return (
    <div className="navBar">
      <header className="Header nav-head navbar navbar-expand-lg navbar-dark">
         <div className="Container container-fluid">
           <div className="logo navbar-brand">InsightfulMPSC</div>
           <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="True"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">

            <div className="navbar-nav mx-auto">
              <span className="nav-link">
                <Link to="/home" onClick={closeNavbar}>Home</Link>
              </span>
              <span className="nav-link">
                <Link to="/category">Categories</Link>
              </span>
              <span className="nav-link">
                <Link to="/Authentication">Authentication</Link>
              </span>
              <span className="nav-link">
                <Link to="/allblog">All Blogs</Link>
              </span>
              <span className="nav-link">
                <Link to="/addSection">Add exam Section</Link>
              </span>
              {/* <span className="nav-link"><Link to="/login">Login</Link></span> */}
            </div>
            <div className="nav-icons d-flex align-items-center">
              <span className="bi bi-search me-3" ></span>
             
              {
                access_token ?  <button class="bi bi-door-closed-fill btn btn-primary" onClick={handleLogOut}></button> :
                                <span className="bi bi-person"></span> 
              }
             
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
