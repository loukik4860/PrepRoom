import { useState } from "react";
import { useSendPasswordResetEmailMutation } from "./Services/UserAuthApi";

export function ResetEmailComponent(){
    const [sendPasswordResetEmail,{isLoading}] = useSendPasswordResetEmailMutation();
    const [server_error,setServer_error] = useState({});
    const [serverMsg,setServerMsg] = useState({});
     
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            Author_email : data.get('Author_email')
        }
        const res = await sendPasswordResetEmail(actualData)
        if (res.error){
            console.log("error:-",res.error.data);
            setServer_error(res.error)
        }
        if(res.data){
            console.log(res.data.msg);
            setServerMsg(res.data)
        }
    };
    return(
        <div className="container container-fluid">
            <div className="container justify-content-center pt-2">
                <h3 className="headline text-center bg-light-subtle py-2 mt-3 shadow">Reset Email Component</h3>
                <div className="form-group bg-light px-2 py-3 mt-2">
                    <div className="mb-3 pb-3 px-5">
                        <form noValidate onSubmit={handleSubmit}>
                            <dl>
                                <dt>Email</dt>
                                <dd><input type="email" name="Author_email" className="form-control"/></dd>
                            </dl>
                            <button className="btn btn-success mx-1" type="submit">submit</button>
                            <button className="btn btn-warning mx-1" type="reset">Reset</button>
                        </form>
                        {
                            server_error && server_error.data ? (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {server_error.data.Author_email}
                                </div>
                            ): "" 
                        },
                        {
                            serverMsg && serverMsg.msg? (
                            <div className="alert alert-success mt-3" role="alert">
                                {serverMsg.msg}
                            </div>
                            ) : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}