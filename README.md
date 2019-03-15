# Ocean Protocol Faucet Telegram bot
A token distributing telegram bot for Ocean Protocol's testnet

## Getting Started 🛠
```bash
# Get the latest snapshot
git clone git@github.com:iamonuwa/oceanprotocol-telegram-faucet-bot.git faucet_bot

# Change directory
cd faucet_bot/

# Install NPM dependencies
npm install

# Or, if you prefer to use `yarn` instead of `npm`
yarn install
```

## Telegram 🗞
1. Send [@BotFather](https://telegram.me/botfather) a `/newbot` message
2. Pick *name* and *username* (e.g., Ocean Faucet + *ocean_faucet_bot*)
3. Receive a **BOT_TOKEN**;

## Hacking 👩🏻‍💻 👨🏼‍💻
1. Copy contents of *sample.env* to *.env*
2. Insert the **BOT_TOKEN** in *.env*
3. Run `npm run start` to start the bot in **development** mode
4. Do the magic 👾

## Deployment 🛳
1. Create a [Heroku account](https://www.heroku.com/)
2. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Create a [new app](https://dashboard.heroku.com/new-app) from Heroku WebGUI
> ! Run the following commands from the console
4. `heroku login`
5. `heroku git:remote -a *app_name_on_heroku*`
> ! The next step could be done from Heroku app **Settings**: -> *Reveal Config Vars* -> add [*KEY* = *VALUE*] pairs.
6. Setup config variables
   ```bash
    heroku config:set BOT_TOKEN=TOKEN
    heroku config:set APP_URL=$(heroku info -s | grep web_url | cut -d= -f2)
    ```
7. `git add * && git commit -m "<commit-message>"`
8. `git push heroku master`
