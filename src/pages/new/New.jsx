import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { auth, db, storage } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import useUserForm from "../../hooks/useUserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const New = ({ inputs, title }) => {
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

  const formik = useUserForm(
    {
      Username: "",
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber: "",
      Password: "",
    },
    async (values) => {
      try {
        const res = await createUserWithEmailAndPassword(
          auth,
          values.Email,
          values.Password
        );
        await setDoc(doc(db, "Users", res.user.uid), {
          ...values,
          img: data.img || "",
          timeStamp: serverTimestamp(),
        });
        toast.success("User added successfully!");
        navigate(-1);
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use. Please use a different email.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please enter a valid email.");
        } else if (error.code === "auth/weak-password") {
          toast.error("Weak password. Please enter a stronger password.");
        } else {
          toast.error("Failed to add user. Please try again.");
        }
        console.error("Error adding user: ", error);
      }
    },
    false // isEditMode
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

export default New;
