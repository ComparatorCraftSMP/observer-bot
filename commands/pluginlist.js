const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('plugins')
        .setDescription('a list of all the plugins on the server'),
    
    async execute(interaction) {
        
        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', 'key': `${process.env.API}`}
          }
        const response = await fetch(`${process.env.SERVER}/v1/plugins`, options)
            .then(response => response.json())
            .then(response => interaction.reply(
                `${response[0].name} \n${response[0].description}`
            ))
            .catch(err => console.error(err));
            
    }
}

