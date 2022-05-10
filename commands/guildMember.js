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

        
        const user = interaction.options.getUser('user')
        const member = user.member

        const gld = interaction.guild

        const roles = await member.roles.fetch()
        const roleCount = roles.size

        const undRemove = /(_)/g

       // const feature = gld.features.map(fe => `✅ ${fe.replace(undRemove, ' ').toLowerCase().replace(/(^|\s)\S/g, L => L.toUpperCase())}`).join('\n')

        const embed = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`Information about ${interaction.user.username}`)
                  .addFields(
                    {name: 'Joined Discord', value: ``, inline: true},
                    {name: `Joined ${gld.name}`, value: ``, inline: true},
                    {name: 'Roles', value: ``, inline: true},
                    {name: 'Badges', value: ``, inline: true},

                  )
                  .setThumbnail(interaction.user.avatarURL({dynamic:true}))
        
        await interaction.reply({embeds: [embed]}) 
        

        console.log(`${interaction.user.tag} did /guildinfo in ${gld.name} in guild ${gld.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'Error', ephemeral: true })
            console.error(error)
        }
    }
}