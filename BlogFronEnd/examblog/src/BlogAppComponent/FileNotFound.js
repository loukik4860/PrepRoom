import pic2 from "../Images/404.gif"
import "../BlogAppComponent/static/FileNotFound.css";

export function FileNotFound(){
    return(
        
        <div id="fileNotFoundContainer" className="col-lg-7 col-sm-5">
            <img id="fileNotFound" src={pic2} alt="FileNotFound"/>
        </div>  
        
       
    )
}

// style={{ backgroundImage: `url(${pic2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '120vh' ,minWidth:'210vh' }}