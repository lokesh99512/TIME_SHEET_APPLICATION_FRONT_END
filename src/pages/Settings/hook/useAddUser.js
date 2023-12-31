import { useDispatch } from "react-redux";
import { addUserSchema } from "../schema";
import { addUsersData } from "../../../store/Settings/actions";

export const useAddUser = () => {
  const dispatch = useDispatch();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    roles: [],
    password: "",
    reEnterdPassword: "",
    roleNames: "",
    location: "",
  };

  const handleAddUser = async (values, { resetForm }) => {
    console.log("hey I am add user:-", values);

    const payload = {
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
