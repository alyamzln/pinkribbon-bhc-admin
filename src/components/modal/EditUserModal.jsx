import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { updateDoc, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import useUserForm from "../../hooks/useUserForm";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./editUserModal.scss";

const EditUserModal = ({ open, onClose, user }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imgUrl, setImgUrl] = useState(user?.img || "");

  const formik = useUserForm(
    {
      Username: user?.Username || "",
      FirstName: user?.FirstName || "",
      LastName: user?.LastName || "",
      Email: user?.Email || "",
      PhoneNumber: user?.PhoneNumber || "",
    },
    async (values) => {
      try {
        let newImgUrl = imgUrl;
        if (file) {
          setUploading(true);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);

          await new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              () => {},
              reject,
              async () => {
                newImgUrl = await getDownloadURL(uploadTask.snapshot.ref);
                resolve();
              }
            );
          });
          setUploading(false);
        }

        await updateDoc(doc(db, "Users", user.id), {
          ...values,
          img: newImgUrl,
        });
        toast.success("User updated successfully");
        onClose();
      } catch (error) {
        toast.error("Failed to update user");
        console.error("Error updating user: ", error);
        setUploading(false);
      }
    },
    true // isEditMode
  );

  useEffect(() => {
    if (user) {
      formik.setValues({
        Username: user.Username,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        PhoneNumber: user.PhoneNumber,
      });
      setImgUrl(user.img || "");
    }
  }, [user]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setImgUrl(objectUrl);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <div className="image-container">
          <label htmlFor="file" className="image-label">
            <DriveFolderUploadOutlinedIcon className="upload-icon" />
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <img
              src={
                imgUrl
                  ? imgUrl
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Profile"
              className="profile-image"
            />
          </label>
        </div>
        <TextField
          margin="dense"
          id="Username"
          label="Username"
          type="text"
          fullWidth
          value={formik.values.Username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.Username && Boolean(formik.errors.Username)}
          helperText={formik.touched.Username && formik.errors.Username}
        />
        <TextField
          margin="dense"
          id="FirstName"
          label="First Name"
          type="text"
          fullWidth
          value={formik.values.FirstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
          helperText={formik.touched.FirstName && formik.errors.FirstName}
        />
        <TextField
          margin="dense"
          id="LastName"
          label="Last Name"
          type="text"
          fullWidth
          value={formik.values.LastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.LastName && Boolean(formik.errors.LastName)}
          helperText={formik.touched.LastName && formik.errors.LastName}
        />
        <TextField
          margin="dense"
          id="Email"
          label="Email"
          type="email"
          fullWidth
          value={formik.values.Email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.Email && Boolean(formik.errors.Email)}
          helperText={formik.touched.Email && formik.errors.Email}
          disabled // Disable the email field for editing
        />
        <TextField
          margin="dense"
          id="PhoneNumber"
          label="Phone Number"
          type="text"
          fullWidth
          value={formik.values.PhoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.PhoneNumber && Boolean(formik.errors.PhoneNumber)
          }
          helperText={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          Cancel
        </Button>
        <Button
          onClick={formik.handleSubmit}
          color="primary"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
