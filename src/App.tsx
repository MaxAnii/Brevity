import { useState, useEffect } from "react";
import "./App.css";
import { getSelectedText } from "./utils/getSelectedTextScript";
import { getSummerizedText } from "./utils/getSummerizedText";
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import Loader from "./components/Loader";

function App() {
	const [text, setText] = useState("No selected text.");
	const [showLoader, setShowLoader] = useState(true);
	useEffect(() => {
		getSelectedText();
		chrome.runtime.onMessage.addListener(
			async (message: { selectedText: string }) => {
				if (message.selectedText) {
					const data = await getSummerizedText(message);
					setText(data);
				}
				setShowLoader(false);
			}
		);
	}, []);
	return (
		<>
			<Heading></Heading>
			<div className="App">
				{!showLoader ? (
					<p>{text}</p>
				) : (
					<div className="loader">
						<Loader></Loader>
					</div>
				)}
			</div>
			<Footer></Footer>
		</>
	);
}

export default App;
