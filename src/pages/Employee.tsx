import { useEffect, useState } from "react";
import { AddButton } from "../assets/logos/AddButton";
import { useAppSelector } from "../hook/redux";
import apiToken from "../api/token";
import CreateEmployee from "../components/employee/createEmployee";
import "../components/employee/Employee.css";
import EmployeeItem from "../components/employee/EmployeeItem";

const Employee = () => {
  const token = useAppSelector((state) => state.restore.token);
  const [openCreateUsers, setOpenCreateUsers] = useState<boolean>(false);
  const [dataEmployee, setDataEmployee] = useState();
  const [statusCode, setStatusCode] = useState("");
  const [successStatus, setSuccessStatus] = useState("");

  const [createFoodsCategoryState, setCreateFoodsCategoryState] = useState({
    name: "",
    surname: "",
    phone: "",
    password: "",
    photoUrl: "",
    role: "",
  });

  const createUserForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (
      createFoodsCategoryState.name === "" ||
      createFoodsCategoryState.surname === "" ||
      createFoodsCategoryState.phone === ""
    ) {
      setStatusCode("Malumotlar to'liq kiritilmagan");
    }

    try {
      const res = await apiToken.post(
        "/admin/create",
        createFoodsCategoryState,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setStatusCode("");
        setSuccessStatus("Categoriya ro'yhatdan o'tkazildi");
      }

      console.log("response", res);
    } catch (error) {
      if (
        error.response.data.errorMessage === "Category name is already exist"
      ) {
        setStatusCode("Bu kategoriya oldin ro'yxatdan o'tkazilgan");
      }
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);
  const getAllEmployee = async () => {
    const res = await apiToken.get("/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setDataEmployee(res.data);
    console.log("res", res);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-medium">Employee</div>
        <div
          onClick={() => setOpenCreateUsers((prev) => !prev)}
          className="bg-primary w-[32px] h-[32px] rounded-lg cursor-pointer"
        >
          <AddButton />
        </div>
      </div>
      {openCreateUsers && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-60 z-10"
          onClick={() => setOpenCreateUsers(false)}
        ></div>
      )}
      {openCreateUsers && (
        <CreateEmployee
          createFoodsCategoryState={createFoodsCategoryState}
          setCreateFoodsCategoryState={setCreateFoodsCategoryState}
          setOpenCreateGoodsProps={setOpenCreateUsers}
          createUserForm={createUserForm}
          statusCode={statusCode}
          successStatus={successStatus}
        />
      )}
      <EmployeeItem data={dataEmployee} />
    </div>
  );
};

export default Employee;
