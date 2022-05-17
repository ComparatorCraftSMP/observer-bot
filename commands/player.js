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
        .addUserOption(option => option.setName('username').setDescription('the minecraft'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('raw')
                .setDescription('Shows information about a player if they are not linked')
                .addStringOption(option => option.setName('user').setDescription('Their minecraft username'))),
    
    async execute(interaction) {

        
    try {
        const username = interaction.options.getMember('username')
        const ign = username.displayName

        const options = {
            method: 'GET'
          }
    
        const response = await fetch(`https://playerdb.co/api/player/minecraft/${ign}`, options)

        const info = await response.json()
        const uuid = await info.data.player.id

        if(['minecraft.api_failure'].includes(info.code)){
            throw 'There was an error'
        }

        
        const offline = new MessageEmbed()
                  .setAuthor({name: '🔴 Offline'})
                  .setColor(`${embedColor}`)
                  .setTitle(`Minecraft Information about ${ign}`)
                  .setThumbnail(`https://minotar.net/helm/${ign}/100.png`)
                  .addFields(
                    {name: 'Minecraft Username', value: `${ign}`, inline: true},
                    {name: 'Discord Username', value: `${await fetchPlaceholder(uuid, '%discordsrv_user_tag%')}`, inline: true},
                    {name: 'First Join', value: `<t:${Math.round(await fetchPlaceholder(uuid, '%player_first_played%') / 1000)}:F>, or <t:${Math.round(await fetchPlaceholder(uuid, '%player_first_played%') / 1000)}:R>`, inline: true},
                    {name: 'Last Join', value: `<t:${Math.round(await fetchPlaceholder(uuid, '%player_last_join%') / 1000)}:F>, or <t:${Math.round(await fetchPlaceholder(uuid, '%player_last_join%') / 1000)}:R>`, inline: true},
                  )
        

        const online = new MessageEmbed()
                    .setAuthor({name: '🟢 Online'})
                    .setColor(`${embedColor}`)
                    .setTitle(`Minecraft Information about ${ign}`)
                    .setThumbnail(`https://minotar.net/helm/${ign}/100.png`)
                    .addFields(
                        {name: 'Minecraft Username', value: `${ign}`, inline: true},
                        {name: 'Discord Username', value: `${await fetchPlaceholder(uuid, '%discordsrv_user_tag%')}`, inline: true},
                        {name: 'First Join', value: `<t:${Math.round(await fetchPlaceholder(uuid, '%player_first_played%') / 1000)}:F>, or <t:${Math.round(await fetchPlaceholder(uuid, '%player_first_played%') / 1000)}:R>`, inline: true},
                        {name: 'Last Join', value: `<t:${Math.round(await fetchPlaceholder(uuid, '%player_last_join%') / 1000)}:F>, or <t:${Math.round(await fetchPlaceholder(uuid, '%player_last_join%') / 1000)}:R>`, inline: true},
                      )
         
        const statusOnline = await fetchPlaceholder(uuid, '%player_online%')

        if(statusOnline === 'no'){
            await interaction.reply({embeds: [offline]})
        } else {
            await interaction.reply({embeds: [online]})
        }
        

        console.log(`${interaction.user.tag} did /help in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
        } catch(error) {
            await interaction.reply({ content: 'That username doesnt exist or they havent joined the MC server, or this server doesnt have discordsrv, maybe do /player raw and manually enter in their username.', ephemeral: true })
            console.error(error)
        }
    }
}
