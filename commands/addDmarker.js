const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('marker_add')
        .setDescription('add a marker to the dynmap')
        .addStringOption(option => option.setName('name').setDescription('the name of the dynmap marker'))
        .addStringOption(option => option.setName('category').setDescription('category the marker is in').addChoice('Nether Portal', 'Nether Portals').addChoice('Shop', 'shops').addChoice('Base', 'Bases'))
        .addStringOption(option => option.setName('icon').setDescription('This is the icon that the marker will have, do /markers to see a list of markers')),
    
    async execute(interaction) {

        

        const options = {
            method: 'POST',
            headers: {Accept: 'application/x-www-form-urlencoded', 'key': `${process.env.API}`}
          }

        const response = await fetch(`${process.env.SERVER}/v1/server/exec`, options)
        const data = await response.json()
        
        
        
          
        const embed = new MessageEmbed()
                  .setColor('#6beb34')
                  .setTitle(`ComparatorCraftSMP's Plugins`)
                  .setDescription(`${pluginString}`)
        
        interaction.reply({embeds: [embed]}) 
          
        

        console.log(`${interaction.user.tag} added a dynmap marker in channel ${interaction.channel.name} in guild ${interaction.guild.name}`)    
    }
}