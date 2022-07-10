const {SlashCommandBuilder, SlashCommandStringOption} = require('@discordjs/builders');
const {MessageEmbed, CommandInteractionOptionResolver, Message} = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require('dotenv');
const { botIcon, botUsername } = require('../events/ready');
const { embedColor, scoreboard } = require('../config.json')
dotenv.config();

module.exports = {
	name: 'messageCreate',
	async execute(msg) {
		const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle(msg.author.tag)
      .setDescription(msg.content)
      .setThumbnail(msg.author.displayAvatarURL());
    const channel = await msg.guild?.channels.fetch(msg.channel.id);

    if (
      channel?.parentId === "980874346501402684" &&
      msg.guildId === "761670547196739635"
    ) {
      const sendChannel = await msg.guild?.channels
        .fetch("980829413463703612")
        .then((channel) => {
          if (channel?.type === "GUILD_NEWS") {
            channel.send({ embeds: [embed] });
          }
        });

      if (msg.attachments) {
        const sendChannel = await msg.guild?.channels
          .fetch("980829413463703612")
          .then((channel) => {
            if (channel?.type === "GUILD_NEWS") {
              msg.attachments.map((attch) => {
                //const attachment = new MessageAttachment(attch, "Epiuc!!!");
                channel.send({ files: [attch] });
              });
            }
          });
      }

      if (msg.embeds) {
        const sendChannel = await msg.guild?.channels
          .fetch("980829413463703612")
          .then((channel) => {
            if (channel?.type === "GUILD_NEWS") {
              msg.embeds.map((embed) => channel.send({ embeds: [embed] }));
            }
          });
      }
    }
	},
};
 