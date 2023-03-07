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
      model: "text-davinci-003",
      prompt: message.content,
      max_tokens: 1000,
      temperature: 0.9,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      top_p: 1.0,
      stop: ["Eka Prasetia"],
    });

    //console.log(`${gptResponse.data}`);
    message.reply(`${gptResponse.data.choices[0].text}`);
    return;
  } catch (err) {
    console.log(err);
  }
});

// Log BOT Connect to Discord API
client.login(process.env.DISCORD_TOKEN);
console.log("ChatGPT BOT is online!");
