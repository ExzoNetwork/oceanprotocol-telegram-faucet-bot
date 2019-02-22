const axios = require("axios");

const callFaucet = (address, agent, callback) => {
  try {
    axios({
      method: "POST",
      url: process.env.FAUCET_SERVER_URL,
      data: {
        address,
        agent
      }
    })
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  callFaucet
};
