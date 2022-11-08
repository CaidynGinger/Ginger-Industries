import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { AllProducts } from "./components/Pages/AllProducts/AllProducts";
import { Landing } from "./components/Pages/Landing/Landing";
// import { RequireAuth } from "./Security/RequireAuth";
// import { AuthProvider } from "./Store/AuthProvider";

const ROLES = [2001, 5150];

export const RouterComponent = () => {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Routes>
          {/* <Route element={<RequireAuth />}> */}
            <Route path="/" element={<Main/>}>
              <Route path="/" element={<Landing/>}/>
              <Route path="/all-products" element={<AllProducts/>}/>
            </Route>
          {/* </Route> */}
        </Routes>
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
};
