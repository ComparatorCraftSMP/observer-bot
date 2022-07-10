const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message, Client} = require('discord.js');
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
        const client = interaction.client

        const guild = interaction.guild

        const command = await client.application.commands.fetch()

        const channel = await guild.channels.fetch()
        const channelCount = channel.size

        const roles = await guild.roles.fetch()
        const roleCount = roles.size

        const matchUnderscore = /(_)/g

        const feature = guild.features.map(fe => `<:icons_Correct:859388130411282442> ${fe.replace(matchUnderscore, ' ').toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase())}`).join('\n')

        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`Information about ${guild.name}`)
                  .addFields(
                      {name: '<:icons_shine1:859424400959602718> Owner', value: `<@${guild.ownerId}>`, inline: true},
                      {name: '<:icons_people:964425853930995783> Members', value: `Member Count: ${guild.memberCount}`, inline: true},
                      {name: '<:icons_calendar1:941679946760351794> Date Created', value: `<t:${Math.round(guild.createdAt / 1000)}:F> or <t:${Math.round(guild.createdAt / 1000)}:R>`, inline: true},
                      {name: '<:icons_calendar1:941679946760351794> Bot Join Date', value: `<t:${Math.round(guild.joinedTimestamp / 1000)}:F> or <t:${Math.round(guild.joinedTimestamp / 1000)}:R>`, inline: true},
                      {name: '<:icons_pen:869507189553922061> Commands (from this bot)', value: `${command.size}`, inline: true},
                      {name: '<:icons_channel:859424401950113822> Channels', value: `${channelCount}`, inline: true},
                      {name: '<:icons_colorstaff:869554761840603196> Affiliation', value: `<:icons_colorserverpartner:869529747447746600> Partnered: ${guild.partnered}\n<:icons_colorserververified:869529747846234162> Verified: ${guild.verified}`, inline: true},
                      {name: '<:icons_dblurple:875710295258046535> Roles', value: `${roleCount}`, inline: true},
                      {name: '<:icons_colorboostnitro:869528229436858378> Boosting', value: `Shows Progress Bar: ${guild.premiumProgressBarEnabled}\nBoosting Tier: ${guild.premiumTier.replace(matchUnderscore, ' ').toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase())}\nTotal Boost Count: ${guild.premiumSubscriptionCount}`, inline: true},
                      {name: '<:icons_linked:875395222962585660> Features', value: `${feature}`}
                  )
                  .setThumbnail(client.user.avatarURL({dynamic:true}))
        
        await interaction.reply({embeds: [embed]}) 
        

        console.log(`${interaction.user.tag} did /guildinfo in ${guild.name} in guild ${guild.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'Error', ephemeral: true })
            console.error(error)
        }
    }
}
