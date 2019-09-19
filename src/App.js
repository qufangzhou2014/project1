import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {connect} from "react-redux";
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import CreateUser from "./component/createUser";
import HomePage from './component/Homepage';
import EditUser from './component/editUser';
import { deleteUser, getAllUsers , createUser, updateUser, sortUsers, searchUsers, searchInputChange,countPage,redirect,redirectReset} from './redux/action-creator';


class App extends React.Component{
    getUser = (_id) => {
        console.log('get Edit User is called');
        const users = this.props.pageOfUsers;
        for (let user of users) {
            if (user._id === _id) {
                return user;
            }
        } 
    }
    render() {
        return(
        <BrowserRouter>
        <Switch>
            <Route exact = {true} 
            path = '/' 
            render = {() => 
            <HomePage 
            isLoading = {this.props.isLoading}
            pageOfUsers = {this.props.pageOfUsers}
            getAllUsers = {this.props.getAllUsers}
            deleteUser = {this.props.deleteUser}
            sortUsers = {this.props.sortUsers}
            search = {this.props.search}
            searchUsers = {this.props.searchUsers}
            searchInput = {this.props.searchInput}
            searchChange = {this.props.searchInputChange}
            isSearching = {this.props.isSearching}
            countPage = {this.props.countPage}
            users = {this.props.users}
            curPage = {this.props.curPage}
            redirectReset = {this.props.redirectReset}
            />
            }>    
            </Route>
            <Route 
            exact= {true}
            path = '/users'  render = {() =>
                <CreateUser
                createUser = {this.props.createUser}
                redirectToHome = {this.props.redirectToHome}
                isLoading = {this.props.isLoading}
                redirect = {this.props.redirect}
                />
            }> 
            </Route>
            <Route path = '/users/:user_id' render = {({match}) => {
                return (
                    <EditUser
                    isLoading = {this.props.isLoading}
                    id = {match.params.user_id}
                    users = {this.props.users}
                    editUser = {this.props.editUser}
                    getUsers = {this.props.getUsers}
                    getUser = {this.getUser}
                    redirectToHome = {this.props.redirectToHome}
                    redirect = {this.props.redirect}
                    />
                );
            }}></Route>
        </Switch>
        </BrowserRouter>
        );
    };
};



const mapStateToProps = (state) =>{
    return {
        isLoading: state.userList.isLoading,
        isSearching: state.searchInput.isSearching,
        searchInput: state.searchInput.searchInput,
        searchUsers: state.userList.searchUsers,
        pageOfUsers: state.userList.pageOfUsers,
        pageStatus: state.pageStatus,
        curPage: state.userList.curPage,
        users: state.userList.users,
        pageNumber: state.userList.pageNumber,
        redirect: state.redirect
        };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (userData) => {
            dispatch(createUser(userData));
        },
        editUser: (id, user) => {
            dispatch(updateUser(id, user));
        },
        deleteUser: (_id) => {
            dispatch(deleteUser(_id));
        },
        getAllUsers: () => {
            dispatch(getAllUsers());
        },
        search: (keyword) => {
            dispatch(searchUsers(keyword));
        },
        searchInputChange: (input) => {
            dispatch(searchInputChange(input));
        },
        sortUsers: (column) => {
            dispatch(sortUsers(column));
        },
        countPage: () => {
            dispatch(countPage())
        },
        redirectToHome: () => {
            dispatch(redirect());    
        },
        redirectReset: () => {
            dispatch(redirectReset());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
