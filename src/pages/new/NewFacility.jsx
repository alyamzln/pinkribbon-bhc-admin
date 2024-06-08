import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { db } from "../../firebase";
import { GeoPoint } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useFacilityForm from "../../hooks/useFacilityForm";
import { healthcareInputs } from "../../formSource";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import InputMask from "react-input-mask";

const NewFacility = ({ title }) => {
  const navigate = useNavigate();

  const formik = useFacilityForm(
    {
      name: "",
      address: "",
      region: "",
      contactNum: "",
      website: "",
      latitude: "",
      longitude: "",
    },
    async (values) => {
      try {
        await addDoc(collection(db, "HealthcareFacilities"), {
          name: values.name,
          address: values.address,
          region: values.region,
          contactNum: values.contactNum,
          website: values.website,
          coordinates: new GeoPoint(
            parseFloat(values.latitude),
            parseFloat(values.longitude)
          ),
          timeStamp: serverTimestamp(),
        });
        toast.success("Facility added successfully!");
        setTimeout(() => {
          navigate(-1);
        }, 1300);
      } catch (error) {
        toast.error("Failed to add facility");
        console.error("Error adding facility: ", error);
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
          <div className="right">
            <form onSubmit={formik.handleSubmit}>
              {healthcareInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  {input.type === "select" ? (
                    <FormControl fullWidth margin="dense">
                      <InputLabel id={`${input.id}-label`}>
                        {input.label}
                      </InputLabel>
                      <Select
                        labelId={`${input.id}-label`}
                        id={input.id}
                        name={input.id}
                        value={formik.values[input.id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched[input.id] &&
                          Boolean(formik.errors[input.id])
                        }
                      >
                        {input.options.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      fullWidth
                      margin="dense"
                      value={formik.values[input.id]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched[input.id] &&
                        Boolean(formik.errors[input.id])
                      }
                      helperText={
                        formik.touched[input.id] && formik.errors[input.id]
                      }
                    />
                  )}
                </div>
              ))}
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewFacility;
