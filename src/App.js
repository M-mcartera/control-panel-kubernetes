import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import WelcomePage from "./pages/WelcomePage";
import SecuredPage from "./pages/SecuredPage";
import { ThemeProvider } from "styled-components";
function App() {
	return (
		<div>
			<ThemeProvider theme={{}}>
				<Nav />
				<BrowserRouter>
					<Routes>
						<Route exact path="/" element={<WelcomePage />} />
						<Route path="/secured" element={<SecuredPage />} />
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</div>
	);
}
export default App;
