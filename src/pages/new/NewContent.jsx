import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useEduContentForm from "../../hooks/useEduContentForm";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const NewContent = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPerc(progress);
        },
        (error) => {
          toast.error("File upload failed!");
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
            toast.success("File uploaded successfully!");
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const formik = useEduContentForm(
    {
      title: "",
      description: "",
      image: "",
    },
    async (values) => {
      try {
        await setDoc(doc(db, "EduContentQuiz", values.title), {
          ...values,
          img: data.img || "",
          timeStamp: serverTimestamp(),
        });
        toast.success("Content added successfully!");
        navigate(-1);
      } catch (error) {
        toast.error("Failed to add content. Please try again.");
        console.error("Error adding content: ", error);
      }
    }
  );

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={formik.handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    {...formik.getFieldProps(input.id)}
                  />
                  {formik.touched[input.id] && formik.errors[input.id] ? (
                    <div className="error">{formik.errors[input.id]}</div>
                  ) : null}
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewContent;
