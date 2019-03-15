const axios = require('axios')

const callFaucet = (address, agent) => {
    return axios
        .post(process.env.FAUCET_SERVER_URL, { address, agent })
        .then(response => {
            return {
                status: response.status,
                message: 'Tokens has been sent'
            }
        })
        .catch(error => {
            if (error.status === 400) {
                return {
                    status: error.response.status,
                    message:
                        'An error occured. Please check your wallet and try again.'
                }
            } else {
                return {
                    status: error.response.status,
                    message: error.response.data.error
                }
            }
        })
}

module.exports = {
    callFaucet
}
