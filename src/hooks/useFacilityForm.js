import { useFormik } from "formik";
import * as Yup from "yup";

// Custom URL validation to allow URLs without the protocol prefix
const customUrlValidation = (value) => {
  if (!value) return true; // Allow empty values (optional field)
  const urlPattern =
    /^(http(s)?:\/\/)?(www\.)?[\w.-]+\.[a-z]{2,}(\.[a-z]{2,})?(\/.*)?$/i;
  return urlPattern.test(value);
};

const useFacilityForm = (initialValues, onSubmit) => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      region: Yup.string().required("Region is required"),
      name: Yup.string().required("Facility name is required"),
      address: Yup.string().required("Address is required"),
      contactNum: Yup.string().required("Contact number is required"),
      website: Yup.string().test(
        "is-url-valid",
        "Invalid URL",
        customUrlValidation
      ),
      coordinates: Yup.object({
        latitude: Yup.number().typeError("Latitude must be a number"),
        longitude: Yup.number().typeError("Longitude must be a number"),
      }),
    }),
    onSubmit: async (values) => {
      await onSubmit(values);
    },
    enableReinitialize: true,
  });

  return formik;
};

export default useFacilityForm;
