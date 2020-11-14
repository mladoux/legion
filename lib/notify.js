var canSpeak = false;

var nickserv = function(bot, config, text) {
    switch(text) {
        case 'This nickname is registered. Please choose a different nickname, or identify via /msg NickServ identify <password>.':
            console.log('[NICKSERV] Sending credentials.');
            bot.say('NickServ', 'IDENTIFY ' + config.password);
        break;
        case 'You are now identified for ' + config.botName + '.':
            console.log('[NICKSERV] Authentication successful!');
        break;
        case 'Invalid password for ' + config.botName + '.':
            console.log('[NICKSERV] Authentication Failure!');
            console.log('[STATE] Shutting down!');
            bot.disconnect();
            process.exit(1);
    }
};

var parse = function(bot, config, state, from, to, text, message) {

    // Quick fix, just in case to is not a channel
    try {
        canSpeak = state.canSpeak(to);
    } catch (error) {
        canSpeak = false;
    }
    
    if (to == config.botName && from == 'NickServ') {
        nickserv(bot, config, text);
    }
};

module.exports.parse = parse;
