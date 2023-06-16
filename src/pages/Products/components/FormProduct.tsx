import React, { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useGetCategoriesQuery } from "../../../stateManagement/apiSlices/productApi";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as productConstants from '../model/AddProductConstants'
import localize from "../../../utils/localizer";
import { useNavigate } from "react-router-dom";
interface Props {
    handleSubmitProduct: (data: string) => void;
    isLoading: boolean;
    data: any;
}

const FormProduct: React.FC<Props> = ({ handleSubmitProduct, isLoading: isLoadingForm, data = null }: any) => {
    const navigate = useNavigate();
    const { data: dataCategories, error, isLoading } = useGetCategoriesQuery({});
    const { control, handleSubmit, reset, formState: { errors = {} } }
        = useForm({
            defaultValues: {
                title: "",
                image: "",
                category: "",
                price: "",
                description: ""
            }
        });
    React.useEffect(() => {
        reset({
            title: data?.title ?? "",
            image: data?.image ?? "",
            category: data?.category ?? "",
            price: data?.price ?? "", // el ?? es para que si no existe data.price, se ponga un string vacio
            description: data?.description ?? ""
        })
    }, [data])

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { marginY: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit((data) => handleSubmitProduct(data))}
        >
            <CardContent>
                <div>
                    <Controller
                        control={control}
                        name={productConstants.TITLE}
                        rules=
                        {
                            {
                                required: { value: true, message: localize('requiredInput') }
                            }
                        }
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={productConstants.TITLE}
                                label={localize('product.title')}
                                error={Boolean(errors[productConstants.TITLE])}
                                helperText={errors[productConstants.TITLE]?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={productConstants.IMAGE}
                        rules={
                            {
                                required: { value: true, message: localize('requiredInput') }
                            }
                        }
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={productConstants.IMAGE}
                                label={localize('product.image')}
                                error={Boolean(errors[productConstants.IMAGE])}
                                helperText={errors[productConstants.IMAGE]?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={productConstants.CATEGORY}
                        rules={{ required: { value: true, message: localize('requiredInput') } }}
                        render={({ field }) => (
                            <FormControl
                                {...field}
                                sx={{width: '50%' }}
                                error={Boolean(errors[productConstants.CATEGORY])}
                            >
                                <InputLabel id="demo-simple-select-label">{localize('product.category')}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id={productConstants.CATEGORY}
                                    value={field.value || ''}
                                    label={localize('product.category')}
                                    onChange={(e) => field.onChange(e.target.value)}
                                >
                                    {dataCategories?.map((category: any) => {
                                        return <MenuItem key={category} value={category}>{category}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        )}
                    />
                    <Controller
                        control={control}
                        name={productConstants.PRICE}
                        rules={
                            {
                                required: { value: true, message: localize('requiredInput') },
                                pattern: { value: /^[+-]?([0-9]*[.])?[0-9]+$/, message: localize('onlyNumbers') }
                            }
                        }
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={productConstants.PRICE}
                                label={localize('product.price')}
                                error={Boolean(errors[productConstants.PRICE])}
                                helperText={errors[productConstants.PRICE]?.message}

                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name={productConstants.DESCRIPTION}
                        rules={
                            {
                                required: { value: true, message: localize('requiredInput') }
                            }
                        }
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id={productConstants.DESCRIPTION}
                                label={localize('product.description')}
                                error={Boolean(errors[productConstants.DESCRIPTION])}
                                helperText={errors[productConstants.DESCRIPTION]?.message}
                                multiline
                                rows={6}
                            />
                        )}
                    />
                </div>
            </CardContent>
            <CardActions disableSpacing>
                <Button type="submit" size="small" variant="contained" color="success" disabled={isLoadingForm}>Guardar</Button>
                <Button type="button" size="small" variant="contained" color="error" onClick={() => navigate(data?'/product/' + data.id : '/products')}>Cancelar</Button>
            </CardActions>
        </Box>
    );
};

export default FormProduct;
