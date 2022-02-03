const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const ServerTap = require('servertap-js')
const dotenv = require('dotenv');
dotenv.config();


const server = new ServerTap({apiKey: `${process.env.API}`, baseUrl: `${process.env.SERVER}`})

module.exports = {
    data: new SlashCommandBuilder()
        .setName('plugins')
        .setDescription('a list of all the plugins on the server'),
    
    async execute(interaction) {
        
        
    }
}

