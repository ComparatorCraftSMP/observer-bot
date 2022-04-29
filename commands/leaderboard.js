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
        const leaderboard = data.scores.sort((a, b) => b.value - a.value).slice(0, 15)
        let userIGN = ''
        userIGN = Object.values(leaderboard).map(ign => ign.entry).join('\n')
        let score = ''
        score = Object.values(leaderboard).map(score => score.value).join('\n')
       
        const embed = new MessageEmbed()
                  .setColor(`#00a3ff`)
                  .setTitle(`Statistic Name`)
                  .setDescription(`Top 15 people in ${statName}`)
                  .addFields(
                    {
                        "name": "Rank",
                        "value": "`#1\n#2\n#3\n#4\n#5\n#6\n#7\n#8\n#9\n#10\n#11\n#12\n#13\n#14\n#15`",
                        "inline": true
                    },
                    {
                        "name": "Player",
                        "value": `\`${userIGN}\``,
                        "inline": true
                    },
                    {
                        "name": "Value",
                        "value": `\`${score}\``,
                        "inline": true
                    }
                  )
                  
        
       await interaction.reply({embeds: [embed]}) 
       // interaction.reply('check console')
       console.log(`${JSON.stringify(embedColor)}`)
       console.log(`${interaction.user.tag} checked the leaderboard for the stat ${stat} in ${interaction.channel.name} in guild ${interaction.guild.name}`) 
        } catch(err) {
            console.error(err)
            await interaction.reply({ content: 'This stat doesn\'t exist on the server.', ephemeral: true })
        }   
    }
}