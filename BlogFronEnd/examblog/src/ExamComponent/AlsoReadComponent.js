import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AlsoReadComponent(props) {
  const [taglist, setTagList] = useState([]);
  const parameter = props.subjectName

  useEffect(() => {
    const encodedParameter = encodeURIComponent(parameter);
    console.log("Encoded Parameter",encodedParameter);
    fetch(`http://127.0.0.1:8000/blogApp/tag/${encodedParameter}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTagList(data);
        console.log(data);
      })
      .catch(error => {
        console.error("Error fetching tag data:", error);
      });
  }, [parameter]);
  


  return (
    
    <div className="container-sm">
      <div className="jumbotron rounded-top mt-3 my-3">
        {/* <h5 className="text-center">{taglist.name}</h5> */}
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3  px-2">
            {
              taglist && taglist.map((tags) => (
                <div className="card mx-1 py-2" style={{ width: '20rem' }} key={tags.id}>
                  <img src={tags.TitleBlog.image} className="card-img-top" alt={tags.TitleBlog.id} style={{ height: '200px' }}/>
                  <div className="card-body">
                    <h6 className="card-title">{tags.title}</h6>
                    <p className="card-text">{tags.subTitle}</p>
                    <noscript>
                      <Link  className="btn btn-primary">
                        Go somewhere
                      </Link>
                    </noscript>
                  </div>
                </div>
              ))
            }
        </div>
      </div>
    </div>
  );
}
