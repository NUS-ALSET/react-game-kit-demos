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