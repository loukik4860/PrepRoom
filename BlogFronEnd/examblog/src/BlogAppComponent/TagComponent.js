import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import "../BlogAppComponent/static/TagComponents.css"

export function TagComponent(){
    const [tagList,setTagList] = useState([])

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/blogApp/tagpost/')
        .then(response=>response.json())
        .then(data=>{
            setTagList(data)
        })
    },[])
    return(
        <div className="row align-items-center mt-2 mb-2">
            <div className="container bg-light pb-3">
                <div className="jombotron jumbotron-fluid ">
                   <h3 className="tagHeadline">Tag</h3>
                    <hr/>
                    <div className="col-12 tagContainer">
                        {
                            tagList.map((tag,index)=>
                                            <Link key={tag.id} to={`/tagDetails/${tag.id}`}><button key={tag.id} type="button" className=" btn btn-danger btn-sm mt-2 m-lg-1 my-3">{tag.name.toUpperCase()}</button></Link>
                                        )
                        }
                    </div> 
                </div>
            </div>
        </div>
    )
}