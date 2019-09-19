import * as types from '../action-creator/actionTypes';
const redirect = (state = false, action) => {
    switch(action.type) {
        case types.REDIRECT:
            return true;
        case types.REDIRECT_RESET:
            return false;
        default: return state;
    } 
};

export default redirect;