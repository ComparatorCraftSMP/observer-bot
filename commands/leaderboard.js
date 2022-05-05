const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
dotenv.config();
const { embedColor, scoreboard } = require('../config.json')



module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('This command shows the top 10 scores for the selected stat')
        .addStringOption(option => option.setName('stat')
            .setDescription('your statistic')
            .setRequired(true)
            .addChoices([scoreboard[0]])
            .addChoices([scoreboard[1]])
            .addChoices([scoreboard[2]])
            .addChoices([scoreboard[3]])
            .addChoices([scoreboard[4]])
            .addChoices([scoreboard[5]])
            .addChoices([scoreboard[6]])
            .addChoices([scoreboard[7]])
            .addChoices([scoreboard[8]])
            .addChoices([scoreboard[9]])
            .addChoices([scoreboard[10]])
            .addChoices([scoreboard[11]])
            .addChoices([scoreboard[12]])
            .addChoices([scoreboard[13]])
            .addChoices([scoreboard[14]])
            .addChoices([scoreboard[15]])
            .addChoices([scoreboard[16]])
            .addChoices([scoreboard[17]])
            .addChoices([scoreboard[18]])
            .addChoices([scoreboard[19]])
            .addChoices([scoreboard[20]])
            .addChoices([scoreboard[21]])
            .addChoices([scoreboard[22]])
            .addChoices([scoreboard[23]])
            .addChoices([scoreboard[24]])
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