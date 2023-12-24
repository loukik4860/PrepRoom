import { getToken } from "./Services/LocalStorage";
import { useGetLoggedUserQuery } from "./Services/UserAuthApi"
import profilePic from "../Images/profile.png"
import { useEffect, useState } from "react";
import "../AuthAppComponent/Static/ProfileComponent.css";
export function ProfileComponent(){
    
    const {access_token } = getToken();
    const {data,isSuccess} = useGetLoggedUserQuery(access_token);

    const [userData,setUserData] = useState({
        Author_email : "",
        Author_firstName : "",
        Author_lastName : "",
        is_author : false,
        is_active : false,
        is_admin : false,
        created_at : "",
        updated_at : ""
    })

    useEffect(()=>{
        if (data && isSuccess){
            setUserData({
                Author_email : data.Author_email,
                Author_firstName : data.Author_firstName,
                Author_lastName : data.Author_lastName,
                is_author : data.is_author,
                is_active : data.is_active,
                is_admin : data.is_admin,
                created_at : data.created_at,
                updated_at : data.updated_at 
            })
        }
    },[data,isSuccess])

    console.log(data);
    return(
        <div className=" container pt-2">
            <div id="heading1" className="text-center bg-white my-2 py-2 shadow">
                 <h3  className="heading">Profile</h3>
            </div>
            <div className="row shadow mt-3">
                <div className="col-md-4 d-flex bg-white align-items-center justify-content-center px-2">
                    <div className="text-center my-3" style={{ maxHeight : "50vm" }}>
                        <div className="profile">
                            <img src={profilePic} className="rounded-circle" style={{ width: "50%", height: "50%" }} />
                        </div>
                        <div className="">
                            <span>Name:-  </span><span>{userData.Author_firstName}</span><br/>
                            <span>Surname:-  </span><span>{userData.Author_lastName}</span>
                        </div>
                        <div className="d-flex d-inline align-items-center justify-content-center mx-2 my-3">
                            <i class="bi bi-twitter-x mx-2"></i>
                            <i class="bi bi-facebook mx-2"></i>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 bg-light shadow">
                    <div className="px-2 py-2" style={{ maxWidth: '100%' }}>
                    <table className="table table-bordered border-black text-center mx-2 my-2 shadow" >
                        
                        <tbody>
                            <tr>
                                <td colspan="1" className="">First Name</td>
                                <td colspan="5">{userData.Author_firstName}</td>
                            </tr>
                            <tr>
                                <td colspan="1" className="">Last Name</td>
                                <td colspan="5">{userData.Author_lastName}</td>
                            </tr>
                            <tr>
                                <td className="">Email</td>
                                <td>{userData.Author_email}</td>
                            </tr>
                            <tr>
                                <td className="">Is Author</td>
                                <td>{userData.is_author ? "True" : "False"}</td>
                            </tr>
                        </tbody>
                        </table>
                        <div className="">
                            <button className="btn btn-info mx-2">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="row mt-3 text-center shadow">
                <div className="col bg-light px-2 ml-2 shadow ">
                    <span>Article</span>
                </div>
                <div className="col bg-light px-2 ml-2 shadow">
                    <span>Earning</span>
                </div>
                <div className="col bg-light px-2 ml-2 shadow">
                    <span>Action</span>
                </div>
            </div>
        </div>
    )
}