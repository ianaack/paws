import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import customTheme from "./components/extendTheme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ChakraProvider theme={customTheme}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ChakraProvider>
);
