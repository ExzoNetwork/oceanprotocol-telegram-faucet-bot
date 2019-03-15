const token = process.env.BOT_TOKEN

const NodeBot = require('node-telegram-bot-api')
const EthereumAddress = require('ethereum-address')

const faucetServer = require('../utility/faucet')

let bot

if (process.env.NODE_ENV === 'production') {
    bot = new NodeBot(token)

    bot.setWebHook(process.env.APP_URL + bot.token)
} else {
    bot = new NodeBot(token, {
        polling: true
    })
}

/**
 * Start call
 */
bot.onText(/\/start/, message => {
    // eslint-disable-next-line camelcase
    const { username } = message.from

    bot.sendMessage(
        message.chat.id,
        // eslint-disable-next-line camelcase
        'Hey @' + username + ', use /request <address> to request for faucet'
    )
})

/**
 * Request call
 */
bot.onText(/\/request/, message => {
    const { text } = message
    const { username } = message.from

    const address = text.split(' ')[1]
    if (typeof address === 'undefined') {
        bot.sendMessage(
            message.chat.id,
            '@' + username + ' Please provide your wallet address'
        )
    } else {
        if (EthereumAddress.isAddress(address)) {
            bot.sendMessage(
                message.chat.id,
                '@' + username + ' Processing, please wait'
            )
            faucetServer
                .callFaucet(address, 'telegram')
                .then(response => {
                    bot.sendMessage(
                        message.chat.id,
                        `@${username}, ${response.message}`
                    )
                })
                .catch(err => {
                    bot.sendMessage(
                        message.chat.id,
                        `@${username}, an error occurred on our end. Please try again`
                    )
                })
        } else {
            bot.sendMessage(
                message.chat.id,
                '@' +
                    username +
                    ' The wallet address you provided is invalid. Please check and try again'
            )
        }
    }
})

module.exports = bot
