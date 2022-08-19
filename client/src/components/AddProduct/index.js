import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { useMutation } from "@apollo/client";
import { ADD_PRODUCT } from "../../utils/mutations";
import {
	Flex,
	Box,
	Heading,
	FormControl,
	FormLabel,
	Input,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Select,
	Image,
} from "@chakra-ui/react";

function AddProduct(props) {
	const [formState, setFormState] = useState({
		title: "",
		description: "",
		quantity: 0,
		price: 0,
		category: "",
	});
	const [AddProduct] = useMutation(ADD_PRODUCT);

	// to upload a single image
	const [images, setImages] = useState([]);
	const [value, setValue] = useState("");

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const mutationResponse = await AddProduct({
			variables: {
				name: formState.title,
				description: formState.description,
				image: images.length ? images[0]?.data_url : "",
				quantity: formState.quantity,
				price: formState.price,
				category: formState.category,
			},
		});
		setFormState("");
		window.location.replace("/");

		const newProduct = mutationResponse.data.AddProduct.newProduct;
		console.log(newProduct);
	};

	const handleOnChangeText = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	};
	const handleOnChangeQuantity = (event) => {
		const quantity = parseInt(event.target.value);
		setFormState({ ...formState, quantity });
	};
	const handleChangePrice = (event) => {
		const price = parseFloat(event.target.value);
		setFormState({ ...formState, price });
	};
	const handleChangeImage = (imageList, addUpdateIndex) => {
		setImages(imageList);
	};
	const handleChangeCategory = (event) => {
		const category = event.target.value;
		setFormState({ ...formState, category });
	};

	const format = (val) => `$` + val;
	const parse = (val) => val.replace(/^\$/, "");

	return (
		<Box p={8} borderWidth={1} borderRadius={8} boxShadow={"lg"}>
			<Flex
				width={"full"}
				align={"center"}
				justifyContent={"center"}
				flexDirection={"column"}
			>
				<Box p={2}>
					<Box textAlign={"center"}>
						<Heading>Add A Product</Heading>
					</Box>
					<Box my={4} textAlign={"left"}>
						<form onSubmit={handleFormSubmit}>
							<FormControl my={3} onChange={handleOnChangeText} isRequired>
								<FormLabel>Product Name</FormLabel>
								<Input type={"text"} placeholder={"Chew Toy"} />
							</FormControl>
							<FormControl my={3} onChange={handleOnChangeText} isRequired>
								<FormLabel>Product Description</FormLabel>
								<Input
									type={"text"}
									placeholder={"This is a dog's chew toy."}
								/>
							</FormControl>
							<FormControl my={3} onChange={handleOnChangeQuantity} isRequired>
								<FormLabel>Quantity</FormLabel>
								<NumberInput>
									<NumberInputField />
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
							</FormControl>
							<FormControl my={3} onChange={handleChangePrice} isRequired>
								<FormLabel>Price</FormLabel>
								<NumberInput
									onChange={(valueString) => setValue(parse(valueString))}
									precision={2}
									value={format(value)}
								>
									<NumberInputField />
								</NumberInput>
							</FormControl>
							<FormControl my={3} onChange={handleChangeCategory} isRequired>
								<FormLabel>Category</FormLabel>
								<Select placeholder="Select Option">
									<option value="dogs">Dogs</option>
									<option value="cats">Cats</option>
									<option value="birds">Birds</option>
									<option value="reptiles">Reptiles</option>
									<option value="rodents">Rodents</option>
									<option value="fish">Fish</option>
								</Select>
							</FormControl>
							<FormControl>
								<FormLabel>Upload an Image</FormLabel>
								<ImageUploading value={images} onChange={handleChangeImage}>
									{({ imageList, onImageUpload, onImageRemove }) => (
										<>
											<Button onClick={onImageUpload}>Add Image</Button>

											{imageList.map((image, index) => (
												<Box key={index}>
													<Image src={image.dataURL} alt="" width="200px" />
													<Button onClick={() => onImageRemove(index)}>
														Remove Image
													</Button>
												</Box>
											))}
										</>
									)}
								</ImageUploading>
							</FormControl>
						</form>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
}

export default AddProduct;
