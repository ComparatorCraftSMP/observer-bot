const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard } = require('../config.json')
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('allplayerstats')
        .setDescription('all statistics on all players on the server. do /statlist to see all stats')
        .addStringOption(option => option.setName('stat').setDescription('your statistic'))
        .addStringOption(option => option.setName('minecraftusername').setDescription('The username of the person your trying to find a stat of')),
    
    async execute(interaction) {
        
        const userIGN = interaction.options.getString('minecraftusername')
        
        const stat = interaction.options.getString('stat')  
        const statRe = /^[^_]+_/g
        const statName = stat.replace(statRe, '')
       
        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', 'key': `${process.env.API}`}
          }

        const response = await fetch(`${process.env.SERVER}/v1/scoreboard/${stat}`, options)
        const data = await response.json()
        const statObj = data.scores.find(x => x.entry === userIGN)

        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`Player stats of ${userIGN}`)
                  .setDescription(`${statName}: ${statObj.value}`)
                  .setThumbnail(`https://minotar.net/armor/bust/${userIGN}/100.png`)

        await interaction.reply({embeds: [embed]}) 
       
        

        console.log(`${interaction.user.tag} checked the stats of ${userIGN} in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
    }
}
