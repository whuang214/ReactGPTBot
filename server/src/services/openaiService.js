const { Configuration, OpenAIApi, CreateCompletionRequest } = require("openai");
const { OPENAI_API_KEY } = require("../config/openai");

const openai = new OpenAIApi(
  new Configuration({
    apiKey: OPENAI_API_KEY,
  })
);

module.exports = {
  queryGPT3_5Turbo,
  queryGPT4,
};

// Query GPT-3.5 Turbo
async function queryGPT3_5Turbo(messages) {
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
}

// Query GPT-4
async function queryGPT4(messages) {
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
}
