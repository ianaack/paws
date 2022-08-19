import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
	fonts: {
		body: "Lato",
		heading: "Montserrat",
	},

	colors: {
		blue: {
			50: "#F0F0F5",
			100: "#D4D5E3",
			200: "#B8BAD1",
			300: "#9C9FBF",
			400: "#8084AD",
			500: "#65699A",
			600: "#50547C",
			700: "#3C3F5D",
			800: "#282A3E",
			900: "#14151F",
		},
		teal: {
			50: "#EEF7F4",
			100: "#CEE8E1",
			200: "#AFDACE",
			300: "#90CBBA",
			400: "#71BCA7",
			500: "#51AE94",
			600: "#418B76",
			700: "#316859",
			800: "#21453B",
			900: "#10231E",
		},
		yellow: {
			50: "#F4F2F1",
			100: "#E0DBD7",
			200: "#CCC4BD",
			300: "#B8ACA3",
			400: "#A49589",
			500: "#907E6F",
			600: "#736559",
			700: "#564C43",
			800: "#39322D",
			900: "#1D1916",
		},
		cyan: {
			50: "#EAF4FA",
			100: "#C4E1F2",
			200: "#9ECEEA",
			300: "#79BBE2",
			400: "#53A7DA",
			500: "#2D94D2",
			600: "#2477A8",
			700: "#1B597E",
			800: "#123B54",
			900: "#091E2A",
		},
	},
});

export default customTheme;
