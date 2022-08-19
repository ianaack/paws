import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Flex, Image, chakra, ButtonGroup, Button } from "@chakra-ui/react";
import CategoryMenu from "../CategoryMenu";

function Nav() {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<ButtonGroup flexWrap={"wrap"}>
					<Button colorScheme="teal">
						<Link to="/addproduct">Add a Product</Link>
					</Button>
					<Button colorScheme="blue">
						<Link to="/orders">Order History</Link>
					</Button>
					<Button colorScheme="cyan" rightIcon={<ShoppingCartIcon />}>
						<Link to="/cart">View Your Cart</Link>
					</Button>
					<Button colorScheme="red">
						<Link
							to="/"
							alt={"Logout of your Pet Stuff Plus Account"}
							onClick={() => Auth.logout()}
						>
							Logout
						</Link>
					</Button>
				</ButtonGroup>
			);
		} else {
			return (
				<ButtonGroup fontWeight={"light"} fontSize="m">
					<Button colorScheme="teal">
						<Link to="/login">Login</Link>
					</Button>
					<Button colorScheme="blue">
						<Link to="/signup">Sign Up</Link>
					</Button>
				</ButtonGroup>
			);
		}
	}
	return (
		<chakra.header>
			<Flex
				px={6}
				py={1}
				alignItems={"center"}
				justify={"space-between"}
				background={"gray.300"}
				flexWrap={"wrap"}
			>
				<Link to="/">
					<Image src={Logo} h={"100px"} />
				</Link>
				<CategoryMenu />
				{showNavigation()}
			</Flex>
		</chakra.header>
	);
}

export default Nav;
