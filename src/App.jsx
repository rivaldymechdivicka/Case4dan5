import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import MainPage from "../src/pages/MainPages";


function App() {
	return (
		
			<Router>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		
	);
}

export default App;
