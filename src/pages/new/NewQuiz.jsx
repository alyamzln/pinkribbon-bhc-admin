import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useQuizForm from "../../hooks/useQuizForm";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const NewQuiz = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const formik = useQuizForm(
    {
      question: "",
      answer: [""],
    },
    async (values) => {
      try {
        await setDoc(doc(db, "EduContentQuiz", values.question), {
          ...values,
          timeStamp: serverTimestamp(),
        });
        toast.success("Quiz added successfully!");
        navigate(-1);
      } catch (error) {
        toast.error("Failed to add quiz. Please try again.");
        console.error("Error adding quiz: ", error);
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
          <div className="right">
            <form onSubmit={formik.handleSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "text" ? (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      {...formik.getFieldProps(input.id)}
                    />
                  ) : (
                    <textarea
                      id={input.id}
                      placeholder={input.placeholder}
                      {...formik.getFieldProps(input.id)}
                    />
                  )}
                  {formik.touched[input.id] && formik.errors[input.id] ? (
                    <div className="error">{formik.errors[input.id]}</div>
                  ) : null}
                </div>
              ))}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewQuiz;
