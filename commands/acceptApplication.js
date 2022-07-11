const {SlashCommandBuilder, SlashCommandStringOption, ContextMenuCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message, Client, ClientUser, Guild } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard, application } = require('../config.json')

dotenv.config();


module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Accept Application')
        .setType(3),
        
    
    async execute(interaction) {  
        const msg = interaction.targetMessage
        try {
            if(msg.channel.parentId === application.ticket_category) {
                if (interaction.member.roles.cache.find(role => role.id === application.staff_role)) {
                    msg.reply({ content:`${application.message}`})
                    interaction.reply({ content:'Message sent', ephemeral: true})
                }
            } else {
                interaction.reply({ content:"This isn't an application", ephemeral: true})
            }
            
        } catch(error) {
            console.error(error)
        }
    }
}
