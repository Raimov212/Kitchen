import { ChangeEvent, useContext, useEffect, useState } from "react";
import { KeyIcon } from "../assets/icons/loginicons/KeyIcon";
import { UserIcon } from "../assets/icons/loginicons/UserIcon";
import { KitchenAuthImg } from "../assets/image/KitchenAuthImg";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../hook/contextAuth";
import api from "../api/login";
import { useAppDispatch } from "../hook/redux";
import { tokenFunction } from "../redux/restoreRedux/restoreSlice";

interface LoginType {
  phone: string;
  password: string;
}

const LoginPage = () => {
  const { setIsVisibleRoute, isVisibleRoute } = useContext(LoginContext);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [loginState, setLoginState] = useState<LoginType>({
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isVisibleRoute) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isVisibleRoute, navigate]);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (loginState.phone === "") {
      return setError("Telefon raqami kiritilmagan");
    } else if (loginState.password === "") {
      return setError("Parol kiritilmagan");
    }

    try {
      const res = await api.post("/auth/login/admin", loginState);
      if (res.status === 200) {
        setIsVisibleRoute((prev: boolean) => !prev);
        dispatch(tokenFunction(res.data.token));
      }
    } catch (error) {
      if (error.response.status === 404) {
        setError("Login yoki parol xato");
      }
    }
  };

  return (
    <div className="flex w-full ">
      <div className="flex-1 bg-primary h-screen grid place-items-center">
        <KitchenAuthImg />
      </div>
      <div className="flex-1 grid place-items-center mt-[200px] h-full gap-10">
        <p className="text-2xl text-primary font-semibold">Tizimga kirish</p>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 ">
          <div className="border-b-[1.5px] border-b-primary relative w-[450px] ">
            <input
              type="text"
              placeholder="Telefon raqam"
              name="phone"
              value={loginState.phone}
              onChange={(e) => handleLoginChange(e)}
              className="p-2 outline-none placeholder:text-primary
               bg-[#faf9fa] w-full pr-8 placeholder:opacity-50"
            />
            <div className="absolute top-1 right-0 w-icon h-icon">
              <UserIcon />
            </div>
          </div>
          {isVisiblePassword ? (
            <div className="border-b-[1.5px] border-b-primary relative w-[450px]">
              <input
                type="text"
                placeholder="Parol"
                name="password"
                value={loginState.password}
                onChange={handleLoginChange}
                className="p-2 outline-none placeholder:text-primary bg-[#faf9fa]
                 w-full pr-8 placeholder:opacity-50"
              />
              <div
                className="absolute top-1 right-0 w-icon h-icon cursor-pointer"
                onClick={() => setIsVisiblePassword((prev) => !prev)}
              >
                <KeyIcon />
              </div>
            </div>
          ) : (
            <div className="border-b-[1.5px] border-b-primary relative w-[450px]">
              <input
                type="password"
                placeholder="Parol"
                name="password"
                value={loginState.password}
                onChange={handleLoginChange}
                className="p-2 outline-none placeholder:text-primary bg-[#faf9fa]
                 w-full pr-8 placeholder:opacity-50"
              />
              <div
                className="absolute top-1 right-0 w-icon h-icon cursor-pointer"
                onClick={() => setIsVisiblePassword((prev) => !prev)}
              >
                <KeyIcon />
              </div>
            </div>
          )}
          <button
            type="submit"
            // onClick={() => navigate("/")}
            className="w-[450px] bg-primary text-white py-3 rounded-lg"
          >
            Kirish
          </button>
        </form>
        <div className="text-red-500">{error}</div>
      </div>
    </div>
  );
};

export default LoginPage;
