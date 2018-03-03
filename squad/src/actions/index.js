export const fillPlayerData = (data) => {
    return {
        type: "FILL_PLAYER_GAME_DATA",
        payload: data
    }
};
export const fillBotData = (data) => {
    return {
        type: "FILL_BOT_GAME_DATA",
        payload: data
    }
};
export const moveBot = (data) => {
    return {
        type: "MOVE_BOT",
        payload: data
    }
};
export const movePlayer = (data) => {
    return {
        type: "MOVE_PLAYER",
        payload: data
    }
};
export const updatePlayerDirection = (data) => {
    return {
        type: "UPDATE_PLAYER_DIRECTION",
        payload: data
    }
};
export const updatePlayerSpeed = (data) => {
    return {
        type: "UPDATE_PLAYER_SPEED",
        payload: data
    }
};
export const updateBotDirection = (data) => {
    return {
        type: "UPDATE_BOT_DIRECTION",
        payload: data
    }
};
export const updateBotSpeed = (data) => {
    return {
        type: "UPDATE_BOT_SPEED",
        payload: data
    }
};
export const switchPlayer = (data) => {
    return {
        type: "SWITCH_PLAYER",
        payload: data
    }
};
export const generateBotCollectives = (data) => {
    return {
        type: "GENERATE_BOT_COLLECTIVES",
        payload: data
    }
};
export const generatePlayerCollectives = (data) => {
    return {
        type: "GENERATE_PLAYER_COLLECTIVES",
        payload: data
    }
};
export const removePlayerCollective = (data) => {
    return {
        type: "REMOVE_PLAYER_COLLECTIVE",
        payload: data
    }
};
export const removeBotCollective = (data) => {
    return {
        type: "REMOVE_BOT_COLLECTIVE",
        payload: data
    }
};
export const incrementPlayerScore = (data) => {
    return {
        type: "INCREMENT_PLAYER_SCORE",
        payload: data
    }
};
export const incrementBotScore = (data) => {
    return {
        type: "INCREMENT_BOT_SCORE",
        payload: data
    }
};
export const changeGameState = (data) => {
    return {
        type: "CHANGE_GAME_STATE",
        payload: data
    }
};
export const restart = (data) => {
    return {
        type: "RESTART"
    }
};