const axios = require("axios");

const callFaucet = (address, agent, callback) => {
  axios({
    method: "POST",
    url: process.env.FAUCET_SERVER_URL,
    data: {
      address,
      agent
    }
  })
    .then(result => {
      callback(result.data);
    })
    .catch(error => {
      callback(error.response.data.error);
    });
};

module.exports = {
  callFaucet
};
