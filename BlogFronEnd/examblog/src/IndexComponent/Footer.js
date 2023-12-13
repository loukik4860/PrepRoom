import { Link } from "react-router-dom";
// import "../IndexComponent/staticFile/FooterCss.css";

export function FooterComp(){
    return(
        <div>
            <div className="d-flex flex-column h-100 bg-dark">
            <footer className="w-100 py-4 flex-shrink-0">
                <div className="container py-4">
                    <div className="row gy-4 gx-5">
                        <div className="col-lg-4 col-md-6">
                            <h5 className="h1 text-white">FB.</h5>
                            <p className="small text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                            <p className="small text-white mb-0">&copy; Copyrights. All rights reserved. <a className="text-primary" href="#">Bootstrapious.com</a></p>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5 className="text-white mb-3">Quick links</h5>
                            <ul className="list-unstyled text-white">
                                <li><Link>Home</Link></li>
                                <li><Link>About</Link></li>
                                <li><Link>Get started</Link></li>
                                <li><Link>FAQ</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h5 className="text-white mb-3">Quick links</h5>
                            <ul className="list-unstyled text-white">
                                <li><Link>Home</Link></li>
                                <li><Link>About</Link></li>
                                <li><Link>Get started</Link></li>
                                <li><Link>FAQ</Link></li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h5 className="text-white mb-3">Newsletter</h5>
                            <p className="small text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
                            <noscript>
                            <form>
                                <div className="input-group mb-3">
                                    <input className="form-control" type="text" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                    <button className="btn btn-primary" id="button-addon2" type="button"><i className="fas fa-paper-plane"></i></button>
                                </div>
                            </form>
                            </noscript>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    )
}