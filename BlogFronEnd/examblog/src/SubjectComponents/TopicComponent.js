import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom"

export function TopicComponent(){
  const params = useParams();
  const [topicContent,setTopicContent] = useState([])
  const [selectedNoteId,setSelectedNoteId] = useState(null)
  const [noteList,setNoteList] = useState([]);

  useEffect(()=>{
    fetch(`http://127.0.0.1:8000/ExamApp/noteChapter/${params.id}/`)
    .then(response=>response.json())
    .then(data=>{
      setTopicContent(data);
      console.log(data);
      console.log(params.id);
      if (data.length > 0) {
        handleNotesClick(data[0].id);
      };
    });
  },[params.id]);

  const handleNotesClick = (notesId) => {
        fetch(`http://127.0.0.1:8000/ExamApp/note/${notesId}/`)
        .then(response=>response.json())
        .then(data=>{
            setNoteList(data);
            console.log("notesId:-",notesId);
            console.log(data);
        });
        setSelectedNoteId(notesId);
      };
  
  const chapterName = topicContent.length>0 ? topicContent[0].chapterRelated?.chapterName: "";

  return(
    <div className="container-sm ">
      <div className="jumbotron shadow bg-light rounded mt-3 pb-3">
        <div className="container">
          <h2 className="ps-1 pt-2 title" id="title">{chapterName}</h2>
            <hr/>
              <div className="row">
                <div className="col-md-3">
                  <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-danger text-center" aria-current="true">Chapter</button>
                    {
                      topicContent.map(topic=>(
                        <Link key={topic.id} className={`list-group-item list-group-item-action 
                                              ${selectedNoteId === topic.id ? "list-group-item-info" : ""}`} 
                                              onClick={()=>handleNotesClick(topic.id)}>
                                              {topic.title}
                        </Link>
                      ))
                    }
                  </div>
                </div>
                <div className="col-md-9">
                  {
                    <div className="cardBlog card shadow mb-5 bg-body-tertiary rounded">
                      <div className="container">
                        <div className="card-body">
                            <Link className="link-dark link-underline-light link-offset-2 link-underline-opacity-100-hover text-nowrap"
                                      to={'/singleblog/'} target="_blank" rel="noopener noreferrer">
                                      <h4 className="title mb-3">{noteList.title}</h4>
                            </Link>
                            <hr/>
                            <div dangerouslySetInnerHTML={{ __html: noteList.content }} />  
                            <hr/>
                            {
                              noteList.Tags && noteList.Tags.map(tags=>(
                                  <button key={tags.id} className="btn btn-danger btn-sm mt-2 mx-1">{tags.name}</button>
                                ))
                            }
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
        </div>
      </div>
    </div>
  )
}
