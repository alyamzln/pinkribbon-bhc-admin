import { useFormik } from "formik";
import * as Yup from "yup";

const useEduContentForm = (initialValues, onSubmit) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.string()
        .url("Invalid URL format")
        .required("Image URL is required"),
    }),
    onSubmit: async (values) => {
      await onSubmit(values);
    },
    enableReinitialize: true,
  });

  return formik;
};

export default useEduContentForm;
