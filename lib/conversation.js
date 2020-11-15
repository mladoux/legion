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

var parse = function(bot, state, config, nick, to, text, message) {
    permissions(state, to);
}

module.exports.parse = parse;
