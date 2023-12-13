import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";

export function AddNotes() {
  const [chapterList, setChapterList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const editor = useRef(null);
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      chapter: "",
      tags: [],
      title_image: "",
    },
    onSubmit: (values,{resetForm}) => {
      console.log(JSON.stringify(values));
      console.log("form Values:-", values);
      axios({
        method: "POST",
        url: "http://127.0.0.1:8000/ExamApp/notesCreate/",
        data: values,
      })
      .then(() => {
        alert("Notes Added");
        alert("values",values)
        resetForm()
      })
      .catch((error) => {
        console.error("Error", error);
        resetForm()
      });
    },
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ExamApp/ChapterList/")
      .then((response) => response.json())
      .then((data) => {
        setChapterList(data);
        console.log(data);
      });

    fetch("http://127.0.0.1:8000/blogApp/taglist/")
      .then((response) => response.json())
      .then((data) => {
        setTagList(data);
        console.log(data);
      });

    fetch("http://127.0.0.1:8000/ExamApp/imageList/")
      .then((response) => response.json())
      .then((data) => {
        setImageList(data);
        console.log(data);
      });
  }, []); // Empty dependency array to run the effect only once
  
  const handleEditorChange = (newContent) =>{
    formik.setFieldValue("content",newContent);
  };
  return (
    <div className="container bg-light shadow my-3">
      <div className="jumbotron jumbotron-fluid py-3 px-3">
        <h3>Add Notes</h3>
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dt>Title</dt>
            <dd>
              <input type="text" className="form-control" name="title" onChange={formik.handleChange} value={formik.values.title} />
            </dd>
            <dt>Content</dt>
            <dd>
              <JoditEditor type="text"  ref={editor} tabIndex = {2} className="form-control" name="content" onChange={handleEditorChange} value={formik.values.content} />
            </dd>
            <dt>Chapter</dt>
            <dd>
              <select className="form-select" aria-label="Default select example" name="chapter" onChange={formik.handleChange} value={formik.values.chapter}>
                  <option value="">select</option>
                    {
                      chapterList.map((chapter) => (
                        <option key={chapter.id} className="text-dark" value={chapter.id}>
                          {chapter.chapterName}
                        </option>
                      ))
                    }
              </select>
            </dd>
            <dt>Tags</dt>
            <dd>
              <select className="form-select" multiple aria-label="Multiple select example" name="tags" onChange={formik.handleChange} value={formik.values.tags} size={15}>
                {tagList.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </dd>
            <dt>Title Image</dt>
            <dd>
              <select className="form-select" aria-label="Default select example" name="title_image" onChange={formik.handleChange} value={formik.values.title_image}>
                <option value="">select</option>
                {
                  imageList.map((image) => (
                    <option key={image.id} className="text-dark" value={image.id}>
                      {image.id}--{image.caption}
                    </option>
                  ))
                }
              </select>
            </dd>
          </dl>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
