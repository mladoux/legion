var canSpeak = false;

var version = function(bot, from) {
    var message = 'Legion 1.0.5';
    bot.notice(from, message);
};

var parse = function (bot, config, state, from, to, type, message) {
    
    // Quick fix, just in case to is not a channel
    try {
        canSpeak = state.canSpeak(to);
    } catch (error) {
        canSpeak = false;
    }

    switch(type) {
        case 'VERSION':
            version(bot, from);
        break;
    }
};

module.exports.parse = parse;
