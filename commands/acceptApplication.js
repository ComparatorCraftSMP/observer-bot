const {SlashCommandBuilder, SlashCommandStringOption, ContextMenuCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message, Client, ClientUser, Guild } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard, application } = require('../config.json')

dotenv.config();


module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Accept Application')
        .setType(3),
        
    
    async execute(interaction) {  
        try {
            interaction.targetMessage.reply('fart')
            interaction.reply('worked')
        } catch(error) {
            console.error(error)
        }
    }
}
