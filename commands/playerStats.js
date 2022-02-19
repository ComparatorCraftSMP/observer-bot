const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('PlayerStats')
        .setDescription('Your statistic on the server'),
    
    async execute(interaction) {

        

       
          
        const embed = new MessageEmbed()
                  .setColor('#6beb34')
                  .setTitle(`ComparatorCraftSMP's Plugins`)
                  .setDescription(`${pluginString}`)
        
        interaction.reply({embeds: [embed]}) 
          
        

        console.log(`${interaction.user.tag} did /plugins in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
    }
}
