const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard } = require('../config.json')
const fetchPlaceholder = require('../utils/papi.js')
dotenv.config();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('playerlist')
        .setDescription('a list of all the players on the server'),
    
    async execute(interaction) {
    const client = interaction.client

        
    try {
        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', 'key': `${process.env.API}`}
          }

        const response = await fetch(`${process.env.SERVER}/v1/players`, options)
        const data = await response.json()
        const playerlist = data.map(players => `**${players.displayName}**`).join('\n')
        
        
          
        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`${interaction.guild.name}'s Players`)
                  .setDescription(`${await fetchPlaceholder('0e4735e7-b910-480e-9566-e83d960c978d', '%playerlist_online,normal,yes,list%')}`)
        
        await interaction.reply({embeds: [embed]}) 
          
        

        console.log(`${interaction.user.tag} did /playerlist in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'This server has 0 plugins', ephemeral: true })
            console.error(error)
        }
    }
}

