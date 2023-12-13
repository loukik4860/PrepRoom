import { useNavigate } from 'react-router-dom';
import '../AuthAppComponent/Static/RegisterComponent.css';
import { useRegisterUserMutation } from './Services/UserAuthApi';
import { useState } from 'react';

export function RegisterComponent(){
    const [server_error,setServer_error] = useState();
    const navigate = useNavigate();
    const [registerUser,{isLoading}] = useRegisterUserMutation()
    
    const handleSubmit = async(e) =>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData= {
        Author_firstName : data.get('Author_firstName'),
        Author_lastName : data.get('Author_lastName'),
        Author_email : data.get('Author_email'),
        password : data.get('password'),
        password2 : data.get('password2')
    }
    const res = await registerUser(actualData)
    // console.log(res);
    if(res.error){
        console.log("error:-",res.error.data)
        console.log(typeof(res.error.data.errors))
        setServer_error(res.error.data.error)
    }
    if(res.data){
        console.log(res.data)
        navigate('/home')
    }
   }

    return(
        <div className="container-fluid ">
            <h3 className='heading justify-align-center'>Author Registration</h3>
            <div className="formgroup justify-content-center mb-3 ">
              <form noValidate onSubmit={handleSubmit}>
                <dl>
                    <dt className='mb-2'>First Name</dt>
                    <dd><input name="Author_firstName" className="form-control mb-1"/></dd>
                    <dt className='mb-2'>Last Name</dt> 
                    <dd><input name="Author_lastName" className="form-control mb-1"/></dd>
                    <dt className='mb-2'>Email</dt>
                    <dd><input name="Author_email" className="form-control mb-1"/></dd>
                    <dt className='mb-2'>Password</dt>
                    <dd><input type='password' name="password" className="form-control mb-1"/></dd>
                    <dt className='mb-2'>Confirm Password</dt>
                    <dd><input type='password' name="password2" className="form-control mb-1    "/></dd>
                </dl>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>  
            </div>
            
        </div>
    )
}