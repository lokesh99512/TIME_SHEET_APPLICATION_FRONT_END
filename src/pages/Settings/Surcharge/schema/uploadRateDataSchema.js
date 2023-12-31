import * as yup from "yup";

export const uploadRateDataSchema = yup.object().shape({
  surchargeCode: yup.string().required("Surcharge code required"),
  surchargeDesc: yup.string().required("Surcharge desc required"),
  surchargeCategory: yup.string().required("Surcharge category required"),
  surchargeAliasCode: yup.string(),
  surchargeAliasDesc: yup.string(),
});
