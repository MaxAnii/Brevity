import { useState, useEffect } from "react";
import "./App.css";
import { getSelectedText } from "./utils/getSelectedTextScript";
import { getSummerizedText } from "./utils/getSummerizedText";

function App() {
	const [text, setText] = useState("");

	useEffect(() => {
		getSelectedText();
		chrome.runtime.onMessage.addListener(
			async (message: { selectedText: string }) => {
				setText(message.selectedText);
				const data = await getSummerizedText(message);
				setText(data);
			}
		);
	}, []);
	return (
		<div className="App">
			<p>{text}</p>
		</div>
	);
}

export default App;
