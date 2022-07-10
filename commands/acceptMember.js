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
        .setType('MESSAGE'),
    
    async execute(interaction) {

        
    try {
            
        } catch(error) {
            await interaction.reply({ content: 'This server has 0 commands', ephemeral: true })
            console.error(error)
        }
    }
}
