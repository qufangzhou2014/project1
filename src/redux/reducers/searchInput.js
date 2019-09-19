import * as types from '../action-creator/actionTypes';
const iniState = {
    isSearching: false,
    searchInput: ""
}
const searchInput = (state = iniState, action) => {
    switch(action.type) {
        case types.SEARCH_INPUT_CHANGE: 
        let isSearching = action.input.length === 0 ? false : true;
        return {
            isSearching: isSearching,
            searchInput: action.input
        };
        default: return state;
    }
};

export default searchInput;