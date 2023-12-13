import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AddImageComp() {
  const [imageList, setImageList] = useState([]);
  const [copiedText, setCopiedText] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ExamApp/imageList/")
      .then((response) => response.json())
      .then((data) => {
        setImageList(data);
        console.log(data);
      });
  }, []);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
  };

  return (
    <div className="container container-sm bg-light shadow my-3">
      <div className="container container-fluid py-3 px-3">
        <Link><h5>Add image</h5> </Link>
        {imageList.map((image) => (
          <div className="card mb-3" style={{ maxWidth: "75rem"}} key={image.id}>
            <div className="row g-1">
              <div className="col-md-4">
                <img src={image.image} className="img-fluid rounded-start"  alt={`Image ${image.id}`} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{image.title}</h5>
                  <p className="card-text">{image.caption}</p>

                  <p className="card-text">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder={image.image}  aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary" type="button" onClick={() => copyToClipboard(image.image)}>Copy</button>
                    </div>
                    </div>
                    {copiedText === image.image && <span className="ms-2 text-success">Copied!</span>}  
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
