import * as Yup from "yup";

export const CarSchema = Yup.object().shape({
  model: Yup.string().required("Обов'язкове поле"),
  acceleation: Yup.string().required("Обов'язкове поле"),
  consumption: Yup.string().required("Обов'язкове поле"),
  power: Yup.string().required("Обов'язкове поле"),
  maxspeed: Yup.string().required("Обов'язкове поле"),
  period: Yup.string().required("Обов'язкове поле"),
  price: Yup.string().required("Обов'язкове поле"),
  totalFirstPayment: Yup.string().required("Обов'язкове поле"),
});
