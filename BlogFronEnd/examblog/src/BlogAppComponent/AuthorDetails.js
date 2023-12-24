import { useEffect, useState } from "react";

export function AuthorDetailsComponent() {
  const [authorList, setAuthorList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/blogApp/authorDetails/")
      .then((response) => response.json())
      .then((data) => {
        setAuthorList(data);
      });
  }, []); 

  return (
    <div className="container bg-light mt-3">
      <div className="heading">
        <h3>Author Details with BlogPost, Tags</h3>
      </div>
      <div className="row mt-2">
        <div className="col-4">
          <h3>Author</h3>
          <div className="jumbotron">
            {authorList.map((author, index) => (
              <div key={index}>
                <div className="col3 mt-3 mb-3 shadow border border-dark-subtle rounded">
                  <h6>Email: {author.Author_email}</h6>
                  <p>First Name: {author.Author_firstName}</p>
                  <p>Last Name: {author.Author_lastName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-8">
          <h3>Hello</h3>
        </div>
      </div>
    </div>
  );
}
