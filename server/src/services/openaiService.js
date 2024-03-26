const { OpenAI } = require("openai");

const openai = new OpenAI(process.env.OPENAI_API_KEY);

module.exports = {
  queryGPT,
};

// Query GPT
// model can only be one of the following:
// https://platform.openai.com/docs/models
async function queryGPT(messages, model) {
  // Filter messages to only have content and role
  messages = messages.map((message) => ({
    content: message.content,
    role: message.role,
  }));

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: messages,
    });
    return response.choices[0].message;
  } catch (error) {
    console.error("Error querying GPT:", error);
    console.error(error.message);
  }
}
