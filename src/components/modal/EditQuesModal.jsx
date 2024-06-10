import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  question: Yup.string().required("Question is required"),
  answer: Yup.string().required("Answer is required"),
  score: Yup.number().required("Score is required").min(0),
  alertMessage: Yup.string(),
  showAlert: Yup.boolean(),
  highRisk: Yup.boolean(),
});

const EditQuestionModal = ({ open, onClose, questionData }) => {
  const formik = useFormik({
    initialValues: {
      question: questionData?.question || "",
      answer: questionData?.answer || "",
      score: questionData?.score || 0,
      showAlert: questionData?.showAlert || false,
      alertMessage: questionData?.alertMessage || "",
      highRisk: questionData?.highRisk || false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Extract the document ID from the questionData.id
        const documentId = questionData.id.split("-")[0];
        console.log(documentId);
        console.log(questionData);

        // Update the specific document in the "RiskQuestions" collection
        await updateDoc(doc(db, "RiskQuestions", documentId), {
          ...questionData,
          questions: questionData.questions.map((q) => {
            if (q.question === values.question) {
              return {
                ...q,
                answers: q.answers.map((a) =>
                  a.text === values.answer
                    ? {
                        ...a,
                        score: values.score,
                        showAlert: values.showAlert,
                        alertMessage: values.alertMessage,
                        highRisk: values.highRisk,
                      }
                    : a
                ),
              };
            }
            return q;
          }),
        });

        toast.success("Question updated successfully");
        onClose();
      } catch (error) {
        toast.error("Failed to update question");
        console.error("Error updating question: ", error);
      }
    },
  });

  useEffect(() => {
    if (questionData) {
      formik.setValues({
        question: questionData.question,
        answer: questionData.answer,
        score: questionData.score,
        showAlert: questionData.showAlert,
        alertMessage: questionData.alertMessage,
        highRisk: questionData.highRisk,
      });
    }
  }, [questionData]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Question</DialogTitle>
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
          name="answer"
          value={formik.values.answer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.answer && Boolean(formik.errors.answer)}
          helperText={formik.touched.answer && formik.errors.answer}
        />
        <TextField
          margin="dense"
          id="score"
          label="Score"
          type="number"
          fullWidth
          name="score"
          value={formik.values.score}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.score && Boolean(formik.errors.score)}
          helperText={formik.touched.score && formik.errors.score}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.showAlert}
              onChange={formik.handleChange}
              name="showAlert"
            />
          }
          label="Show Alert"
        />
        <TextField
          margin="dense"
          id="alertMessage"
          label="Alert Message"
          type="text"
          fullWidth
          name="alertMessage"
          value={formik.values.alertMessage}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.alertMessage && Boolean(formik.errors.alertMessage)
          }
          helperText={formik.touched.alertMessage && formik.errors.alertMessage}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.highRisk}
              onChange={formik.handleChange}
              name="highRisk"
            />
          }
          label="High Risk"
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

export default EditQuestionModal;
