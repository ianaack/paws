import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import CartItem from "../components/CartItem";
import Auth from "../utils/auth";
import { useStoreContext } from "../utils/GlobalState";
import { ADD_MULTIPLE_TO_CART } from "../utils/actions";
import {
	Box,
	Button,
	Container,
	Flex,
	Heading,
	VStack,
	Text,
} from "@chakra-ui/react";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const Cart = () => {
	const [state, dispatch] = useStoreContext();
	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

	useEffect(() => {
		if (data) {
			stripePromise.then((res) => {
				res.redirectToCheckout({ sessionId: data.checkout.session });
			});
		}
	}, [data]);

	useEffect(() => {
		async function getCart() {
			const cart = await idbPromise("cart", "get");
			dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
		}

		if (!state.cart.length) {
			getCart();
		}
	}, [state.cart.length, dispatch]);

	function calculateTotal() {
		let sum = 0;
		state.cart.forEach((item) => {
			sum += item.price * item.purchaseQuantity;
		});
		return sum.toFixed(2);
	}

	function submitCheckout() {
		const productIds = [];

		state.cart.forEach((item) => {
			for (let i = 0; i < item.purchaseQuantity; i++) {
				productIds.push(item._id);
			}
		});

		getCheckout({
			variables: { products: productIds },
		});
	}

	return (
		<Container my={10} centerContent>
			<Flex
				display={"flex"}
				flexDirection={"column"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<Heading textDecoration={"underline"}>Your Shopping Cart</Heading>

				{state.cart.length ? (
					<Box my={10}>
						{state.cart.map((item) => (
							<CartItem key={item._id} item={item} />
						))}

						<Flex
							flexDirection={"column"}
							justifyContent={"space-between"}
							alignContent={"center"}
							marginTop={"5"}
						>
							<Flex justify="space-between">
								<Text fontSize="lg" fontWeight="semibold">
									Total:
								</Text>
								<Text fontSize="xl" fontWeight="extrabold">
									${calculateTotal()}
								</Text>
							</Flex>
							{Auth.loggedIn() ? (
								<VStack>
									<Button
										colorScheme="teal"
										size="lg"
										fontSize="md"
										rightIcon={<ShoppingCartCheckoutIcon />}
										onClick={submitCheckout}
										width={"full"}
									>
										Checkout
									</Button>
									<Button
										colorScheme="blue"
										size="lg"
										fontSize={"md"}
										leftIcon={<AddShoppingCartIcon />}
										width={"full"}
									>
										<Link to="/">Continue Shopping</Link>
									</Button>
								</VStack>
							) : (
								<Text fontSize={"2xl"} align={"center"} fontWeight={"bold"}>
									Please Login to Checkout
								</Text>
							)}
						</Flex>
					</Box>
				) : (
					<Box>
						<Text>You haven't added anything to your cart yet!</Text>
						<Button
							colorScheme="blue"
							size="lg"
							fontSize={"md"}
							leftIcon={<AddShoppingCartIcon />}
							width={"full"}
						>
							<Link to="/">Continue Shopping</Link>
						</Button>
					</Box>
				)}
			</Flex>
		</Container>
	);
};

export default Cart;
