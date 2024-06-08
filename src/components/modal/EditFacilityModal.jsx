import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { updateDoc, doc, GeoPoint } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import useFacilityForm from "../../hooks/useFacilityForm";
import { healthcareInputs } from "../../formSource";

const EditFacilityModal = ({ open, onClose, facility }) => {
  const formik = useFacilityForm(
    {
      region: facility?.region || "",
      name: facility?.name || "",
      address: facility?.address || "",
      contactNum: facility?.contactNum || "",
      website: facility?.website || "",
      coordinates: {
        latitude: facility?.coordinates?.latitude || "",
        longitude: facility?.coordinates?.longitude || "",
      },
    },
    async (values) => {
      try {
        const geoPoint = new GeoPoint(
          parseFloat(values.coordinates.latitude),
          parseFloat(values.coordinates.longitude)
        );

        await updateDoc(doc(db, "HealthcareFacilities", facility.id), {
          ...values,
          coordinates: geoPoint,
        });

        toast.success("Facility updated successfully");
        onClose();
      } catch (error) {
        toast.error("Failed to update facility");
        console.error("Error updating facility: ", error);
      }
    }
  );

  useEffect(() => {
    if (facility) {
      formik.setValues({
        region: facility.region,
        name: facility.name,
        address: facility.address,
        contactNum: facility.contactNum,
        website: facility.website,
        coordinates: {
          latitude: facility.coordinates?.latitude || "",
          longitude: facility.coordinates?.longitude || "",
        },
      });
    }
  }, [facility]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Facility</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense">
          <InputLabel id="region-label">Region</InputLabel>
          <Select
            labelId="region-label"
            id="region"
            name="region"
            value={formik.values.region}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.region && Boolean(formik.errors.region)}
          >
            {healthcareInputs
              .find((input) => input.id === "region")
              .options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          id="name"
          label="Facility Name"
          type="text"
          fullWidth
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          margin="dense"
          id="address"
          label="Address"
          type="text"
          fullWidth
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
        />
        <TextField
          margin="dense"
          id="contactNum"
          label="Contact Number"
          type="text"
          fullWidth
          name="contactNum"
          value={formik.values.contactNum}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.contactNum && Boolean(formik.errors.contactNum)}
          helperText={formik.touched.contactNum && formik.errors.contactNum}
        />
        <TextField
          margin="dense"
          id="website"
          label="Website"
          type="text"
          fullWidth
          name="website"
          value={formik.values.website}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.website && Boolean(formik.errors.website)}
          helperText={formik.touched.website && formik.errors.website}
        />
        <TextField
          margin="dense"
          id="latitude"
          label="Latitude"
          type="text"
          fullWidth
          name="coordinates.latitude"
          value={formik.values.coordinates.latitude}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.coordinates?.latitude &&
            Boolean(formik.errors.coordinates?.latitude)
          }
          helperText={
            formik.touched.coordinates?.latitude &&
            formik.errors.coordinates?.latitude
          }
        />
        <TextField
          margin="dense"
          id="longitude"
          label="Longitude"
          type="text"
          fullWidth
          name="coordinates.longitude"
          value={formik.values.coordinates.longitude}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.coordinates?.longitude &&
            Boolean(formik.errors.coordinates?.longitude)
          }
          helperText={
            formik.touched.coordinates?.longitude &&
            formik.errors.coordinates?.longitude
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={formik.handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFacilityModal;
