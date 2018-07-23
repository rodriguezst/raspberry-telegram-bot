#RaspberryPi Telegram bot

This is a simple bot for Telegram to run scripts on your RaspberryPi.

##Setup

The steps are supposed to be made on a RaspberryPi with the use of ssh, scp and\or what you prefere.

First of all install Node.js on your RaspberryPi (if not yet installed or upgraded by you):

1. Use the following terminal commands for install the latest Node.js version (more on nodesource https://github.com/nodesource/distributions)

```
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
```

2. Check if Node.js is correctly installed with `node -v`. It should appear the installed Node.js version (6.x)

Now is time to download\clone or whatever you want to get the source code of this bot. Enter the bot source code folder and start with the following steps!

1. Install dependencies with `npm install`
2. Create your personal Telegram bot following these instructions: https://core.telegram.org/bots#botfather (point 6. BotFather)
3. Replace `my-telegram-bot-token` (token var) with the authorization token returned by @BotFather
4. Replace `my-bot-name` with the name of your bot (or what do you prefere, is not so important)
5. Start your bot with `node bot` (for the first setup we will just run the server one time, after we will use PM2)
4. Search and add your bot on your Telegram web\software\app and send him the command `/myid`
5. Now get the number returned by the bot and put it in `my-telegram-id`. This is your telegram unique id used by bot for send you messages and authenticate your commands. **NOTE** Only you (authenticated by the unique id just entered) are able to send command and get notification from bot.
6. Now all is ready, you can turn of the bot and continue to the steps.

This is a brief tutorial on how let the bot start automatically on Raspi bootup.

7. Install PM2, a production process manager to keep your application alive forever. Use `sudo npm install -g pm2`
8. Start the bot with the command `pm2 start bot.js`
9. PM2 can generate and configure a startup script to keep PM2 and your processes alive at every server restart. `Use pm2 startup` for generate the script.
10. Be sure your bot is up with PM2 with `pm2 list`; you should see a row with bot.js (or something like) and status online.
11. Now use `pm2 save` for save the process list so PM2 will start the bot on Raspi restart.


##Command list

Currently supported bot commands:

- `/reboot` - Reboot your RaspberryPi
- `/run script_name` - Execute scripts/script_name.sh and reply with the script output
- `/myid` - Usefull command for get your Telegram unique id for the first setup.

##How to add your command

Create a file inside scripts directory and save it as "my_new_file.sh".
Call it by sending "/run my_new_file".

##Packages used

This bot uses `node-telegram-bot-api`. You can find the documentation on https://github.com/yagop/node-telegram-bot-api. **Thanks a lot to them**
