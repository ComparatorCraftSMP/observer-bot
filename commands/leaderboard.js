const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
dotenv.config();
const { embedColor } = require('../config.json')


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
        
        try {
        const stat = interaction.options.getString('stat')  
        const statRe = /^[^_]+_/g
        const statName = stat.replace(statRe, '')
       
        const options = {
            method: 'GET',
            headers: {Accept: 'application/json', 'key': `${process.env.API}`}
          }

        const response = await fetch(`${process.env.SERVER}/v1/scoreboard/${stat}`, options)
        const data = await response.json()
        const leaderboard = data.scores.sort((a, b) => b.value - a.value).slice(0, 10)

       
        const embed = new MessageEmbed()
                  .setColor(`#00a3ff`)
                  .setTitle(`Statistic Name`)
                  .setDescription(`Top 10 people in ${statName}`)
                  .addFields(
                    {
                        "name": "Rank",
                        "value": "#1\n#2\n#3\n#4\n#5\n#6\n#7\n#8\n#9\n#10",
                        "inline": true
                    },
                    {
                        "name": "Player",
                        "value": `${leaderboard[0].entry}\n${leaderboard[1].entry}\n${leaderboard[2].entry}\n${leaderboard[3].entry}\n${leaderboard[4].entry}\n${leaderboard[5].entry}\n${leaderboard[6].entry}\n${leaderboard[7].entry}\n${leaderboard[8].entry}\n${leaderboard[9].entry}\n`,
                        "inline": true
                    },
                    {
                        "name": "Value",
                        "value": `${leaderboard[0].value}\n${leaderboard[1].value}\n${leaderboard[2].value}\n${leaderboard[3].value}\n${leaderboard[4].value}\n${leaderboard[5].value}\n${leaderboard[6].value}\n${leaderboard[7].value}\n${leaderboard[8].value}\n${leaderboard[9].value}\n`,
                        "inline": true
                    }
                  )
                  
        
       await interaction.reply({embeds: [embed]}) 
       // interaction.reply('check console')
       console.log(`${JSON.stringify(embedColor)}`)
       console.log(`${interaction.user.tag} checked the leaderboard for the stat in ${interaction.channel.name} in guild ${interaction.guild.name}`) 
        } catch(err) {
            console.error(err)
        }   
    }
}