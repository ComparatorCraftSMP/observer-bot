const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message, Client} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard } = require('../config.json')
const client = require('../index.js')
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('guildinfo')
        .setDescription('information about this discord guild'),
    
    async execute(interaction) {

        
    try {

        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`Information about ${interaction.guild.name}`)
                  .addFields(
                      {name: 'Owner', value: `<@${interaction.guild.ownerId}>`, inline: true},
                      {name: 'Members', value: `a`, inline: true},
                      {name: 'Date Created', value: `<t:${interaction.guild.createdTimestamp}:F> or <t:${interaction.guild.createdTimestamp}:R>`, inline: true},
                      {name: 'Joined', value: `a`, inline: true},
                      {name: 'Commands', value: `a`, inline: true},
                      {name: 'Channels', value: `a`, inline: true},
                      {name: 'Affiliation', value: `a`, inline: true},
                      {name: 'Roles', value: `a`, inline: true},
                      {name: 'Boosting', value: `a`, inline: true},
                  )
        
        await interaction.reply({embeds: [embed]}) 
        // for embed design https://share.discohook.app/go/q6yfeccx
        

        console.log(`${interaction.user.tag} did /guildinfo in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'Error', ephemeral: true })
            console.error(error)
        }
    }
}
