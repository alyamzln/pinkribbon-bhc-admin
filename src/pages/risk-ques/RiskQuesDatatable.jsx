import React, { useEffect, useState } from "react";
import "../../components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { riskQuesColumns } from "../../datatablesource";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import EditQuestionModal from "../../components/modal/EditQuesModal";

const RiskQuesDatatable = () => {
  const [data, setData] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "RiskQuestions"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.questions && Array.isArray(data.questions)) {
            data.questions.forEach((questionItem, questionIndex) => {
              if (questionItem.answers && Array.isArray(questionItem.answers)) {
                questionItem.answers.forEach((answerItem, answerIndex) => {
                  list.push({
                    id: `${doc.id}-${questionIndex}-${answerIndex}`, // Unique identifier
                    part: data.part,
                    question: questionItem.question,
                    answer: answerItem.text,
                    score: answerItem.score,
                    showAlert: answerItem.showAlert,
                    alertMessage: answerItem.alertMessage,
                    highRisk: answerItem.highRisk || false,
                    nextQuestions: answerItem.nextQuestions || [],
                  });
                });
              }
            });
          }
        });
        setData(list);
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
      "Are you sure you want to delete this data?"
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "RiskQuestions", id.split("-")[0])); // Only the document ID part
      setData(data.filter((item) => item.id !== id));
      toast.success("Data deleted successfully");
    } catch (err) {
      toast.error("Failed to delete data");
      console.log(err);
    }
  };

  const handleEdit = (question) => {
    setSelectedQuestion(question);
    setEditModalOpen(true);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="editButton" onClick={() => handleEdit(params.row)}>
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
      <DataGrid
        className="datagrid"
        rows={data}
        columns={riskQuesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowHeight={() => 100}
      />
      {selectedQuestion && (
        <EditQuestionModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          questionData={selectedQuestion}
        />
      )}
    </div>
  );
};

export default RiskQuesDatatable;
