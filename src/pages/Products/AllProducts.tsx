import React, { useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useGetProductsQuery, useGetCategoriesQuery, useGetCategoryProductsQuery, useDeleteProductMutation } from "../../stateManagement/apiSlices/productApi";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import { Chip, Collapse, IconButton, IconButtonProps, Rating } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));
const AllProducts: React.FC = () => {
	const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
	const { data: products, error: productsError, isLoading: productsIsLoading } = useGetProductsQuery({});
	const { data: categories, error: categoriesError, isLoading: categoriesIsLoading } = useGetCategoriesQuery({});
	const [dataList, setDataList] = React.useState<any[]>([]);
	const [category, setCategory] = React.useState('');
	const { data: categoryProducts, isLoading: categoryProductsIsLoanding } = useGetCategoryProductsQuery(category);
	const [deleteProduct, { isLoading: deleteProductIsLoading }] = useDeleteProductMutation();

	React.useEffect(() => {
		if (products) {
			setDataList(products);
		}
	}, [products]);
	React.useEffect(() => {
		if (categoryProducts) {
			setDataList([...categoryProducts]);
		}
	}, [categoryProducts]);
	const handleChangeCategory = (e: any) => {
		setDataList([])
		if (e.target.value == "todos") {
			setCategory("");
			setDataList([...products]);
		} else {
			setCategory(e.target.value);
		}
	};
	const handleChangeSearch = (e: any) => {
		let value = (e.target.value).trim();
		if (value == "") {
			if (category == "") {
				setDataList([...products]);
			} else {
				setDataList([...categoryProducts]);
			}
		} else {
			if (category == "") {
				setDataList([...products.filter((item: any) => item.title.toLowerCase().includes(value.toLowerCase()))]);
			} else {
				setDataList([...categoryProducts.filter((item: any) => item.title.toLowerCase().includes(value.toLowerCase()))]);
			}
		}
	};

	const handleExpandClick = (itemId: string) => {
		setExpanded({
			...expanded,
			[itemId]: !expanded[itemId],
		});
	};
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

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2} margin={3}>
				<Grid xs={12}>
					<Box
						component="form"
						sx={{
							"& .MuiTextField-root": { m: 1, width: "50ch" },
						}}
						noValidate
						autoComplete="off"
					>
						<div>
							<TextField
								id="outlined-select-currency"
								select
								label="Categoria"
								defaultValue="todos"
								helperText="Seleccione una categoria"
								onChange={(e) => handleChangeCategory(e)}
							>
								<MenuItem key='todos' value='todos'>
									{categoriesIsLoading ? 'Cargando...' : 'Todos'}
								</MenuItem>
								{categories?.map((option: any) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>
							{/*input para buscar*/}
							<TextField
								id="outlined--helperText"
								label="Buscar"
								placeholder="Buscar..."
								helperText="Buscar por nombre"
								onChange={(e) => handleChangeSearch(e)}
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</div>
					</Box>
				</Grid>
				<Grid xs={12} sx={{ px: 2 }} >
					<Grid xs={12} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
						<Button variant="contained" color="success" href="/addProduct"><AddIcon /> Agregar Producto</Button>
						<Typography variant="h6" color="text.secondary">Mostrando {dataList.length} de {products?.length} productos</Typography>
					</Grid>
					<Item elevation={3} sx={{ p: 2, mx: 0, mt: 2 }}>
						{productsIsLoading && <Typography variant="h5" component="h2">Cargando...</Typography>}
						{dataList?.map((item: any) => (
							<Card sx={{ maxWidth: 300, minWidth: 300 }} key={item.id}>
								<CardActionArea LinkComponent={Button} href={"/product/" + item.id}>
									<CardMedia
										sx={{ height: 200 }}
										image={item.image}
										title="green iguana"
									>
										<div style={{ display: "flex", justifyContent: "flex-end" }}>
											<Chip label={'$ ' + item.price} color="info" />
										</div>
									</CardMedia>
									<CardContent>
										<Rating name="read-only" value={item.rating.rate} readOnly />
										<Box sx={{ ml: 2 }}>{item.rating.count}</Box>
										<Typography gutterBottom variant="h5" component="div">
											{item.title}
										</Typography>
										<Typography variant="body2" color="text.secondary">{item.category}</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions disableSpacing>
									{/* <Button size="small" variant="contained" color="info" href={`/updateProduct/${item.id}`}>Editar</Button>
									<Button size="small" variant="contained" color="error" onClick={() => deleteProduct(item.id).unwrap} disabled={deleteProductIsLoading}>Eliminar</Button> */}
									<Typography variant="body1" color="text.secondary">Descripcion</Typography>
									<ExpandMore
										expand={expanded[item.id]}
										onClick={() => handleExpandClick(item.id)}
										aria-expanded={expanded[item.id]}
										aria-label="show more"
									>
										<ExpandMoreIcon />
									</ExpandMore>
								</CardActions>
								<Collapse in={expanded[item.id]} timeout="auto" unmountOnExit>
									<CardContent>
										{item.description}
									</CardContent>
								</Collapse>
							</Card>
						))}
						{dataList.length == 0 && !productsIsLoading && 'No hay productos'}
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
};

export default AllProducts;
