import { useEffect,useState } from "react"
import Accordion from 'react-bootstrap/Accordion';

export function Notification(){
    const [commissionList, setCommissionList] = useState([]);
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/ExamApp/commissionList/")
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setCommissionList(data);
        })
    },[])
    return(
        <div className="container">
            <div className="container container-fluid bg-light-subtle my-3">
                <div className="row d-flex">
                    <div className="col-sm-4 text-center">
                        <h5>Section</h5>
                        <hr/>
                        <div className="ms-2 my-2">
                            {
                                commissionList.map((list,index)=>( 
                                    <Accordion key={list.id}>
                                        <Accordion.Item eventKey={index}>
                                            <Accordion.Header>{list.name}</Accordion.Header>
                                                <Accordion.Body>

                                                </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ))
                            }
                        </div>
                        
                    </div>
                    <div className="col-sm-8">
                        <div className="mx-3">
                            <h5 className="text-center">Notification</h5>

                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}