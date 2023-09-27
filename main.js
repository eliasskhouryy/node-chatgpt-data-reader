import {getChatCompletion} from './chatgptApi.js';
import {config} from 'dotenv';
import {csvData, writeToFile} from './csvWriter.js';
import fs from 'fs';
import {columnArray} from './xlsx.js';
config();

console.log('Permgroup scraper initializing...');

function formatTwoDigits(number) {
	return number.toString().padStart(2, '0');
}
const currentDate = new Date();
const formattedDate = `${formatTwoDigits(currentDate.getDate())}${formatTwoDigits(currentDate.getMonth() + 1)}${currentDate.getFullYear()}`;
const filename = `scraped_data/company_names_data_${formattedDate}.csv`;

const descriptionText = columnArray;

async function processDescriptions(descriptionText) {
	try {
		for (const text of descriptionText) {
			const response = await getChatCompletion(
				'Can you please find the company name from the following text. Only output the companny name. No other text. If a company name is not found, ONLY output "-": ' + text
			);
			console.log(response.choices[0].message.content);
			writeToFile(text, response.choices[0].message.content);

			// set a 1.2 second delay between requests
			await new Promise((resolve) => setTimeout(resolve, 1200));
		}
	} catch (error) {
		console.error('Error processing descriptions', error);
	}

	fs.writeFile(filename, csvData, (err) => {
		if (err) throw err;
		console.log('Data saved :)');
	});
}

processDescriptions(descriptionText);
