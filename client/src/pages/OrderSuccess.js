import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";
import { Box } from "@chakra-ui/react";

function Success() {
	const [addOrder] = useMutation(ADD_ORDER);

	useEffect(() => {
		async function saveOrder() {
			const cart = await idbPromise("cart", "get");
			const products = cart.map((item) => item._id);

			if (products.length) {
				const { data } = await addOrder({ variables: { products } });
				const productData = data.addOrder.products;

				productData.forEach((item) => {
					idbPromise("cart", "delete", item);
				});
			}

			setTimeout(() => {
				window.location.assign("/");
			}, 3000);
		}

		saveOrder();
	}, [addOrder]);

	return (
		<div>
			<Box>
				<h1>Order Placed</h1>
				<h2>Redirected to the home page</h2>
			</Box>
		</div>
	);
}

export default Success;
