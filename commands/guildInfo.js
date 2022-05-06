const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard } = require('../config.json')
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('guildinfo')
        .setDescription('information about this discord guild'),
    
    async execute(interaction) {

        
    try {

        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`ComparatorCraftSMP's Plugins`)
                  .setDescription(``)
        
        await interaction.reply({embeds: [embed]}) 
          
        

        console.log(`${interaction.user.tag} did /guildinfo in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'This server has 0 plugins', ephemeral: true })
            console.error(error)
        }
    }
}
