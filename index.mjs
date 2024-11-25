import OpenAI from 'openai';
import config from './config.mjs';

const client = new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseURL
});

async function main() {
  const stream = await client.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: 'user', content: 'weex 账号' },
    ],
    stream: true
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();