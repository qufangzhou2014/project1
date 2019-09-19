import * as types from '../action-creator/actionTypes';
const iniState = {
    curPage: 1
};
const pageStatus = (state = iniState, action) => {
    switch(action.type) {
        case types.SET_CURPAGE_STATUS:
            return {
                ...state,
                curPage: action.curPage
            };
        default: return state;
    }
};

export default pageStatus;