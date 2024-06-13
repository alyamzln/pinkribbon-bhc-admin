import "../../components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { quizColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import EditQuizModal from "../../components/modal/EditQuizModal";

const QuizDatatable = () => {
  const [data, setData] = useState([]);
  const [openQuiz, setOpenQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "EduContentQuiz"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list.filter((item) => item.contentType === "quiz"));
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "EduContentQuiz", id));
      setData(data.filter((item) => item.id !== id));
      toast.success("Quiz deleted successfully");
    } catch (err) {
      toast.error("Failed to delete quiz");
      console.log(err);
    }
  };

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setOpenQuiz(true);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="editButton"
              onClick={() => handleEditQuiz(params.row)}
            >
              Edit
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <ToastContainer />
      <div className="datatableTitle">
        Add Quiz
        <Link to="/quiz/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={quizColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      {selectedQuiz && (
        <EditQuizModal
          open={openQuiz}
          onClose={() => setOpenQuiz(false)}
          quiz={selectedQuiz}
        />
      )}
    </div>
  );
};

export default QuizDatatable;
