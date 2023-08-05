const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = {
  queryGPT,
};

// Query GPT
// model can only be one of the following:
// https://platform.openai.com/docs/models
async function queryGPT(messages, model) {
  // filter messages only have content and role
  messages = messages.map((message) => {
    return {
      content: message.content,
      role: message.role,
    };
  });
  // console.log("messages: ", messages);

  try {
    const response = await openai.createChatCompletion({
      model: model,
      messages: messages,
    });
    return response.data.choices[0].message;
  } catch (error) {
    console.error("Error querying GPT:", error);
    console.error(error.message);
  }
}
