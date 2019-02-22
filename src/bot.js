const token = process.env.AUTH_TOKEN;

const NodeBot = require("node-telegram-bot-api");
const EthereumAddress = require("ethereum-address");
const MemoryCache = require("memory-cache");

const faucetServer = require("../utility/faucet");

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

  console.log(MemoryCache.get("username"));
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

  let current_timestamp = new Date();
  const one_day = 60 * 60 * 24;

  const address = text.split(" ")[1];
  if (typeof address === "undefined") {
    bot.sendMessage(
      message.chat.id,
      "@" + username + " Please provide your wallet address"
    );
  } else {
    if (EthereumAddress.isAddress(address)) {
      const request_history = MemoryCache.get(username);
      if (
        request_history === null ||
        request_history.last_requested - current_timestamp < one_day
      ) {
        bot.sendMessage(message.chat.id, "Processing, please wait");
        faucetServer.callFaucet(address, "telegram");
        // if (response.status === 200) {
        //   bot.sendMessage(
        //     message.chat.id,
        //     "@" + username + "your faucet token has been funded."
        //   );
        //   cacheUser(username)
        // } else if (response.status === 503) {
        //   bot.sendMessage(
        //     message.chat.id,
        //     "@" +
        //       username +
        //       "you have requested too recently, try again after 24 hours"
        //   );
        // } else if (response.status === 404) {
        //   bot.sendMessage(
        //     message.chat.id,
        //     "@" + username + "An error occured. Please try again"
        //   );
        // }
      } else {
        bot.sendMessage(
          message.chat.id,
          "@" +
            username +
            "you have requested too recently, try again after 24 hours"
        );
      }
    } else {
      bot.sendMessage(
        message.chat.id,
        "@" +
          username +
          " The wallet address you provided is invalid. Please check and try again"
      );
    }
  }
});

const cacheUser = user => {};
module.exports = bot;
