import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [text, setText] = useState("");
	const getSelectedText = async () => {
		try {
			let [tab] = await chrome.tabs.query({
				active: true,
				currentWindow: true,
			});
			if (!tab?.id) {
				console.error("No active tab found or invalid tab ID.");
				return;
			}
			await chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: () => {
					let selectedText =
						window.getSelection()?.toString().trim() || "No text selected";
					chrome.runtime.sendMessage({ selectedText });
				},
			});
		} catch (error) {
			console.error("Failed to execute script:", error);
		}
	};
	useEffect(() => {
		getSelectedText();
		const handleMessage = (message: { selectedText: string }) => {
			if (message.selectedText) {
				setText(message.selectedText);
			}
		};
		chrome.runtime.onMessage.addListener(handleMessage);
		return () => {
			chrome.runtime.onMessage.removeListener(handleMessage);
		};
	}, []);
	return (
		<div className="App">
			<p>{text}</p>
		</div>
	);
}

export default App;
