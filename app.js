const express = require("express");
const bodyParser = require("body-parser");

const packageInfo = require("./package.json");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    version: packageInfo.version
  });
});

const server = app.listen(process.env.PORT, "0.0.0.0", () => {
  const { address, port } = server.address();

  console.log(`Bot is running on ${process.env.NODE_ENV} mode`);
  console.log("Application is currently running at http://%s:%s", address, port);
});

module.exports = bot => {
  app.post("/" + bot.token, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  });
};
