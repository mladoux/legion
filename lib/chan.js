var canSpeak = false;
var canVoice = false;

var permissions = function(state, channel) {
    try {
        canSpeak = state.canSpeak(channel);
    } catch (error) {
        canSpeak = false;
    }
    try {
        canVoice = state.canVoice(channel);
    } catch (error) {
        canVoice = false;
    }
}

var parseJoin = function (
    bot, 
    state, 
    config, 
    channel, 
    nick, 
    message
) {
    
    // Get bot permissions
    permissions(state, channel);

    // Bot joins
    if(nick == config.botName) {
        state.addChannel(channel);
    } else if (state.canVoice(channel)) {
        bot.send('MODE', channel, '+v', nick);
        bot.say(channel, "Hello, " + nick);
    }

}

var parseKick = function(
    bot,
    state,
    config,
    channel,
    nick,
    by,
    reason,
    message
){

    // get bot permissions
    permissions(state, channel);

    // rejoin on kick
    if(nick == config.botName) {
        console.log('[STATE] kicked from ', channel, 'by', by);
        bot.join(channel);
    }

}

var parsePart = function(
    bot, 
    state, 
    config, 
    channel, 
    nick, 
    reason, 
    message
){
    permissions(state,channel);
}

module.exports.parseJoin = parseJoin;
module.exports.parseKick = parseKick;
module.exports.parsePart = parsePart;
