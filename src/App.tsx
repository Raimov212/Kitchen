import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "./pages/Sidebar";
import Navbar from "./pages/Navbar";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import { Loading } from "./components/Lazy/Suspance";
import Error from "./components/Error/Error";
import { LoginContext } from "./hook/contextAuth";

const MenuLazy = lazy(() => import("./pages/Menu"));
const FoodsLazy = lazy(() => import("./pages/Foods"));
const AdvertisingLazy = lazy(() => import("./pages/Advertising"));
const EmployeeLazy = lazy(() => import("./pages/Employee"));

const App = () => {
  const navigate = useNavigate();
  const { isVisibleRoute } = useContext(LoginContext);

  useEffect(() => {
    if (!isVisibleRoute) {
      navigate("/login");
    }
  }, [isVisibleRoute, navigate]);

  return (
    <div className="flex h-screen">
      <>
        <Sidebar />
      </>
      <div className="flex-[6] pb-[14px] px-[24px]">
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route
            index={true}
            element={
              <Suspense fallback={<Loading />}>
                <MenuLazy />
              </Suspense>
            }
          />
          <Route
            path="foods/:id"
            element={
              <Suspense fallback={<Loading />}>
                <FoodsLazy />
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
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <Error />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
