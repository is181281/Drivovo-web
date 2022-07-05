import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .lowercase()
    .trim()
    .email("Невірний email")
    .required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, "Мінінмум 6 символів")
    .max(30, "Максимум 30 символів")
    .trim()
    .required("Обов'язкове поле"),
});
