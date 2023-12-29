import { useState } from "react";
import { useChangeUserPasswordMutation } from "./Services/UserAuthApi"
import { getToken, storeToken } from "./Services/LocalStorage";
import { useDispatch } from "react-redux";
import { setUserToken } from "./feature/authSlice";
import { useNavigate } from "react-router-dom";

export function ChangePasswordComponent(){
    const [server_error,setServer_error] = useState({})
    const [changeUserPassword] = useChangeUserPasswordMutation();
    const {access_token} = getToken();
    const [Msg,setMsg] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password : data.get('password'),
            password2 : data.get('password2')
        }
        const res = await changeUserPassword({actualData,access_token})
        if(res.error){
            console.log(res.error.data.errors);
            setServer_error(res.error.data.errors)
        }
        if (res.data){
            storeToken(res.data.token)
            let {access_token} = getToken()
            dispatch(setUserToken({access_token:access_token}))
            console.log(res.data);
            setMsg(res.data);
            setTimeout(() => {
                navigate("/AdminPage");
              }, 3000);
        }
    };
    return(
        <div>
            <div className="container container-fluid">
                <div className="container justify-content-center mt-3">
                <h3 className="headline text-center bg-light-subtle py-2" >Change Password</h3>
                    <div className="form-group bg-light px-2 py-3 mt-3 ">
                        <div className=" mb-3">
                          <form noValidate onSubmit={handleSubmit}>
                                <dl>
                                    <dt>Password</dt>
                                    <dd><input type="password" name="password" className="form-control"/></dd>
                                    {server_error && server_error.password? <span><small className="text-danger">{server_error.password[0]}</small></span>:""}
                                    <dt>Confirm Password</dt>
                                    <dd><input type="password" name="password2" className="form-control"/></dd>
                                    {server_error && server_error.password2? <span><small className="text-danger">{server_error.password2[0]}</small></span>:""}
                                </dl>
                                <button type="Submit" className="btn btn-success mx-2">Submit</button>     
                                <button type="reset" className="btn btn-danger">Reset</button>     
                            </form>  
                        </div>
                        {
                            server_error && server_error.non_field_errors ? (
                                <div className="alert alert-danger" role="alert">
                                    {server_error.non_field_errors[0]}
                                </div>
                            ): "" 
                        }
                        {
                            Msg && Msg.msg ? (
                                <div className="alert alert-success" role="alert">
                                    {Msg.msg}
                                </div>
                            ): "" 
                        }
                    </div> 
                </div>
            </div>
        </div>
    )
}