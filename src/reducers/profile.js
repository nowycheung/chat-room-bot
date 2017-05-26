import { generateBot } from '../bot'

export const ON_LOGIN = "chat/ON_LOGIN";
export const ON_LOGOUT = "chat/ON_LOGOUT";
export const REFRESH_BOT = "chat/REFRESH_BOT";

const initialState = {
    name: "",
    botList: generateBot()
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case ON_LOGIN:
            return {
                ...state,
                name: action.name,
                botList: generateBot()
            };
        case ON_LOGOUT:
            return {
                ...state,
                name: ""
            };
        case REFRESH_BOT:
            return {
                ...state,
                botList: generateBot()
            };
        default:
            return state;
    }
};

export const login = (name) => {
    return {
        name,
        type: ON_LOGIN
    };
};

export const logout = () => {
    return {
        type: ON_LOGOUT
    };
};

export const refreshBot = () => {
    return {
        type: REFRESH_BOT
    };
};