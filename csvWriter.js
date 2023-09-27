// Initialize an empty CSV string to store results.
export let csvData = `Company name\n`;

export const writeToFile = (description, companyName) => {
	let csvRow = '';
	csvRow = `"${companyName}"\n`;
	csvData += csvRow;
};
