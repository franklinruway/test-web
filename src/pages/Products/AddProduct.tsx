import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useAddProductMutation } from "../../stateManagement/apiSlices/productApi";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormProduct from "./components/FormProduct";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { closeInstanceModal, launchInstanceModal } from "../../core/services/modalService";
import baseModalOptions from '../../utils/baseOptionsInstanceModal'

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const [addProduct, { isLoading }] = useAddProductMutation();

    const handleSubmitCreateProduct = (data: any) => {
        launchInstanceModal(
            baseModalOptions.alertOk({
                onClickOk: () => {
                    addProduct({
                        title: data.title,
                        price: data.price,
                        description: data.description,
                        image: data.image,
                        category: data.category,
                    }).unwrap()
                        .then((data) => {
                            console.log('La data es:');
                            console.log(data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    closeInstanceModal();
                },
                subtitle: '¿Estas seguro de agregar este producto?',
                okText: 'Si',
            }),
        )
    };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} margin={4} >
                <Grid xs={12}>
                    <Button variant="contained" color="info" onClick={() => navigate('/products')}>
                        <ArrowBackIcon /> Regresar
                    </Button>
                    <Card sx={{ marginTop: 2,maxWidth: 500, padding: 2, backgroundColor: '#fff' }} >
                        <div>
                            <Typography variant="h5" component="div"> Agregar Producto </Typography>
                        </div>
                        <FormProduct handleSubmitProduct={handleSubmitCreateProduct} isLoading={isLoading} data={null} />
                    </Card>

                </Grid>
            </Grid>
        </Box>
    );
};

export default AddProduct;
