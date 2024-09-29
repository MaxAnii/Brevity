export const getSelectedText = async () => {
	try {
		// Get the active tab in the current window
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true,
		});

		// Check if a valid tab is found
		if (!tab?.id) {
			console.error("No active tab found or invalid tab ID.");
			return;
		}

		// Execute script to get selected text in the active tab
		await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			func: () => {
				// Synchronously get the selected text from the window object
				const selectedText = window.getSelection()?.toString().trim() || "";

				// Send the selected text back to the extension runtime
				if (selectedText) {
					chrome.runtime.sendMessage({ selectedText });
				}
			},
		});
		console.log("Ress");
	} catch (error) {
		console.error("Failed to execute script:", error);
	}
};
