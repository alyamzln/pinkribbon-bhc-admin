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
import useQuizForm from "../../hooks/useQuizForm";

const EditQuizModal = ({ open, onClose, quiz }) => {
  const formik = useQuizForm(
    {
      question: quiz?.question || "",
      answer: quiz?.answer || [],
    },
    async (values) => {
      try {
        await updateDoc(doc(db, "EduContentQuiz", quiz.id), values);
        toast.success("Quiz updated successfully");
        onClose();
      } catch (error) {
        toast.error("Failed to update quiz");
        console.error("Error updating quiz: ", error);
      }
    }
  );

  useEffect(() => {
    if (quiz) {
      formik.setValues({
        question: quiz.question,
        answer: quiz.answer,
      });
    }
  }, [quiz]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Quiz</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="question"
          label="Question"
          type="text"
          fullWidth
          name="question"
          value={formik.values.question}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.question && Boolean(formik.errors.question)}
          helperText={formik.touched.question && formik.errors.question}
        />
        <TextField
          margin="dense"
          id="answer"
          label="Answer"
          type="text"
          fullWidth
          multiline
          rows={4}
          name="answer"
          value={formik.values.answer.join(", ")}
          onChange={(e) =>
            formik.setFieldValue(
              "answer",
              e.target.value.split(",").map((item) => item.trim())
            )
          }
          onBlur={formik.handleBlur}
          error={formik.touched.answer && Boolean(formik.errors.answer)}
          helperText={formik.touched.answer && formik.errors.answer}
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

export default EditQuizModal;
