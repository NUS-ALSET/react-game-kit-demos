export const fillCommonData = (data) => {
    return {
        type: "FILL_COMMON_GAME_DATA",
        payload: data
    }
};
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
export const updateBotPosition = (data) => {
    return {
        type: "UPDATE_BOT_POSITION",
        payload: data
    }
};
export const updatePlayerPosition = (data) => {
    return {
        type: "UPDATE_PLAYER_POSITION",
        payload: data
    }
};
export const updateBotCollectedObjects = (data) => {
    return {
        type: "UPDATE_BOT_COLLECTED_OBJECTS",
        payload: data
    }
};
export const updatePlayerCollectedObjects = (data) => {
    return {
        type: "UPDATE_PLAYER_COLLECTED_OBJECTS",
        payload: data
    }
};
export const updateBotScore = (data) => {
    return {
        type: "UPDATE_BOT_COLLECTED_OBJECTS",
        payload: data
    }
};
export const updatePlayerScore = (data) => {
    return {
        type: "UPDATE_PLAYER_COLLECTED_OBJECTS",
        payload: data
    }
};
export const updateGameState = (data) => {
    return {
        type: "UPDATE_GAME_STATE",
        payload: data
    }
};