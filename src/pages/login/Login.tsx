import React, { useState} from "react";
import { Button, TextField } from "../../components/material";
import { Controller, useForm } from "react-hook-form";

import { useLoginMutation } from "../../stateManagement/apiSlices/userApi";
import * as userConstants from "./model/LoginConstants";
import localize, { defineLocalizeBaseKey } from "../../utils/localizer";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from './Login.styles'
type Inputs = {
    username: string;
    password: string;
};

const Login: React.FC = () => {
    const [login, { isLoading }] = useLoginMutation();
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const styles = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors = {} },
    } = useForm<Inputs>({ defaultValues: { username: "", password: "" } });
    const t = defineLocalizeBaseKey('login');
    const handleSubmitForm = (data: Inputs) => {
        console.log(data);
        login(data)
            .unwrap()
            .then((res: any) => {
                navigate('/products');
               // setToken(JSON.stringify(res));
            })
            .catch((err: any) => {
                setToken(JSON.stringify(err));
            });
    };

    return (
        <div className={styles.classes.root}>
            <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={6}>
                    <Box component='div'>
                        <img src="https://notife.com/wp-content/uploads/2019/05/everest-getty-1.jpg" alt="logo" style={{ width: "80%", float: "right" }} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        component="form"
                        sx={{
                            "& > :not(style)": { m: 1, width: "50ch" },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit((data) => handleSubmitForm(data))}
                        style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}
                    >
                        <div style={{ textAlign: "center" }} >
                            <img src="https://ruway.tech/static/media/logo.0daae2dc.png" alt="logo" style={{ width: "50%" }} />
                            <Typography variant="h4" component="h1" >INICIAR SESION</Typography>
                        </div>
                        <Controller
                            control={control}
                            name={userConstants.USER_NAME}
                            rules={{
                                required: {
                                    value: true,
                                    message: localize('requiredInput'),
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id={userConstants.USER_NAME}
                                    label={localize('login.userName')}
                                    variant="outlined"
                                    placeholder={localize('login.userPlaceholder')}
                                    error={Boolean(errors[userConstants.USER_NAME])}
                                    helperText={errors[userConstants.USER_NAME]?.message}
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name={userConstants.PASSWORD}
                            rules={{
                                required: {
                                    value: true,
                                    message: localize('requiredInput'),
                                },
                            }}
                            render={({ field }) => (
                                <div style={{ position: 'relative' }}>
                                    <TextField
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        id={userConstants.PASSWORD}
                                        label={localize('login.password')}
                                        variant="outlined"
                                        placeholder={localize('login.passPlaceholder')}
                                        error={!!errors[userConstants.PASSWORD]}
                                        helperText={errors[userConstants.PASSWORD]?.message}
                                        sx={{ width: '100%' }}
                                    />
                                    <Button type="button" variant="text" style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }} onClick={() => setShowPassword(!showPassword)} >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </Button>
                                </div>
                            )}
                        />
                        <br />
                        <Button type="submit" variant="contained" disabled={isLoading}>
                            Iniciar sesion
                        </Button>
                        <br />
                    </Box>
                    {token}
                    <Typography variant="h3" component="p">
                        Usuario: johnd<br />
                        Contraseña: m38rmF$
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default Login;