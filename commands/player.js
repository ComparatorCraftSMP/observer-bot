const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message, Client, ClientUser, Guild } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard } = require('../config.json')
const fetchPlaceholder = require('../utils/papi.js')

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
    
        const response = await fetch(`https://playerdb.co/api/player/minecraft/${ign}`, options)

        const data = await response.json()
        const uuid = await data.data.player.id

        if(['minecraft.api_failure'].includes(data.code)){
            throw(error)
        }
        console.log(data);

        
        const offline = new MessageEmbed()
                  .setColor(`${embedColor}`)
                  .setTitle(`Minecraft Information about ${ign}`)
                  .setThumbnail(`https://minotar.net/helm/${ign}/100.png`)
                  .addFields(
                    {name: 'Minecraft Username', value: `${ign}`, inline: true},
                    {name: 'Discord Username', value: `${await fetchPlaceholder(uuid, '%discordsrv_user_tag%')}`, inline: true},
                    {name: 'Rank', value: `Sigma Male`, inline: true},
                    {name: 'Hours Played', value: `${fetchPlaceholder(uuid, '%statistic_hours_played%')}`, inline: true},
                    {name: 'First Join', value: `<t:${Math.round(await fetchPlaceholder(uuid, '%player_first_played%') / 1000)}:F>, or <t:${Math.round(await fetchPlaceholder(uuid, '%player_first_played%') / 1000)}:R>`, inline: true},
                    {name: 'Deaths', value: `<t:${fetchPlaceholder(uuid, '%statistic_deaths%')}:F>`, inline: true},
                  )


        const online = new MessageEmbed()
        
        await interaction.reply({embeds: [offline]}) 
          
        

        console.log(`${interaction.user.tag} did /help in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'That username doesnt exist or they havent joined the MC server, or this server doesnt have discordsrv, maybe do /player raw and manually enter in their username.', ephemeral: true })
            console.error(error)
        }
    }
}
