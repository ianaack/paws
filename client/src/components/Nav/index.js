import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

import {
	Flex,
	Image,
	chakra,
	ButtonGroup,
	Button,
} from "@chakra-ui/react";

function Nav() {
	function showNavigation() {
		if (Auth.loggedIn()) {
			return (
				<ButtonGroup>
					<Button fontWeight={"light"} fontSize="m">
						<Link to="/orders">Order History</Link>
					</Button>
					<Button>
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
					<Button>
						<Link to="/login">Login</Link>
					</Button>
					<Button>
						<Link to="/signup">Sign Up</Link>
					</Button>
				</ButtonGroup>
			);
		}
	}
	return (
		<chakra.header>
			<Flex w="100%" px="6" py="5" align={"center"} justify={"flex-start"}>
				<Link to="/">
					<Image src={Logo} h="75px" mx={"2"} />
				</Link>
				{showNavigation()}
			</Flex>
		</chakra.header>
	);
}

export default Nav;
