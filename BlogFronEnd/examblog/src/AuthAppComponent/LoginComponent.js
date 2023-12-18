import { useEffect, useState } from "react";
import { useLoginUserMutation } from "./Services/UserAuthApi";
import { useNavigate } from "react-router-dom";
import { getToken, storeToken } from "./Services/LocalStorage";
import { useDispatch } from "react-redux";
import { setUserToken } from "./feature/authSlice";

export function LoginComponent() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [server_error, setServer_error] = useState({});
  const [Msg,setMsg] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      Author_email: data.get("Author_email"),
      password: data.get("password"),
    };
    const res = await loginUser(actualData);
    if (res.error) {
      console.log("res.error:-", res.error.data.errors);
      setServer_error(res.error.data.errors);
    }
    if (res.data) {
        storeToken(res.data.token)
        let { access_token } = getToken()
        console.log(access_token);
        dispatch(setUserToken({access_token : access_token}))
        setMsg(res.data);
        setTimeout(()=>{
          navigate('/AdminPage');
        },3000)
    }
  }

  let {access_token} = getToken()
  useEffect(()=>{

      dispatch(setUserToken({access_token : access_token}))

  },[dispatch])
  
  return (
    <div>
      <div className="container container-fluid" style={{height:"100vh"}}>
        <div className="container justify-content-center " style={{width:"80vh"}}>
          <div className="container col-md-6 mt-2" style={{width:"80vh"}}>
            <h3 className="heading text-center">Author Login</h3>
            <div className="form-group">
              <form noValidate onSubmit={handleSubmit}  style={{width:"33rem"}}>
                <div className="my-1">
                  <label className="form-label">Email</label>
                  <input name="Author_email" className="form-control" />
                  {server_error && server_error.Author_email ? (
                      <span className="text-danger"><small>{server_error.Author_email[0]}</small></span>) : ("")}
                </div>
                <div className="my-1">
                  <label className="form-label mt-3">Password</label>
                <input name="password" type="password" className="form-control" />
                {server_error && server_error.password ? (
                  <span className="text-danger">
                    <small>{server_error.password[0]}</small>
                  </span>
                ) : (
                  ""
                )}
                </div>
            <button type="submit" className="btn btn-primary btn-block mt-4">
              Login
            </button>
            </form> 
              {
                server_error && server_error.non_fields_errors ? (
                    <div className="alert alert-danger mt-3" role="alert">
                        {server_error.non_fields_errors[0]}
                    </div>
                ): "" 
              },

              {
                Msg && Msg.msg ?
                <div className="alert alert-success" role="alert">
                    {Msg.msg} redirecting it to Home Page.
                </div>: ""
              } 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



