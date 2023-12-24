import { useEffect,useState } from "react"
import pic2 from "../Images/new.gif"

export function  NotificationTable(){
    const[notificationList,setNotificationList] = useState([]);
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/ExamApp/notificationList/')
        .then(response=>response.json())
        .then((data)=>{
           setNotificationList(data)
           console.log("Notification:-",data); 
        })
    },[])
    function isPost10DaysOld(created_at)
    {
        const createdAtDate = new Date(created_at);
        const currentDate = new Date();
        const timeDifference = currentDate - createdAtDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        return daysDifference <= 10;
    }
    return(
        <div className="container">
            <table className="table table-striped table-hover table-bordered">
                <thead className="thead-dark">
                   
                </thead>
                <tbody>
                        {
                            notificationList.map((list)=>(
                                <tr key={list.id}>
                                    <td scope="row" className="text-center">{list.name}
                                    {isPost10DaysOld(list.created_at)?  <img src={pic2} alt="New"
                                        style={{ width: "35px", height: "35px" }} />:null}
                                    </td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </div>
    )
}