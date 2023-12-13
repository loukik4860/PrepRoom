import axios from "axios";
import { useFormik } from "formik";

export function AddImage() {
  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
      caption: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("image", values.image);
      formData.append("caption", values.caption);
        
      try {
        const response = await axios.post("http://127.0.0.1:8000/ExamApp/imageCreate/", formData,
         {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // Assuming the server responds with a success message
        console.log(response.data);
        alert("Image Added");
        resetForm();
      } catch (error) {
        // Handle errors here
        console.error("Error", error);
      }
    },
  });

  

  return (
    <div className="container container-fluid bg-white shadow mt-3 px-3">
      <div className="container py-3 px-3">
        <h3>Add Image</h3>
        <form onSubmit={formik.handleSubmit}>
          <dl>
            <dt>Name</dt>
                <dd> 
                    <input type="text" className="form-control" name="name" onChange={formik.handleChange} value={formik.values.name}  />
                </dd>
            <dt>Image</dt>
                <dd>
                    <input type="file" className="form-control" name="image" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} />
                </dd>
            <dt>Caption</dt>
                <dd>
                    <input type="text" className="form-control" name="caption" onChange={formik.handleChange} value={formik.values.caption}/>
                </dd>
          </dl>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
