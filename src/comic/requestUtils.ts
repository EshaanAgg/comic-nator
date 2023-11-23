import OpenAI from 'openai';
import { prompts } from '../constants/prompts';
import { Buffer } from 'buffer';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generateComicData = async (prompt: string) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: prompts.SCRIPT_GENERATOR },
      { role: 'user', content: `Your sample input is:n"""n${prompt}n"""` }
    ],
    model: 'gpt-3.5-turbo'
  });

  return JSON.parse(completion.choices[0].message.content || '{}');
};

export const generateBaseComic = async (prompt: string) => {
  const response = await fetch(process.env.REACT_APP_IMAGE_GENERATOR_URL || '', {
    headers: {
      Accept: 'image/png',
      Authorization: `Bearer ${process.env.REACT_APP_IMAGE_GENERATOR_KEY}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      inputs: prompt
    })
  });

  return Buffer.from(await (await response.blob()).arrayBuffer());
};
