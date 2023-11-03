import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginContext } from "../hook/contextAuth";
import LoginPage from "../pages/Login";
import App from "../App";
import { Loading } from "../components/Lazy/Suspance";
import Error from "../components/Error/Error";
import { Provider } from "react-redux";
import store from "../redux/store";

const MenuLazy = lazy(() => import("../pages/Menu"));
const AdvertisingLazy = lazy(() => import("../pages/Advertising"));
const EmployeeLazy = lazy(() => import("../pages/Employee"));

const MainPage = () => {
  const [isVisibleRoute, setIsVisibleRoute] = useState<boolean>(false);

  return (
    <Provider store={store}>
      <LoginContext.Provider value={{ isVisibleRoute, setIsVisibleRoute }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route
                index={true}
                element={
                  <Suspense fallback={<Loading />}>
                    <MenuLazy />
                  </Suspense>
                }
              />
              <Route
                path="advertising"
                element={
                  <Suspense fallback={<Loading />}>
                    <AdvertisingLazy />
                  </Suspense>
                }
              />
              <Route
                path="employee"
                element={
                  <Suspense fallback={<Loading />}>
                    <EmployeeLazy />
                  </Suspense>
                }
              />
              <Route
                path="/*"
                element={
                  <Suspense fallback={<Loading />}>
                    <Error />
                  </Suspense>
                }
              />
            </Route>

            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </Provider>
  );
};

export default MainPage;
