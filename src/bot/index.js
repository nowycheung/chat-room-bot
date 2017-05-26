import { BOT_ANSWERS, BOT_NAMES } from "./config.js";

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
