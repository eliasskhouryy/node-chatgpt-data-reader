import XLSX from 'xlsx';

// Load the workbook
const workbook = XLSX.readFile('./data.xlsx');

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Initialize an array to hold the column data
export const columnArray = [];

// Loop through up to 751 rows in the specific column and push the value to the array
for (let rowIndex = 1; rowIndex <= 750; rowIndex++) {
	let cell = sheet[`A${rowIndex}`];
	if (cell !== undefined && cell.v !== null && cell.v !== '') {
		// Keep the original cell value in the array
		columnArray.push(cell.v);
	}
}

console.log(columnArray); // This will log the original values including commas, new lines etc.
