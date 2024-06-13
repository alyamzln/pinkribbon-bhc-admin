import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import useEduContentForm from "../../hooks/useEduContentForm";

const EditEduContentModal = ({ open, onClose, content }) => {
  const formik = useEduContentForm(
    {
      title: content?.title || "",
      description: content?.description || "",
      image: content?.image || "",
    },
    async (values) => {
      try {
        await updateDoc(doc(db, "EduContentQuiz", content.id), values);
        toast.success("Content updated successfully");
        onClose();
      } catch (error) {
        toast.error("Failed to update content");
        console.error("Error updating content: ", error);
      }
    }
  );

  useEffect(() => {
    if (content) {
      formik.setValues({
        title: content.title,
        description: content.description,
        image: content.image,
      });
    }
  }, [content]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Educational Content</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          margin="dense"
          id="image"
          label="Image URL"
          type="text"
          fullWidth
          name="image"
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
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

export default EditEduContentModal;
