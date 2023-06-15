import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { useGetProductQuery, useDeleteProductMutation } from "../../stateManagement/apiSlices/productApi";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Rating } from "@mui/material";
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { closeInstanceModal, launchInstanceModal } from "../../core/services/modalService";
import baseModalOptions from '../../utils/baseOptionsInstanceModal'

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetProductQuery(id ?? '');
    const [deleteProduct, { isLoading: deleteProductIsLoading }] = useDeleteProductMutation();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "flex-start",
        "& > *": {
            margin: theme.spacing(1, 1),
        },
    }));

    const handleClickDelete = (id: string) => {
        launchInstanceModal(
            baseModalOptions.alertOk({
                onClickOk: () => {
                    deleteProduct(id).unwrap()
                        .then((res: any) => {
                            console.log(res);
                        })
                        .catch((err: any) => {
                            console.log(err);
                        });
                    closeInstanceModal();
                },
                subtitle: '¿Estas seguro de eliminar este producto?',
                okText: 'Si',
                cancelText: 'No',
            }),
        )
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} margin={4}>
                <Grid xs={12}>
                    <Button variant="contained" color="success" href="/products"> <ArrowBackIcon /> Regresar</Button>
                    <Item elevation={3} sx={{ p: 2, mt: 2 }}>
                        {isLoading && <p>Loading...</p>}
                        {!isLoading &&
                            <Grid container spacing={2} margin={2}>
                                <Grid xs={6}>
                                    <img src={data.image} alt="" style={{ width: "50%", maxWidth: 300 }} />
                                </Grid>
                                <Grid xs={6}>
                                    <Card sx={{ maxWidth: '100%', minWidth: 300 }}>
                                        <CardActions disableSpacing>
                                            <Button size="small" variant="contained" color="info" href={`/updateProduct/${data.id}`}><EditIcon /> Editar</Button>
                                            <Button size="small" variant="contained" color="error" onClick={() => handleClickDelete(data.id)} disabled={deleteProductIsLoading}><DeleteIcon /> Eliminar</Button>
                                        </CardActions>
                                        <CardContent>
                                            <Typography gutterBottom variant="h4" component="div">{data.title} </Typography>
                                            <div>
                                                <Rating name="read-only" value={data.rating.rate} readOnly />{`(${data.rating.count})`}
                                            </div>
                                            <br />
                                            <Typography variant="h5" component={'p'}>
                                                <b>Precio: </b> {data.price}
                                            </Typography>
                                            <Typography variant="h5" component={'p'}>
                                                <b>Categoria: </b> {data.category}
                                            </Typography>
                                        </CardContent>

                                    </Card>
                                </Grid>
                                <Grid xs={12}>
                                    <Card sx={{ maxWidth: '100%', minWidth: 300 }} >
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                Description
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {data.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        }
                    </Item>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductDetail;
