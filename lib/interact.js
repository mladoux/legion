var canSpeak = false;

var parse = function (bot, config, state, from, to, text){

    // Quick fix, just in case to is not a channel
    try {
        canSpeak = state.canSpeak(to);
    } catch (error) {
        canSpeak = false;
    }

    args = text.split(' ');

    message = '';

    // One-line reaction triggers
    switch (args[0]) {
        case 'hugs':
            message = 'hugs ' + from + '!';
        break;
    }

    if (message != '') {
        if (canSpeak) {
            bot.action(to, message);
        } else {
            bot.action(from, message);
        }
    }
};

module.exports.parse = parse;
