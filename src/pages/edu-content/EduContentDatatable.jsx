import "../../components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { eduContentColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import EditEduContentModal from "../../components/modal/EditEduContentModal";

const EduContentDatatable = () => {
  const [data, setData] = useState([]);
  const [openContent, setOpenContent] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "EduContentQuiz"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list.filter((item) => item.contentType === "content"));
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
      "Are you sure you want to delete this content?"
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "EduContentQuiz", id));
      setData(data.filter((item) => item.id !== id));
      toast.success("Content deleted successfully");
    } catch (err) {
      toast.error("Failed to delete content");
      console.log(err);
    }
  };

  const handleEditContent = (content) => {
    setSelectedContent(content);
    setOpenContent(true);
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
              onClick={() => handleEditContent(params.row)}
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
        Add Educational Content
        <Link to="/educontent/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={eduContentColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      {selectedContent && (
        <EditEduContentModal
          open={openContent}
          onClose={() => setOpenContent(false)}
          content={selectedContent}
        />
      )}
    </div>
  );
};

export default EduContentDatatable;
