import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { Admin } from "./components/Pages/Admin/Admin";
import { Products } from "./components/Pages/Admin/Pages/Products/Products";
import { AllProducts } from "./components/Pages/AllProducts/AllProducts";
import { IndividualProductPage } from "./components/Pages/IndevidualProductPage/IndividualProductPage";
import { Landing } from "./components/Pages/Landing/Landing";
import { Login } from "./components/Pages/Login/Login";
import Register from "./components/Pages/Register/Register";
import { AuthProvider } from "./components/Store/AuthProvider";
import { RequireAuth } from "./Security/RequireAuth";

const ROLES = [2001, 5150];

export const RouterComponent = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Main />}>
            <Route path="/" element={<Landing />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/products/:productId" element={<IndividualProductPage />} />
            <Route element={<RequireAuth allowedRoles={ROLES} />}>
              <Route path="/cart" element={<><h1>Cart</h1></>} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES[1]]} />}>
              <Route path="/admin" element={<Admin />}>
                <Route path="/admin" element={<Products/>}/>
                {/* <Route path="/admin" element={<UsersList />} />
                <Route path="/admin/question-list" element={<QuestionList />} />
                <Route path="/admin/tags" element={<Tags />} />
                <Route
                  path="/admin/all-answers"
                  element={<ReportedAnswers />}
                /> */}
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
