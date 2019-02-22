const token = process.env.AUTH_TOKEN;

const NodeBot = require("node-telegram-bot-api");

let bot;

if (process.env.NODE_ENV === "production") {
  bot = new NodeBot(token);

  bot.setWebHook(process.env.HEROKU_URL + bot.token);
} else {
  bot = new NodeBot(token, {
    polling: true
  });
}

/**
 * Start call
 */
bot.onText(/\/start/, message => {
  const { first_name } = message.from;

  bot.sendMessage(
    message.chat.id,
    "Hey " + first_name + ", use /request <address> to request for faucet"
  );
});

/**
 * Request call
 */
bot.onText(/\/request/, message => {
  const { text } = message;
  const { username } = message.from;

  const address = text.split(" ")[1];
  if (typeof address == "undefined") {
    bot.sendMessage(
      message.chat.id,
      "@" + username + " Please provide your wallet address"
    );
  } else {
    bot.sendMessage(message.chat.id, "Faucet has been sent.");
  }
});

module.exports = bot;
