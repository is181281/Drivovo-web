import * as Yup from "yup";
import "yup-phone";

export const MailingSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Min3")
    .max(50, "Max50")
    .trim()
    .required("Required"),
  email: Yup.string()
    .email("InvalidEmail")
    .trim()
    .lowercase()
    .required("Required"),
  phone: Yup.string()
    .trim()
    .phone("UA", false, "InvalidPhone")
    .required("Required"),
  socialLink: Yup.string().required("Required"),
});
