const SUMMERIZE_TOKEN = import.meta.env.VITE_SUMMERIZE_TOKEN;
export const getSummerizedText = async (message: { selectedText: string }) => {
	if (message.selectedText) {
		const data = await fetch(
			"https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
			{
				method: "POST",
				headers: {
					Authorization: SUMMERIZE_TOKEN,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ inputs: message.selectedText }),
			}
		);
		if (data.status === 200) {
			const result = await data.json();
			return result[0].summary_text;
		}
		return null;
	}
};
