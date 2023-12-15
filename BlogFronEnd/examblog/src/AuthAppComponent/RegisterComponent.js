import { useNavigate } from 'react-router-dom';
import '../AuthAppComponent/Static/RegisterComponent.css';
import { useRegisterUserMutation } from './Services/UserAuthApi';
import { useState } from 'react';
import { storeToken } from './Services/LocalStorage';

export function RegisterComponent() {
  const [server_error, setServer_error] = useState({});
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      Author_firstName: data.get('Author_firstName'),
      Author_lastName: data.get('Author_lastName'),
      Author_email: data.get('Author_email'),
      password: data.get('password'),
      password2: data.get('password2'),
    };
    const res = await registerUser(actualData);

    if (res.error) {
      setServer_error(res.error.data.errors);
      console.log(res.error.data.errors);
    }
    if(res.data){
      console.log("res.data",res.data.token);
      storeToken(res.data.token);
      navigate('/home');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mx-4">
        <div className="col-md-6">
          <h3 className="heading justify-align-center mt-2">Author Registration</h3>
          <div className="formgroup pt-2" style={{width:"75vh"}}>
            <form noValidate onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input name="Author_firstName" className="form-control" />
                {server_error && server_error.Author_firstName ? 
                (<small className="text-danger"> {server_error.Author_firstName[0]}</small>) : ("")}
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input name="Author_lastName" className="form-control" /> 
                {server_error && server_error.Author_lastName ? 
                ( <small className="text-danger"> {server_error.Author_lastName[0]} </small>) : ("")}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input name="Author_email" className="form-control" />
                {server_error && server_error.Author_email ? (
                  <small className="text-danger">
                    {server_error.Author_email[0]}
                  </small>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                />
                {server_error && server_error.password ? (
                  <small className="text-danger">
                    {server_error.password[0]}
                  </small>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="password2"
                  className="form-control"
                />
                {server_error && server_error.password2 ? (
                  <small className="text-danger">
                    {server_error.password2[0]}
                  </small>
                ) : (
                  ""
                )}
              </div>
              <button type="submit" className="btn btn-primary justify-content-center">
                Register
              </button>
            </form>
            <div className='mt-3'>
             {
            server_error && server_error.non_field_errors ? (
                <div className="alert alert-danger" role="alert">
                    {server_error.non_field_errors[0]}
                </div>
            ): "" 
          }
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
