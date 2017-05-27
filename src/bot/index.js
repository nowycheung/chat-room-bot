import { BOT_ANSWERS, BOT_NAMES, RANDOM_TALK } from "./config.js";

const randomNumber = (min,max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
    Return "online", "away" or "playing".
    Probality 50% online, 25% away, 25% playing.
*/
const getBotStatus = () => {
    return Math.ceil(Math.random() * 10) % 2 !== 0 ? "online" : Math.ceil(Math.random() * 10) > 5 ? "away" : "playing";
}

/**
    Return answer based on the status.
*/
const getBotAnswers = (status) => BOT_ANSWERS[status];

/**
    Return bot list  
*/
export const generateBot = () => {
    return BOT_NAMES.map((bot) => {
        const { fullName, id } = bot;
        const status = getBotStatus();
        return {
            fullName,
            id,
            status,
            avatarLink: `https://robohash.org/${fullName}.png`,
            answers: getBotAnswers(status)
        }
    }).sort(({status}) => {
        // Put the online bot on the top
        return status === "online" ? 0 : 1;
    })
}

export const getRandomTalkBot =(botList) => {
    const onlineBotIndex = botList.map((bot, index) => bot.status === "online" ? index : false);

    if (onlineBotIndex.length > 0) {
        const selectedBotIndex = randomNumber(0, onlineBotIndex.length - 1);
        const selectedTalkIndex = randomNumber(0, RANDOM_TALK.length - 1);
        const sender = botList[selectedBotIndex].fullName;
        const message = RANDOM_TALK[selectedTalkIndex];

        return {
            sender,
            message
        };
    }
}