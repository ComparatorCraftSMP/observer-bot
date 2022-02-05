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

        let pluginString = ''

        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', 'key': `${process.env.API}`}
          }
        const response = await fetch(`${process.env.SERVER}/v1/plugins`, options)
        const data = await response.json()
            
        pluginString = Object.values(data).map(plugin => plugin.name).join(', ')
        interaction.reply(pluginString)   
        console.log(`${interaction.user.tag} did /plugins`)    
    }
}

