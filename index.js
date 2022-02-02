const { Client, Intents, Collection } = require('discord.js');
const { clientId, guildId} = require('./config.json');
const { checkVirus } = require('./utils/checkvirus')
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const client = new Client({ intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_MESSAGE_TYPING,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        ],
        partials: [
            'CHANNEL', // Required to receive DMs
        ] });

