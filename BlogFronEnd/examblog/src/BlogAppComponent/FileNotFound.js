import pic2 from "../Images/404.jpg"

export function FileNotFound(){
    return(
        <div className="container container-fluid">
            <div className="container container-fluid">
                <div className="col-lg-7 col-sm-5" style={{ backgroundImage: `url(${pic2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', display: { xs: 'none', sm: 'block' }}}>
                    
                </div>
            </div>
        </div>
    )
}