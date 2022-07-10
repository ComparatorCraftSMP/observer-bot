const {SlashCommandBuilder, SlashCommandStringOption, ContextMenuCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message, Client, ClientUser, Guild } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard } = require('../config.json')

dotenv.config();


module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('accept')
        .setType(3),
        
    
    async execute(interaction) {

        
    try {
            console.log('fart')
        } catch(error) {
            
            console.error(error)
        }
    }
}
