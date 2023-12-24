import { BrowserRouter} from "react-router-dom";
import "../IndexComponent/staticFile/Blogindex.css";
import { NavbarIndex } from "./Navbar";
import { SectionComponent } from "./SectionComponent";
import { SubNavbar } from "./SubNavBar";
import { FooterComp } from "./Footer";

export function BlogIndex(){
    return(
        <div className="container-fluid">
            <BrowserRouter>
                <header className="fixed-top">
                    <NavbarIndex/>
                    <SubNavbar />
                </header>
                <section className="section">
                    <SectionComponent/>
                </section>
                <footer>
                    <FooterComp/>
                </footer>
            </BrowserRouter>
        </div>
    )
}