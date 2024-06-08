import { useFormik } from "formik";
import * as Yup from "yup";

const useUserForm = (initialValues, onSubmit, isEditMode) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      Username: Yup.string().required("Username is required"),
      FirstName: Yup.string().required("First name is required"),
      LastName: Yup.string().required("Last name is required"),
      Email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      PhoneNumber: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values) => {
      await onSubmit(values);
    },
    enableReinitialize: true,
  });

  return formik;
};

export default useUserForm;
