import { useFormik } from "formik";
import * as Yup from "yup";

const useQuizForm = (initialValues, onSubmit) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      question: Yup.string().required("Question is required"),
      answer: Yup.array()
        .of(Yup.string().required("Answer is required"))
        .required("Answers are required"),
    }),
    onSubmit: async (values) => {
      await onSubmit(values);
    },
    enableReinitialize: true,
  });

  return formik;
};

export default useQuizForm;
