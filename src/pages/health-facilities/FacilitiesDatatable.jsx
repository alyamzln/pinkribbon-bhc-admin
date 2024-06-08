import "../../components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { facilitiesColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../../firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import EditFacilityModal from "../../components/modal/EditFacilityModal";

const FacilitiesDatatable = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "HealthcareFacilities"),
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
      "Are you sure you want to delete this facility?"
    );
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, "HealthcareFacilities", id));
      setData(data.filter((item) => item.id !== id));
      toast.success("Facility deleted successfully");
    } catch (err) {
      toast.error("Failed to delete facility");
      console.log(err);
    }
  };

  const handleEdit = (facility) => {
    setSelectedFacility(facility);
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
      <div className="datatableTitle">
        Add Healthcare Facilities
        <Link to="/healthcarefacilities/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={facilitiesColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      {selectedFacility && (
        <EditFacilityModal
          open={open}
          onClose={() => setOpen(false)}
          facility={selectedFacility}
        />
      )}
    </div>
  );
};

export default FacilitiesDatatable;
