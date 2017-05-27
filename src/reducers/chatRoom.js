export const ON_MESSAGE_CHANGE = "chat/ON_MESSAGE_CHANGE";
export const NEW_MESSAGE = "chat/NEW_MESSAGE";
export const SET_ACTIVE_BOT = "chat/SET_ACTIVE_BOT";
export const ACTIVE_BOT_REPLY = "chat/ACTIVE_BOT_REPLY";
export const ON_APPEND_MESSAGE = "chat/ON_APPEND_MESSAGE";

const initialState = {
    lastInput: "",
    conversationList: [],
    lastMessage: {},
    activeBot: false
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ON_MESSAGE_CHANGE:
            return {
                ...state,
                lastInput: action.lastInput
            };
        case ON_APPEND_MESSAGE:
            return {
                ...state,
                lastInput: `${state.lastInput} ${action.message}`
            }
        case NEW_MESSAGE:
            const { sender, message, isBot } = action;
            const lastMessage = {sender, message};

            return {
                ...state,
                lastMessage,
                lastInput: isBot ? state.lastInput : "",    // If bot, don't clean the input.
                conversationList: state.conversationList.concat(lastMessage)
            }
        case SET_ACTIVE_BOT:
            return {
                ...state,
                activeBot: action.activeBot
            }
        case ACTIVE_BOT_REPLY:
            const { answers } = state.activeBot;
            const { userName } = action;

            // If run of answers, set the activeBot to false
            if (!answers || answers.length === 0) {
                return {
                    ...state,
                    activeBot: false
                };
            }

            // Replace the {userName} with real user name.
            const answer = answers[0].message.replace(/{userName}/g, userName);
            const botMessage = {
                sender: state.activeBot.fullName,
                message: answer
            };

            return {
                ...state,
                activeBot: {
                    ...state.activeBot,
                    answers: answers.slice(1)   // Remove the first answer.
                },
                conversationList: state.conversationList.concat(botMessage)
            }
        default:
            return state;
    }
};

export const onMessageChange = (lastInput) => {
    return {
        lastInput,
        type: ON_MESSAGE_CHANGE
    };
};

export const appendMessage = (message) => {
    return {
        message,
        type: ON_APPEND_MESSAGE
    };
};

export const sendMessage = (sender, message, isBot) => {
    return {
        sender,
        message,
        isBot,
        type: NEW_MESSAGE
    };
};

export const setActiveBot = (activeBot) => {
    return {
        activeBot,
        type: SET_ACTIVE_BOT
    };
};

export const activeBotReply = (to) => {
    return {
        userName: to,
        type: ACTIVE_BOT_REPLY
    };
};
