module.exports = {
    name: 'messageCreate',
    execute(msg) {
        if (msg.content === 'troll') {
            msg.reply('https://tenor.com/view/troll-pilled-gif-19289988')
        }
    }
}