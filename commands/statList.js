const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message, Util, MessageButton} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const paginationEmbed = require('discordjs-button-pagination');
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('statlist')
        .setDescription('a list of all the stats you can view on the server'),
    
    async execute(interaction) {

        

        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', 'key': `${process.env.API}`}
          }

        const response = await fetch(`${process.env.SERVER}/v1/scoreboard`, options)
        const data = await response.json()

         const statString = data.objectives.join(', ') 
        
        
        
        
        const embed1 = new MessageEmbed()
                  .setColor('#6beb34')
                  .setTitle(`ComparatorCraftSMP's Stats`)
                  .setDescription(statString.substring(0, 2000))

        const embed2 = new MessageEmbed()
                  .setColor('#6beb34')
                  .setTitle(`ComparatorCraftSMP's Stats`)
                  .setDescription(statString.substring(2000, 4000))

        const embed3 = new MessageEmbed()
                  .setColor('#6beb34')
                  .setTitle(`ComparatorCraftSMP's Stats`)
                  .setDescription(statString.substring(4000, statString.length))   
        
        const button1 = new MessageButton()
                    .setCustomId('arrow_left')
                    .setEmoji('⬅️')  
                    .setStyle('PRIMARY') 
        
        const button2 = new MessageButton()
                    .setCustomId('arrow_right')
                    .setEmoji('➡️')  
                    .setStyle('PRIMARY')

        const embeds = [
            embed1,
            embed2,
            embed3
        ]

        const buttons = [
            button1,
            button2
        ]

        paginationEmbed(interaction, embeds, buttons, 20000)
        
       
        console.log(statString.length)

        console.log(`${interaction.user.tag} checked for the stats list in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
    }
}

