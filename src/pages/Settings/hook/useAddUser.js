import { useDispatch } from "react-redux";
import { addUserSchema } from "../schema";
import { addUsersData } from "../../../store/Settings/actions";
import { useSelector } from "react-redux";

export const useAddUser = (state) => {
  const dispatch = useDispatch();
  const { settings_users_data } = useSelector((state) => state.settings);

  const currUserData = Array.isArray(settings_users_data.content) && settings_users_data.content.find((user) => user.id === state?.id) || {};

  const initialValues = {
    firstName: currUserData?.firstName || "",
    lastName: currUserData?.lastName || "",
    email: currUserData?.email || "",
    roles: currUserData?.roles || [],
    password: currUserData?.password || "",
    reEnterdPassword: currUserData?.password || "",
    roleNames: currUserData?.roleNames || "",
    location: "",
  };

  const handleAddUser = async (values, { resetForm }) => {
    console.log("hey I am add user:-", values);

    const payload = {
      ...(Object.keys(currUserData).length ? { id: currUserData.id, version: currUserData.version } : {}),
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      roles: values.roles,
      status: "ACTIVE",
    };

    dispatch(addUsersData(payload));
    resetForm();
  };

  return {
    initialValues,
    schema: addUserSchema,
    handleAddUser,
  };
};

export default useAddUser;
