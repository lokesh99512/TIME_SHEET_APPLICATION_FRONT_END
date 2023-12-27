import { useDispatch } from "react-redux";
import { uploadRateDataSchema } from "../schema";
import { getAllAddSurchargeData } from "../../../../store/Settings/actions";
import { useSelector } from "react-redux";

export const useUploadRateData = () => {
  const dispatch = useDispatch();

  const {
   
    settings_all_category_data,
    settings_surcharges_alias_table_data,
  } = useSelector((state) => state.settings);
  const initialValue = {
    surchargeCode: "",
    surchargeDesc: "",
    surchargeCategory: "",
    surchargeAliasCode: "",
    surchargeAliasDesc: "",
  };
  const handleSubmit = (values,{resetForm}) => {
    try {
      const targetSurchargeCategory = values.surchargeCategory;
      const foundCategory = settings_all_category_data.content.find(
        (category) => category.name === targetSurchargeCategory
      );

      const targetAliasName = values.surchargeAliasCode;
      const foundAliasEntry = settings_surcharges_alias_table_data.content.find(
        (entry) => entry.name === targetAliasName
      );

      const payload = {
        code: values.surchargeCode,
        description: values.surchargeDesc,
        surchargeAlias: {
          name: values.surchargeAliasCode,
          description: foundAliasEntry.description,
          id: foundAliasEntry.id,
          version: foundAliasEntry.id,
        },
        surchargeCategory: {
          name: values.surchargeCategory,
          description: foundCategory.description,
          id: foundCategory.id,
          version: foundCategory.id,
        },
      };

      console.log("Final payload:", payload);
      dispatch(getAllAddSurchargeData(payload));
      resetForm();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return {
    initialValue,
    uploadRateDataSchema,
    handleSubmit,
  };
};
