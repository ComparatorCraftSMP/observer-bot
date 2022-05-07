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
        const gld = interaction.guild

        const cmd = await client.application.commands.fetch()

        const chnl = await gld.channels.fetch()
        const chnlCount = chnl.size

        const roles = await gld.roles.fetch()
        const roleCount = roles.size

        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`Information about ${gld.name}`)
                  .addFields(
                      {name: 'Owner', value: `<@${gld.ownerId}>`, inline: true},
                      {name: 'Members', value: `a`, inline: true},
                      {name: 'Date Created', value: `<t:${Math.round(gld.createdAt / 1000)}:F> or <t:${Math.round(gld.createdAt / 1000)}:R>`, inline: true},
                      {name: 'Bot Join Date', value: `<t:${Math.round(gld.joinedTimestamp / 1000)}:F> or <t:${Math.round(gld.joinedTimestamp / 1000)}:R>`, inline: true},
                      {name: 'Commands (from this bot)', value: `${cmd.size}`, inline: true},
                      {name: 'Channels', value: `${chnlCount}`, inline: true},
                      {name: 'Affiliation', value: `Partnered: ${gld.partnered}\nVerified: ${gld.verified}`, inline: true},
                      {name: 'Roles', value: `${}`, inline: true},
                      {name: 'Boosting', value: `a`, inline: true},
                  )
        
        await interaction.reply({embeds: [embed]}) 
        // for embed design https://share.discohook.app/go/q6yfeccx
        

        console.log(`${interaction.user.tag} did /guildinfo in ${gld.name} in guild ${gld.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'Error', ephemeral: true })
            console.error(error)
        }
    }
}
