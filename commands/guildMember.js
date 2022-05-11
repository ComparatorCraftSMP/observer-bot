const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message, Client} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard } = require('../config.json')
dotenv.config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guildmemberinfo')
        .setDescription('information about the selected discord user')
        .addUserOption(option => option.setName('user').setDescription('the user you want to find information about')),
        
    async execute(interaction) {
                
    try {
        const client = interaction.client

        
        const member = interaction.options.getMember('user')
        const user = interaction.options.getUser('user')

        const gld = interaction.guild

        const roles = member.roles.cache
        const roleCount = roles.size
        const rolesList = roles.map(role => `<@&${role.id}>`).join(', ')


        const undRemove = /(_)/g

       // const feature = gld.features.map(fe => `✅ ${fe.replace(undRemove, ' ').toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase())}`).join('\n')

        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`Information about ${member.displayName}`)
                  .addFields(
                    {name: '<:icons_calendar1:941679946760351794> Joined Discord', value: `<t:${Math.round(member.joinedTimestamp / 1000)}:F> or <t:${Math.round(member.joinedTimestamp / 1000)}:R>`, inline: true},
                    {name: `<:icons_clock:964491800465276940> Joined ${gld.name}`, value: `<t:${Math.round(user.createdTimestamp / 1000)}:F> or <t:${Math.round(user.createdTimestamp / 1000)}:R>`, inline: true},
                    {name: '<:icons_dfuchsia:875710295081910292> Roles', value: `${rolesList}`, inline: true},
                    {name: '<:icons_eventcolour:870646213429563445> Badges', value: `placeholder`, inline: true},

                  )
                  .setThumbnail(member.displayAvatarURL({dynamic:true}))
        
        await interaction.reply({embeds: [embed]}) 
        

        console.log(`${interaction.user.tag} did /guildinfo in ${gld.name} in guild ${gld.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'Error', ephemeral: true })
            console.error(error)
        }
    }
}