const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('plugins')
        .setDescription('a list of all the plugins on the server'),
    
    async execute(interaction) {
        
        

        
        try {
            
            console.log( )
        }catch(error) {
            console.log(error)
        }
        
    }
}

