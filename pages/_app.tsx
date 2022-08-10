import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "reset-css";
import { StoreProvider } from "easy-peasy";
import PlayerLayout from "../components/playerLayout";
import { store } from "../lib/store";

const theme = extendTheme({
	colors: {
		gray: {
			100: "#f5f5f5",
			200: "#eeeeee",
			300: "#e0e0e0",
			400: "#bdbdbd",
			500: "#9e9e9e",
			600: "#757575",
			700: "#616161",
			800: "#424242",
			900: "#212121",
		},
	},
	components: {
		Button: {
			variants: {
				link: {
					":focus": {
						outline: "none",
						boxShadow: "none",
					},
				},
			},
		},
	},
});

type Props = StoreProvider["props"] & { children: React.ReactNode };

const StoreProviderCasted =
	StoreProvider as unknown as React.ComponentType<Props>;

const MyApp = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme}>
			<StoreProviderCasted store={store}>
				{Component.authPage ? (
					<Component {...pageProps} />
				) : (
					<PlayerLayout>
						<Component {...pageProps} />
					</PlayerLayout>
				)}
			</StoreProviderCasted>
		</ChakraProvider>
	);
};

export default MyApp;
