import { useDispatch } from "react-redux";
import { getAllAddSurchargeData } from "../../../../store/Settings/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const useUploadRateData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateState = useLocation();
  console.log(navigateState?.state?.id,"navigateState");
  const { settings_surcharges_table_data } = useSelector((state) => state?.settings);
  const { surchargeCategory_data, surchargeAlice_data } = useSelector((state) => state.globalReducer);

  const currSurchargeData = Array.isArray(settings_surcharges_table_data.content) && settings_surcharges_table_data.content.find((item) => item.id === navigateState?.state?.id) || {};

  const initialValue = {
    surchargeCode: currSurchargeData?.code || "",
    surchargeDesc: currSurchargeData?.description || "",
    surchargeCategory: currSurchargeData?.surchargeCategory?.name || "",
    surchargeAliasCode: currSurchargeData?.surchargeAlias?.name || "",
    surchargeAliasDesc: currSurchargeData?.surchargeAlias?.description || "",
  };
  const handleSubmit = (values, { resetForm }) => {
    let sCategory_data = surchargeCategory_data?.find((item) => item?.value === values?.surchargeCategory);
    let sAlice_data = surchargeAlice_data?.find((item) => item?.value === values?.surchargeAliasCode);

    let data = {
      ...(Object.keys(currSurchargeData).length ? { id: currSurchargeData.id, version: currSurchargeData.version } : {}),
      code: values?.surchargeCode || '',
      description: values?.surchargeDesc || '',
      ...(values?.surchargeAliasCode && {
        surchargeAlias: {
          version: sAlice_data && sAlice_data?.version || 0,
          id: sAlice_data && sAlice_data?.id || '',
        }
      }),
      surchargeCategory: {
        version: sCategory_data && sCategory_data?.version || 0,
        id: sCategory_data && sCategory_data?.id || '',
      }
    }

    console.log(data,"data");

    dispatch(getAllAddSurchargeData(data));
    resetForm();
    navigate('/settings/surcharge');
  };

  return {
    initialValue,
    handleSubmit,
  };
};
