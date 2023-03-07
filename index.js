// Create a Discord Bot using OpenAI's GPT-3 API that interacts on Discrod Server
require("dotenv").config();

// Prepare to connect to Discord API
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Prepare to connect to OpenAI API
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// Check for when a message is sent on the Discord Server
client.on("messageCreate", async (message) => {
  try {
    // not repsond to other bots
    if (message.author.bot) return;

    const gptResponse = await openai.createCompletion({
      model: "davinci",
      prompt: `ChatGPT is AI friendly engine \n\
        ChatGPT: Hello, how are you?\n\
        ${message.author.username}: ${message.content} \n\
        ChatGPT:`,
      max_tokens: 100,
      temperature: 0.9,
      stop: ["ChatGPT:", "Eka Prasetia"],
    });
    //console.log(message.content);
    message.reply(`${gptResponse.data.choices[0].text}`);
  } catch (err) {
    console.log(err);
  }
});

// Log BOT Connect to Discord API
client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT BOT is online!");
