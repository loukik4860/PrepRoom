import pic2 from "../Images/404.jpg"

export function FileNotFound(){
    return(
        <div className="col-lg-7 col-sm-5" style={{ backgroundImage: `url(${pic2})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '120vh' ,minWidth:'210vh' }}>
                    
        </div>
    )
}