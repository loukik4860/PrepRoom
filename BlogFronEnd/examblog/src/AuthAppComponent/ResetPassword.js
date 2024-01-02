// import { useState } from "react";
import { useResetPasswordMutation } from "./Services/UserAuthApi"
// import { getToken, storeToken } from "./Services/LocalStorage";
// import { useDispatch } from "react-redux";
// import { setUserToken } from "./feature/authSlice";
import { useNavigate, useParams } from "react-router-dom";

export function ResetPassword(){
   const [resetPassword] = useResetPasswordMutation();
//    const {id,token} = useParams();
   const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password : data.get('password'),
            password2 : data.get('password2')
        } 
        const res = await resetPassword({actualData})
        if (res.ok) {
            const json = await res.json();
            console.log(json);
            navigate('/home');
        } else {
            console.log('Non-JSON response received:', res.statusText);
        }
    }
   return(
        <div className="container container-fluid">
            <div className="container justify-content-center mt-3">
                <h3 className="headline text-center bg-light-subtle py-2">Reset Password</h3>
                <div className="form-group bg-light px-2 py-3 mt-3">
                    <div className="mb-3">
                        <form noValidate onSubmit={handleSubmit} >
                            <dl>
                                <dt>Password</dt>
                                <dd><input type="password" name="password" className="form-control"/></dd>
                                <dt>Confirm Password</dt>
                                <dd><input type="password" name="password2" className="form-control"/></dd>
                            </dl>
                            <button type="Submit" className="btn btn-success mx-2">Submit</button>     
                            <button type="reset" className="btn btn-danger">Reset</button>     
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
// 