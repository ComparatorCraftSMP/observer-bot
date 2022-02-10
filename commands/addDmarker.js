const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
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
        const data = await response.json()
        
        
        
          
        const embed = new MessageEmbed()
                  .setColor('#6beb34')
                  .setTitle(`ComparatorCraftSMP's Plugins`)
                  .setDescription(`${pluginString}`)
        
        interaction.reply({embeds: [embed]}) 
          
        

        console.log(`${interaction.user.tag} added a dynmap marker in channel ${interaction.channel.name} in guild ${interaction.guild.name}`)    
    }
}