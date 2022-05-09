# Observer Bot
![DiscordJS Version](https://img.shields.io/node/v/discord.js?style=flat-square)
![Discord](https://img.shields.io/discord/761670547196739635?style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/ComparatorCraftSMP/observer-bot?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/ComparatorCraftSMP/observer-bot?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/ComparatorCraftSMP/observer-bot?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/ComparatorCraftSMP/observer-bot?style=flat-square)
![JS](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)

<br />
<p align="center">
  <a href="https://github.com/as-of-yet-unnamed/plugin">
    <img src="https://cdn.discordapp.com/avatars/805941240486428714/0a707de50318940dbe767db8c9178bb2.png?size=1024" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">Observer Bot</h3>
  <p align="center">
    This is a Discord bot that adds important utilities to our minecraft SMP through discord. It needs ServerTAP running and setup on the minecraft server 
    <br />
    <a href="LICENSE">License</a>
    <a href="https://github.com/ComparatorCraftSMP/observer-bot/projects/1">View Progress</a>
  </p>
</p>
<br />

<h1> Installation (Windows & Linux)</h1>
You need to install <a href="https://nodejs.org/en/">NodeJS</a> installed on the server/PC you want to host the bot on.
And install <a href="https://github.com/phybros/servertap">ServerTAP</a> on your minecraft server.


 1. `git clone https://github.com/ComparatorCraftSMP/observer-bot.git`
 2. `cd observer-bot`
 3. `npm i`
 4. Duplicate `.env.example` and `config.json.example` and remove the `.example` file extension from their names
 5. ![enter image description here](https://media.discordapp.net/attachments/762750022495764491/955918611187384421/unknown.png) just like this you should have a `.env` and a `config.json`
 6. Open `.env` and in `TOKEN=` put your [Discord bot token](https://www.writebots.com/discord-bot-token/) 
 7. In `API=` put your api key from your ServerTAP config.yml file
 8. In `Server` put your servers IP and port value from ServerTAP config.yml file
 9. Your .env file should look like this ![Don't worry these values are made up](https://media.discordapp.net/attachments/762750022495764491/955919190416588880/unknown.png)
 10. In `config.json` enter in those fields, clientId is the Discord bots id (this is needed), guildId isn't needed and bot owner isn't needed 
 11. Then your bot should be ready, do `npm run reg-commands` in your terminal to register the slash commands.
 12. Do `Control C` on your keyboard to cancel that once it says `Slash commands are registered successfully`
 13. Then do `npm run dev` and this is the command you will need to do to start the bot
