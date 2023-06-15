import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useUpdateProductMutation, useGetProductQuery } from "../../stateManagement/apiSlices/productApi";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormProduct from "./components/FormProduct";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { closeInstanceModal, launchInstanceModal } from "../../core/services/modalService";
import baseModalOptions from '../../utils/baseOptionsInstanceModal'

const UpdateProduct: React.FC = () => {
    const navigate = useNavigate();
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const { id } = useParams();
    const { data, error, isLoading: isLoadingProduct } = useGetProductQuery(id ?? '');

    const handleSubmitUpdateProduct = (data: any) => {
        launchInstanceModal(
            baseModalOptions.alertOk({
                onClickOk: () => {
                    updateProduct(
                        {
                            id: id ?? '',
                            data: {
                                title: data.title,
                                price: data.price,
                                description: data.description,
                                image: data.image,
                                category: data.category,
                            }
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
                subtitle: '¿Estas seguro de actualizar este producto?',
                okText: 'Si',
                cancelText: 'No',
            }),
        )
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} margin={4} >
                <Grid xs={12}>
                    <Button variant="contained" color="info" onClick={() => navigate('/product/' + id)}>
                        <ArrowBackIcon /> Regresar
                    </Button>
                    <Card sx={{ marginTop: 2, maxWidth: 500, padding: 2, backgroundColor: '#fff' }} >
                        <div>
                            <Typography variant="h5" component="div"> Actualizar Producto </Typography>
                        </div>
                        {isLoadingProduct ? <p>Cargando...</p> :
                            <FormProduct handleSubmitProduct={handleSubmitUpdateProduct} isLoading={isLoading} data={data} />
                        }
                    </Card>

                </Grid>
            </Grid>
        </Box>
    );
};

export default UpdateProduct;
