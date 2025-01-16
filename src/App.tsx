import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/app/store";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { AppRoutes } from "@/routes";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000,
			gcTime: 10 * 60 * 1000,
			refetchOnWindowFocus: false,
			retry: (failureCount, error: any) => {
				if (error?.response?.status === 404) return false;
				if (error?.response?.status === 401) return false;
				return failureCount < 2;
			},
		},
		mutations: {
			retry: false,
			networkMode: "offlineFirst",
		},
	},
});

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<Router>
							<AppRoutes />
							<Toaster
								duration={5000}
								position="top-right"
								expand={true}
								richColors
							/>
						</Router>
					</PersistGate>
				</Provider>
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
