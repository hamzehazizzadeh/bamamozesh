import { useState } from "react";
import { createContext } from "react";
import { useDispatch } from "react-redux";

import useQueryParam from "../../../hooks/useQueryParam";
import {
  setLoadingFalseAction,
  setLoadingTrueAction,
} from "../../../redux/actions/loadingActions/loadingActions";
import {
  changeUserConfirmAdminService,
  changeUserPasswordAdminService,
  createUserAdminService,
  deleteUserAdminService,
  editUserAdminService,
  getUsersAdminService,
} from "./../../../services/adminServices";
import {
  toastErrorMessage,
  toastSuccessMessage,
} from "../../../utils/toastMessage/toastMessage";

export const userAdminContext = createContext({
  users: [],
  setUsers: () => {},
  user: {},
  setUser: () => {},
  role: "",
  setRole: () => {},
  filter: "",
  setFilter: () => {},
  pageCount: null,
  setPageCount: () => {},
  pageNumber: null,
  setPageNumber: () => {},
  itemsCount: null,
  setItemsCount: () => {},
  isShowModal: null,
  setIsShowModal: () => {},
  handleShowModal: () => {},
  handleHideModal: () => {},
  handleGetUsers: () => {},
  handleCreateUser: () => {},
  handleEditUser: () => {},
  handleChangeUserPassword: () => {},
  handleChangeUserConfirm: () => {},
  handleDeleteUser: () => {},
});

const UserAdminContext = ({ children }) => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [filter, setFilter] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);

  const [role, setRole] = useQueryParam("role", "");
  const [pageNumber, setPageNumber] = useQueryParam("pageNumber", 1);
  const [itemsCount, setItemsCount] = useQueryParam("itemsCount", 100);
  const [pageCount, setPageCount] = useState(1);

  // Modal Operation
  const handleShowModal = (val, setValue) => {
    setIsShowModal(true);

    if (val) {
      setUser(val);
      setValue("avatar", val.avatar);
      setValue("firstName", val.firstName);
      setValue("lastName", val.lastName);
      setValue("fatherName", val.fatherName);
      setValue("unionName", val.unionName);
      setValue("businessCategory", val.businessCategory);
      setValue("workAddress", val.workAddress);
      setValue("email", val.email);
      setValue("gender", val.gender);
      setValue("permissions", val.permissions);
      setValue("nationalNumber", val.nationalNumber);
      setValue("phoneNumber", val.phoneNumber);
    }
  };
  const handleHideModal = () => {
    setIsShowModal(false);
    setUser({});
  };

  // Get Users
  const handleGetUsers = async (event) => {
    event?.preventDefault();

    const objData = {
      filter,
      pageNumber,
      itemsCount,
      role,
    };
    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await getUsersAdminService(objData);
      if (status === 200) {
        setUsers(data.result?.users);
        setPageCount(data?.result?.allPagesCount);
      }
    } catch ({ response }) {
      if (response) {
        if (response.status) {
          toastErrorMessage(response.data.resultMessage);
        }
      }
    } finally {
      dispatch(setLoadingFalseAction());
    }
  };

  // Create User
  const handleCreateUser = async (userData) => {
    const objData = {
      ...userData,
    };

    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await createUserAdminService(objData);
      if (status === 200) {
        toastSuccessMessage(data.resultMessage);
        handleGetUsers();
        handleHideModal();
      }
    } catch ({ response }) {
      if (response) {
        if (response.status) {
          toastErrorMessage(response.data.resultMessage);
        }
      }
      dispatch(setLoadingFalseAction());
    }
  };

  // Edit User
  const handleEditUser = async (userData) => {
    const objData = {
      id: user._id,
      ...userData,
    };

    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await editUserAdminService(objData);
      if (status === 200) {
        toastSuccessMessage(data.resultMessage);
        handleGetUsers();
        handleHideModal();
      }
    } catch ({ response }) {
      if (response) {
        if (response.status) {
          toastErrorMessage(response.data.resultMessage);
        }
      }
      dispatch(setLoadingFalseAction());
    }
  };

  // Change User Password
  const handleChangeUserPassword = async (userData) => {
    const objData = {
      id: user._id,
      ...userData,
    };

    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await changeUserPasswordAdminService(objData);
      if (status === 200) {
        toastSuccessMessage(data.resultMessage);
        handleGetUsers();
        setUser({});
      }
    } catch ({ response }) {
      if (response) {
        if (response.status) {
          toastErrorMessage(response.data.resultMessage);
        }
      }
      dispatch(setLoadingFalseAction());
    }
  };

  // Change User Confirm
  const handleChangeUserConfirm = async (id) => {
    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await changeUserConfirmAdminService(id);
      if (status === 200) {
        toastSuccessMessage(data.resultMessage);
        handleGetUsers();
      }
    } catch ({ response }) {
      if (response) {
        if (response.status) {
          toastErrorMessage(response.data.resultMessage);
        }
      }
      dispatch(setLoadingFalseAction());
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      dispatch(setLoadingTrueAction());
      const { status, data } = await deleteUserAdminService(id);
      if (status === 200) {
        toastSuccessMessage(data.resultMessage);
        handleGetUsers();
      }
    } catch ({ response }) {
      if (response) {
        if (response.status) {
          toastErrorMessage(response.data.resultMessage);
        }
      }
      dispatch(setLoadingFalseAction());
    }
  };

  return (
    <userAdminContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        role,
        setRole,
        filter,
        setFilter,
        pageCount,
        setPageCount,
        pageNumber,
        setPageNumber,
        itemsCount,
        setItemsCount,
        isShowModal,
        setIsShowModal,
        handleShowModal,
        handleHideModal,
        handleGetUsers,
        handleCreateUser,
        handleEditUser,
        handleChangeUserPassword,
        handleChangeUserConfirm,
        handleDeleteUser,
      }}
    >
      {children}
    </userAdminContext.Provider>
  );
};

export default UserAdminContext;
