import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import {
	Flex,
	Box,
	Image,
	Icon,
	Tooltip,
	Text,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	Button,
	ModalFooter,
	ModalBody,
} from "@chakra-ui/react";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

function ProductItem(item) {
	const [state, dispatch] = useStoreContext();

	const { image, name, _id, price } = item;

	const { cart } = state;

	const { isOpen, onOpen, onClose } = useDisclosure();

	const addToCart = () => {
		const itemInCart = cart.find((cartItem) => cartItem._id === _id);
		if (itemInCart) {
			dispatch({
				type: UPDATE_CART_QUANTITY,
				_id: _id,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
			idbPromise("cart", "put", {
				...itemInCart,
				purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
			});
		} else {
			dispatch({
				type: ADD_TO_CART,
				product: { ...item, purchaseQuantity: 1 },
			});
			idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
		}
	};

	return (
		<Flex flexDirection={"row"} flexWrap="wrap">
			<Box bg={"white"} maxWidth={"md"} shadow="md">
				<Link to={`/products/${_id}`}>
					<Image
						alt={`Picture of ${name}`}
						src={`${image}`}
						boxSize={"200px"}
						borderBottom="1px"
					/>
				</Link>
				<Flex m="3" justifyContent={"space-between"} alignContent="center">
					<Text fontSize="1rem">
						{name}
						<br />${price.toFixed(2)}
					</Text>
					<Tooltip
						label="Add to Cart"
						background={"white"}
						placement="top"
						color="black"
						fontSize="1.2rem"
					>
						<Button variant={"ghost"} onClick={onOpen}>
							<Icon
								as={AddShoppingCartIcon}
								h={6}
								alignSelf={"center"}
								onClick={addToCart}
								cursor={"pointer"}
							/>
							<Modal
								isCentered
								isOpen={isOpen}
								onClose={onClose}
								motionPreset="slideInBottom"
							>
								<ModalOverlay />
								<ModalContent>
									<ModalHeader>Item Added To Cart</ModalHeader>
									<ModalCloseButton />
									<ModalBody
										display={"flex"}
										flexDirection={"column"}
										justifyContent={"center"}
										alignItems={"center"}
									>
										<Image
											alt={`Picture of ${name}`}
											src={`${image}`}
											height={"200px"}
										/>
										<Text fontSize={"1rem"}>{name}</Text>
										<Text fontSize={"1rem"}>${price.toFixed(2)}</Text>
									</ModalBody>
									<ModalFooter>
										<Button colorScheme="teal" width={"full"}>
											<Link to={"/cart"}>View Cart</Link>
										</Button>
									</ModalFooter>
								</ModalContent>
							</Modal>
						</Button>
					</Tooltip>
				</Flex>
			</Box>
		</Flex>
	);
}

export default ProductItem;
