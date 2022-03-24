const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('This command shows the top 10 scores for the selected stat')
        .addStringOption(option => option.setName('stat')
            .setDescription('your statistic')
            .setRequired(true)
            .addChoice('MineEmeralds', 'ts_MineEmerald')
            .addChoice('UseTotem', 'ts_UseTotem')
            .addChoice('Deaths', 'ts_Deaths')
            .addChoice('DamageDealt', 'ts_DamageDealt')
            .addChoice('playTime', 'hc_playTime')
            .addChoice('Walk', 'ts_Walk')
            .addChoice('MineRedstone', 'ts_MineRedstone')
            .addChoice('KillEDragon', 'ts_KillEDragon')
            .addChoice('DamageTaken', 'ts_DamageTaken')
            .addChoice('TotalOresMined', 'hc_MineOreShow')
            .addChoice('MineCoal', 'ts_MineCoal')
            .addChoice('elytraKm', 'hc_elytraKm')
            .addChoice('MineQuartz', 'ts_MineQuartz')
            .addChoice('PlayerKills', 'ts_PlayerKills')
            .addChoice('Sprint', 'ts_Sprint')
            .addChoice('Sneak', 'ts_Sneak')
            .addChoice('swimKm', 'hc_swimKm')
            .addChoice('MineDEmerald', 'hc_MineDEmerald')
            .addChoice('MobKills', 'ts_MobKills')
            .addChoice('Swim', 'ts_Swim')
            .addChoice('Jump', 'ts_Jump')
            .addChoice('KillWither', 'ts_KillWither')
            .addChoice('MineDiamond', 'ts_MineDiamond')
            .addChoice('MineNetherite', 'ts_MineNetherite')
            .addChoice('LastDeath', 'ts_LastDeath')
            ),
    
    async execute(interaction) {
        
        
        const stat = interaction.options.getString('stat')  
        const statRe = /^[^_]+_/g
        const statName = stat.replace(statRe, '')
       
        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', 'key': `${process.env.API}`}
          }

        const response = await fetch(`${process.env.SERVER}/v1/scoreboard/${stat}`, options)
        const data = await response.json()
        const statObj = data.scores.find(x => x.entry === userIGN)

        const embed = new MessageEmbed()
                  .setColor('#6beb34')
                  .setTitle(`Player stats of ${userIGN}`)
                  .setDescription(`${statName}: ${statObj.value}`)
                  .setThumbnail(`https://minotar.net/armor/bust/${userIGN}/100.png`)

        // interaction.reply({embeds: [embed]}) 
          
        console.log(`epic working`)

       console.log(`${interaction.user.tag} checked the stats of ${interaction.getUserOption('player').guildMember.tag} in ${interaction.channel.name} in guild ${interaction.guild.name}`)    
    }
}