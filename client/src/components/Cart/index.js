import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import CartItem from "../CartItem";
import Auth from "../../utils/auth";
import { useStoreContext } from "../../utils/GlobalState";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import {
	Box,
	Button,
	Flex,
	Heading,
	Text,
	CloseButton,
} from "@chakra-ui/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

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

	function toggleCart() {
		dispatch({ type: TOGGLE_CART });
	}

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

	if (!state.cartOpen) {
		return (
			<Box>
				<Button colorScheme="blue" onClick={toggleCart} cursor="pointer">
					<ShoppingCartIcon />
				</Button>
			</Box>
		);
	}

	return (
		<Box>
			<Box
				display={"flex"}
				alignItems={"center"}
				justifyContent={"space-between"}
			>
				<Heading
					as="h1"
					textAlign={"center"}
					textDecoration={"underline"}
					paddingLeft={"10"}
					paddingRight={"3"}
				>
					Your Shopping Cart
				</Heading>
				<CloseButton marginRight={"2"} size={"lg"} onClick={toggleCart} />
			</Box>

			{state.cart.length ? (
				<Box margin={"5"}>
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
								Total
							</Text>
							<Text fontSize="xl" fontWeight="extrabold">
								${calculateTotal()}
							</Text>
						</Flex>

						{Auth.loggedIn() ? (
							<Button
								colorScheme="gray"
								size="lg"
								fontSize="md"
								rightIcon={<ShoppingCartCheckoutIcon />}
								onClick={submitCheckout}
							>
								Checkout
							</Button>
						) : (
							<Text fontSize={"2xl"} align={"center"} fontWeight="bold">
								Please login to check out
							</Text>
						)}
					</Flex>
				</Box>
			) : (
				<Text>You haven't added anything to your cart yet!</Text>
			)}
		</Box>
	);
};

export default Cart;
