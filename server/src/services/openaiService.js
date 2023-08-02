import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";
import { OPENAI_API_KEY } from "../config/openai";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: OPENAI_API_KEY,
  })
);

// Query GPT-3.5 Turbo
export const queryGPT3_5Turbo = async (messages) => {
  const requestPayload = new CreateCompletionRequest({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  try {
    const response = await openai.createCompletion(requestPayload);
    return response.data.choices[0]?.text.trim();
  } catch (error) {
    console.error("Error querying OpenAI's GPT 3.5 Turbo: ", error);
    throw error;
  }
};

// Query GPT-4
export const queryGPT4 = async (messages) => {
  const requestPayload = new CreateCompletionRequest({
    model: "gpt-4",
    messages: messages,
  });

  try {
    const response = await openai.createCompletion(requestPayload);
    return response.data.choices[0]?.text.trim();
  } catch (error) {
    console.error("Error querying OpenAI's GPT-4: ", error);
    throw error;
  }
};
