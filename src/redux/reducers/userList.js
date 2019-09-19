import * as types from "../action-creator/actionTypes";

const inistate = {
    isLoading : false,
    users: [],
    error: null,
    searchUsers: [],
    isSearching: false,
    pageLength: 5,
    curPage: 1,
    startIndex: 0,
    count: 0,
    pageNumber: [],
    pageOfUsers: []    
};

const userList = (state = inistate, action ) => {
    switch (action.type) {
            //Get User List
            case types.GET_USERS_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        
            case types.GET_USERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.data,
                error: null
            };
        
            case types.GET_USERS_ERROR: 
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        
            //Create New User
            case types.CREATE_USER_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        
            case types.CREATE_USER_SUCCESS:
            const totalPages = Math.ceil(state.count / state.pageLength);
            let newPage = totalPages;
            const curPageUserNumber = state.count - (totalPages - 1) * (state.pageLength);
            if (curPageUserNumber.length === state.pageLength) {
                newPage += 1;
            }
            return {
                ...state,
                isLoading: false,
                pageOfUsers: [...state.pageOfUsers, 
                action.user],
                error: null,
                curPage: newPage
            };
        
            case types.CREATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };            
        
            //Update user
            case types.UPDATE_USER_START:
            return {
                ...state,
                isLoading: true
            };
            case types.UPDATE_USER_SUCCESS:
            {
               let updatedUser = state.pageOfUsers.map(user => {
                if (user._id === action.id) {
                    return action.user;
                }
                else {
                    return user;
                }
               });
               return {
                ...state,
                isLoading: false,
                pageOfUsers: updatedUser
               };  
           }
        case types.UPDATE_USER_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        
        // Delete User
        case types.DELETE_USER_START:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case  types.DELETE_USER_SUCCESS: 
         {
             let index = state.pageOfUsers.findIndex((item) => item._id === action.id);
                 let newCurPage = state.curPage;
                 if (state.pageOfUsers.length === 1) {
                     newCurPage -= 1;
                 }
                 return {
                     ...state,
                     curPage: newCurPage,
                     pageOfUsers: [...state.pageOfUsers.slice(0, index),
                     ...state.pageOfUsers.slice(index + 1)               
                    ],
                    isLoading: false,
                    count: state.count - 1,
                    error: null
                 };
         }
        case types.DELETE_USER_ERROR: 
            return {
                ...state,
                isLoading: false,
                error: action.error
            }; 
            
        //Search Users
        case types.SEARCH_START:
            return {
                ...state,
                isLoading: true
            }; 
        case types.SEARCH_SUCCESS:
                return {
               ...state,
               isSearching: true,
               isLoading: false,
               searchUsers: action.users
            };
        case types.SEARCH_ERROR:
            return {
                ...state,
                isSearching: false,
                isLoading: false,
                error: action.error
            };
        
        //Sort Users
        case types.USER_SORT:
            {
                const userToSort = [...state.pageOfUsers];
                const keyword = action.keyword;
                userToSort.sort((user1, user2) => {
                    if (typeof(user1[keyword]) === 'number') {
                        if (user1[keyword] === user2[keyword]) {
                            return 0;
                        }
                        return user1[keyword] < user2[keyword] ? -1 : 1;
                    }
                    return user1[keyword].toLowerCase().localeCompare(user2[keyword].toLowerCase());
                });
                return {
                   ...state,
                   pageOfUsers: userToSort 
                };
            }

            //Fetch Page
        case types.FETCH_PAGE_START: 
        return {
            ...state,
            isLoading: true
        };

        case types.FETCH_PAGE_SUCCESS: 
        {   
            const length = state.pageLength;
            const startIndex = (action.page - 1) * length;
            return {
                ...state,
                pageOfUsers: action.pageOfUsers,
                isLoading: false,
                error: null,
                curPage: action.page,
                startIndex: startIndex,
                pageLength: action.pageLength
            };
        };
        case types.FETCH_PAGE_ERROR: 
        return {
            ...state,
            isLoading: false,
            error: action.error
        };

        //Count Page
        case types.COUNT_PAGE_START:
            return {
                ...state,
                isLoading: true
            };
        case types.COUNT_PAGE_SUCCESS:
            return {
                ...state,
                count: action.count,
                isLoading: false,
                error: null
            };
        case types.COUNT_PAGE_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };        
        default:
            return state;
    }
};
export default userList;

