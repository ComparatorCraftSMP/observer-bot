const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
dotenv.config();




module.exports = {
    data: new SlashCommandBuilder()
        .setName('markeradd')
        .setDescription('add a marker to the dynmap')
        .addStringOption(option => option.setName('name').setDescription('the name of the dynmap marker'))
        .addStringOption(option => option.setName('category').setDescription('category the marker is in').addChoice('Nether Portal', 'Nether Portals').addChoice('Shop', 'shops').addChoice('Base', 'Bases'))
        .addStringOption(option => option.setName('icon').setDescription('this is the icon that the marker will have'))
        .addIntegerOption(option => option.setName('x').setDescription('x coordiante of the dynmap marker'))
        .addIntegerOption(option => option.setName('y').setDescription('y coordiante of the dynmap marker'))
        .addIntegerOption(option => option.setName('z').setDescription('z coordiante of the dynmap marker'))
        .addStringOption(option => option.setName('dimension').setDescription('the dimension this marker is in').addChoice('Overworld', 'world').addChoice('Nether', 'world_nether')),
    
    async execute(interaction) {

        //command should look something like this 
        //command=dmarker%20add%20set%3ABases%20label%3Afart%20x%3A0%20y%3A64%20z%3A0%20icon%3Aemerald%20world%3Aworld

        const options = {
            body: `command=dmarker%20add%20set%3A${interaction.options.getString('category')}%20label%3A%22${interaction.options.getString('name')}%22%20x%3A${interaction.options.getInteger('x')}%20y%3A${interaction.options.getInteger('y')}%20z%3A${interaction.options.getInteger('z')}%20icon%3A${interaction.options.getString('icon')}%20world%3A${interaction.options.getString('dimension')}`,
            method: 'POST',
            headers: {accept: '*/*', 'key': `${process.env.API}`, 'Content-Type': 'application/x-www-form-urlencoded'}
          }

        const response = await fetch(`${process.env.SERVER}/v1/server/exec`, options)
        //const data = await response.json()
        
        
        
        
        const embed = new MessageEmbed()
                  .setColor('#6beb34')
                  .setTitle(`Added dynmap marker`)
                  .setDescription(`View your marker here: https://map.comparatorcraftsmp.net/#${interaction.options.getString('dimension')};flat;${interaction.options.getInteger('x')},64,${interaction.options.getInteger('z')};7`)
        
        interaction.reply({embeds: [embed]}) 
          
        console.log(`${interaction.user.tag} added a dynmap marker in channel ${interaction.channel.name} in guild ${interaction.guild.name} \n 
        Marker name:${interaction.options.getString('name')} \n 
        Marker Set: ${interaction.options.getString('category')} \n 
        View it here: https://map.comparatorcraftsmp.net/#${interaction.options.getString('dimension')};flat;${interaction.options.getInteger('x')},64,${interaction.options.getInteger('z')};7 `)  
       
    }
}