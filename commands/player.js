const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message, Client, ClientUser, Guild } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard } = require('../config.json')

dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('player')
        .setDescription('Shows information about this player on the MC server')
        .addUserOption(option => option.setName('username').setDescription('the minecraft')),
    
    async execute(interaction) {

        
    try {
        const username = interaction.options.getMember('username')
        const ign = username.displayName

        const options = {
            method: 'GET'
          }
    
        const response = await fetch(`https://playerdb.co/api/player/minecraft/${displayName}`, options)

        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`${client.user.username}'s commands`)
                  .setDescription(`${commandsList}`)
                  .setThumbnail(client.user.avatarURL({dynamic:true}))
        
        await interaction.reply({embeds: [embed]}) 
          
        

        console.log(`${interaction.user.tag} did /help in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'This server has 0 commands', ephemeral: true })
            console.error(error)
        }
    }
}
