const {
  SlashCommandBuilder,
  SlashCommandStringOption,
  ContextMenuCommandBuilder,
} = require("@discordjs/builders");
const {
  MessageEmbed,
  CommandInteractionOptionResolver,
  Message,
  Client,
  ClientUser,
  Guild,
} = require("discord.js");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const dotenv = require("dotenv");
const { botIcon, botUsername } = require("../events/ready");
const { embedColor, scoreboard, application } = require("../config.json");

dotenv.config();

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("Accept Application")
    .setType(3),

  async execute(interaction) {
    const msg = await interaction.targetMessage;
    const cmdUser = await interaction.member;
    const applicant = await interaction.targetMessage.member;
    try {
      if (msg.channel.parentId === application.ticket_category) {
        if (
          cmdUser.roles.cache.find(
            (role) => role.id === application.staff_role
          ) ||
          cmdUser.permissions.has("MANAGE_ROLES")
        ) {
          if (applicant.user.bot) {
            await interaction.reply({
              content:
                "This is a bot, please run this command on the application not a bot message",
              ephemeral: true,
            });
          }
          applicant.roles.add(application.member_role);
          applicant.roles.remove(application.applicant_role);
          await msg.reply({ content: `${application.message}` });
          await interaction.reply({ content: "Message sent", ephemeral: true });
        } else {
          await interaction.reply({
            content: "You dont have permission to send this command",
            ephemeral: true,
          });
        }
      } else {
        await interaction.reply({
          content: "This isn't an application",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
