import { useFormik } from "formik";
import * as Yup from "yup";

const useRiskLevelForm = (initialValues, onSubmit) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      criteria: Yup.array()
        .of(Yup.string().required("Criterion is required"))
        .required("At least one criterion is required"),
      recommendations: Yup.object().shape({
        // Add validation schema for recommendations here
        // Example:
        mammography: Yup.object().shape({
          description: Yup.string().required("Description is required"),
          frequency: Yup.string().required("Frequency is required"),
          source: Yup.string().required("Source is required"),
        }),
      }),
    }),
    onSubmit: async (values) => {
      await onSubmit(values);
    },
    enableReinitialize: true,
  });

  return formik;
};

export default useRiskLevelForm;
