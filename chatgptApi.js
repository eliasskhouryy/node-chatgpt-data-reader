import OpenAI from 'openai';
import {config} from 'dotenv';

config();

const openai = new OpenAI({
	apiKey: process.env.CHATGPT_API_KEY,
});

export async function getChatCompletion(userMessage) {
	try {
		const response = await openai.chat.completions.create({
			messages: [{role: 'user', content: userMessage}],
			model: 'gpt-3.5-turbo',
		});

		return response;
	} catch (error) {
		console.error('Error getting chat completion', error);
		throw error;
	}
}
