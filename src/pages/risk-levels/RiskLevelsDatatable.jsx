import "../../components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { riskLevelsColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import EditRiskLevelModal from "../../components/modal/EditRiskLevelModal";

const RiskLevelsDatatable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "BreastCancerRiskLevels"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
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
      await deleteDoc(doc(db, "BreastCancerRiskLevels", id));
      setData(data.filter((item) => item.id !== id));
      toast.success("Data deleted successfully");
    } catch (err) {
      toast.error("Failed to delete data");
      console.log(err);
    }
  };

  const handleEdit = (level) => {
    setSelectedLevel(level);
    setOpen(true);
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
        columns={riskLevelsColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowHeight={(params) => 300}
      />
      {selectedLevel && (
        <EditRiskLevelModal
          open={open}
          onClose={() => setOpen(false)}
          level={selectedLevel}
        />
      )}
    </div>
  );
};

export default RiskLevelsDatatable;
