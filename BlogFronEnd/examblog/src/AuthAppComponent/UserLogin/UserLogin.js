import React from 'react';
import "../UserLogin/UserLogin.css"


export function UserLogin() {
    const handleSubmit = async(e)=>{

    }
    return (
       <div className='container mt-3'>
        <div className='container container-fluid'>
            <h3 className='heading text-center text-bg-light'>User Login</h3>
            <div className='form-group bg-dark-subtle px-4 py-4' >
                <form onSubmit={handleSubmit} className=''>
                    <dl>
                        <dt className='my-1'>Email</dt>
                        <dd><input type='text' className='form-control' placeholder='Email or UserName'/></dd>
                        <dt className='my-1'>Password</dt>
                        <dd className=''><input className='form-control' placeholder='password' type='password'/></dd>
                    </dl>
                    <input type='submit' className='btn btn-success'/>
                    <input type='reset' className='btn btn-info mx-2'/>
                </form>
            </div>
        </div>
       </div>
    );
}
