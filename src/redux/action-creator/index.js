import axios from "axios";
import * as types from "./actionTypes";

//Get All Users
const getUsersStart = () => {
    return {
        type: types.GET_USERS_START
    };
};

const getUsersSuccess = (res) => {
    return {
        type: types.GET_USERS_SUCCESS,
        data: res
    };
};

const getUsersError = (err) => {
    return {
        type: types.GET_USERS_ERROR,
        err
    };
};

export const getAllUsers = () => {
    return (dispatch) => {
        dispatch(getUsersStart());
        axios.get('http://localhost:8080/api/', getAllUsers)
        .then((res) => {
            console.log(res);
            dispatch(getUsersSuccess(res.data.users));
        })
        .catch((err) => {
            dispatch(getUsersError(err));
        });
    };
};

//Create One User
const createUserStart = () => {
    return {
        type: types.CREATE_USER_START
    };
};

const createUserSuccess = (user) => {
    return {
        type: types.CREATE_USER_SUCCESS,
        user
    };
};

const createUserError = (error) => {
    return {
        type: types.CREATE_USER_ERROR,
        error
    };
};

export const createUser = (userData) => {
    return (dispatch) => {
        dispatch(createUserStart());
        axios({
            method:'POST',
            url: "http://localhost:8080/api/users",
            data: userData
        })
        .then(response => {
            console.log(response.data);
            dispatch(createUserSuccess(response.data.newUser));
        })
        .catch(error => {
            console.log(error);
            dispatch(createUserError(error));
        });
    };
};

//Update One User
const updateUserStart = () => {
    return {
        type: types.UPDATE_USER_START
    };
};

const updateUserSuccess = (id, user) => {
    return {
        type: types.UPDATE_USER_SUCCESS,
        id,
        user
    };
};

const updateUserError = (error) => {
    return {
        type: types.UPDATE_USER_ERROR,
        error
    };
};

export const updateUser = (userId, userData) => {
    return (dispatch) => {
        dispatch(updateUserStart());
        axios.put(`http://localhost:8080/api/users/${userId}`, userData)
        .then(res => {
            console.log(res.data);
            dispatch(updateUserSuccess(userId, userData));
        })
        .catch(error => {
            console.log(error);
            dispatch(updateUserError(error));
        });
    };
};

//Delete One User
const deleteUserStart = () => {
    return {
        type: types.DELETE_USER_START
    };
};

const deleteUserSuccess = (id) => {
    return {
        type: types.DELETE_USER_SUCCESS,
        id
    };
};

const deleteUserError = (error) => {
    return {
        type: types.DELETE_USER_ERROR,
        error
    };
};

export const deleteUser = (userId, deleteUser) => {
    return (dispatch) => {
        dispatch(deleteUserStart());
        axios.delete(`http://localhost:8080/api/users/${userId}`, deleteUser)
        .then(res => {
            console.log(res.data);
            dispatch(deleteUserSuccess(userId));
            dispatch(fetchPage(this.props.curPage, 5));
            console.log('delete user success');
        })
        .catch(error => {
            console.log(error);
            dispatch(deleteUserError(error));
        });
    };
};

//Search Users
const searchStart = () => {
    return {
        type: types.SEARCH_START
    };
};

const searchSuccess = (users) => {
    return {
        type: types.SEARCH_SUCCESS,
        users
    };
};

const searchError = (error) => {
    return{
    type: types.SEARCH_ERROR,
    error
    };
};

export const searchInputChange = (input) => {
    return {
        type: types.SEARCH_INPUT_CHANGE,
        input
    };
};

export const searchUsers = (keyword) => {
    return (dispatch) => {
    dispatch(searchStart());
    axios.get(`http://localhost:8080/api/search/${keyword}`)
    .then(response => {
        console.log(response);
        console.log(`keyword is ${keyword}`);
        dispatch(searchSuccess(response.data));
    })
    .catch(error => {
        console.log(error);
        dispatch(searchError(error));
    });    
    };
};


//Sort Users
export const sortUsers = (keyword) => {
    return {
        type: types.USER_SORT,
        keyword
    };
};

//Fetch page after pagination
const fetchPageStart = () => {
    return {
        type: types.FETCH_PAGE_START
    };
};

const fetchPageSuccess = (page, pageLength, pageOfUsers) => {
    return{
        type: types.FETCH_PAGE_SUCCESS,
        page,
        pageLength,
        pageOfUsers
    };
};

const fetchPageError = (error) => {
    return {
        type: types.FETCH_PAGE_ERROR,
        error
    };
};

export const fetchPage = (page, length) => {
    const start = (page - 1) * length;
    return (dispatch) => {
        dispatch(fetchPageStart());
        axios.get(`http://localhost:8080/api/range/${start}/${length}`)
        .then(response => {
            console.log(response.data);        
            dispatch(fetchPageSuccess(page, length, response.data));
        })
        .catch(error => {
            console.log(error);
            dispatch(fetchPageError(error));
        });
    }
};


//Redirect Page
export const redirect = () => {
    return {
        type: types.REDIRECT
    };
};

export const redirectReset = () => {
    return {
        type: types.REDIRECT_RESET
    };
};

//Count page
const countPageStart = () => {
    return {
        type: types.COUNT_PAGE_START
    };
};

const countPageSuccess = (count) => {
    return {
        type: types.COUNT_PAGE_SUCCESS,
        count
    };
};

const countPageError = (error) => {
    return {
        type: types.COUNT_PAGE_ERROR,
        error
    };
};

export const countPage = () => {
    return (dispatch) => {
        dispatch(countPageStart());
        axios
        .get('http://localhost:8080/api/count')
        .then(response => {
            const count = parseInt(response.data.count);
            console.log(count);
            dispatch(countPageSuccess(count));
        })
        .catch((error) => {
            console.log(error);
            dispatch(countPageError(error));
        });       
    }
};

//Set Page Status
export const setPageStatus = (curPage) => {
    return {
        type: types.SET_CURPAGE_STATUS,
        curPage
    };
}
