import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

import { Flex, Image, chakra, ButtonGroup, Button } from "@chakra-ui/react";

function Nav() {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<ButtonGroup>
					<Button colorScheme="teal">
						<Link to="/addproduct">Add a Product</Link>
					</Button>
					<Button colorScheme="blue">
						<Link to="/orders">Order History</Link>
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
				w="100%"
				px="6"
				py="1"
				align={"center"}
				justify={"space-between"}
				background={"gray.300"}
			>
				<Link to="/">
					<Image src={Logo} h={"100px"} />
				</Link>
				{showNavigation()}
			</Flex>
		</chakra.header>
	);
}

export default Nav;
