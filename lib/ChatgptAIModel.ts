import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // store in .env
});

// 🔹 Model configuration (like generationConfig in Gemini)
const modelConfig = {
  model: "gpt-4o-mini", // or "gpt-4.1" if you want stronger reasoning
  temperature: 1,
  max_tokens: 8000,
};

// 🔹 Function to start a "chat session"
export async function chatSession(
  messages: { role: "system" | "user" | "assistant"; content: string }[]
) {
  const response = await openai.chat.completions.create({
    ...modelConfig,
    messages,
  });

  return response.choices[0].message.content;
}
