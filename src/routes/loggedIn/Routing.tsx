import React from "react";
import { Container } from "@mui/material";
import { Routes, Navigate , Route } from "react-router-dom";
import NotFound  from "../../pages/notFound/NotFound";
import { paths } from "../../core/constants";
import InstanceModal from "../../components/containers/instanceModal/InstanceModal";
import AllProducts from "../../pages/Products/AllProducts";
import AddProduct from "../../pages/Products/AddProduct";
import UpdateProduct from "../../pages/Products/UpdateProduct";
import ProductDetail from "../../pages/Products/ProductDetail";

const LoggedInRouting = () => {
  return (
    <div>
      <Routes>
        <Route path={paths.DASHBOARD} element={<div>Hola</div>} />
        <Route path="/logout" element={<Container>Adios</Container>} />
        <Route path="/not-found" Component={NotFound} />
        <Route path="/products" Component={AllProducts} />
        <Route path="/addProduct" Component={AddProduct} />
        <Route path="/updateProduct/:id" Component={UpdateProduct} />
        <Route path="/product/:id" Component={ProductDetail} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <InstanceModal />
    </div>
  );
};

export default LoggedInRouting;
