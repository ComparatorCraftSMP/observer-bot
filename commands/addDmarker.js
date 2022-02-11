const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('markeradd')
        .setDescription('add a marker to the dynmap')
        .addStringOption(option => option.setName('name').setDescription('the name of the dynmap marker'))
        .addStringOption(option => option.setName('category').setDescription('category the marker is in').addChoice('Nether Portal', 'Nether Portals').addChoice('Shop', 'shops').addChoice('Base', 'Bases'))
        .addStringOption(option => option.setName('icon').setDescription('this is the icon that the marker will have'))
        .addIntegerOption(option => option.setName('x').setDescription('x coordiante of the dynmap marker'))
        .addIntegerOption(option => option.setName('y').setDescription('y coordiante of the dynmap marker'))
        .addIntegerOption(option => option.setName('z').setDescription('z coordiante of the dynmap marker')),
    
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