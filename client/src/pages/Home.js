import React from "react";
import ProductList from "../components/ProductList";
import SearchBar from "../components/SearchBar";
import { Container } from "@chakra-ui/react";

const Home = () => {
	return (
		<Container maxW={"95%"} overflow={"hidden"}>
			<SearchBar />
			<ProductList />
		</Container>
	);
};

export default Home;
