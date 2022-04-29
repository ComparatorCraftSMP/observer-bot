const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
dotenv.config();
const { embedColor } = require('../config.json')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('full_leaderboard')
        .setDescription('This command shows the top 15 scores for any stat on the server')
        .addStringOption(option => option.setName('stat').setDescription('the stat, do /statlist for a list of them')),
    
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
        if(data.status){
           await interaction.reply({ content:'This stat is either invalid or nobody has done this. To see a full list of the stats you can do, do /statlist', ephemeral: true})
        } else {
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
            console.log(`${JSON.stringify(embedColor)}`)
            console.log(`${interaction.user.tag} checked the leaderboard for the stat ${stat} in ${interaction.channel.name} in guild ${interaction.guild.name}`)
        }
           
       
        
       
       // interaction.reply('check console')
        
        } catch(err) {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
            console.error(err)
        }   
    }
}