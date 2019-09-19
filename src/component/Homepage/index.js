import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPage, sortUsers, countPage} from '../../redux/action-creator';
import {Link} from 'react-router-dom';
import Pagination from './paginition';
import './index.css';

class HomePage extends Component {
    componentDidMount() {
        console.log("show the curPage in the DidMount function" + this.props.curPage);
        this.props.getAllUsers();
        this.props.dispatch(fetchPage(this.props.curPage, 5));
        this.props.dispatch(countPage());
        this.props.redirectReset();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(this.props.curPage);
        if (this.props.pageOfUsers.length !== prevProps.pageOfUsers.length ) {
            this.props.dispatch(fetchPage(this.props.curPage, 5));
        }
    }

    handleSearch = (e) => {
        this.props.searchChange(e.target.value);
    }

    handleSort = (e, column) => {
        e.preventDefault();
        this.props.dispatch(sortUsers(column));
    }
        render() {
        let displayUsers = [];
        let keyword = this.props.searchInput.searchInput;
        displayUsers = this.props.isSearching === true ? 
        this.props.users.filter(user => {
            for (let key of Object.keys(user)) {
                console.log(key);
                if (key !== "firstname" && key !== "lastname" && key !== "sex" && key !== "age") {
                    continue;
                } 
                if (user[key].includes(keyword)) {
                    return true;
                }
            }
                return false;
        }) : this.props.pageOfUsers;
        if (this.props.isLoading) {
            return <div>Loading....</div>
        }
        else {
            return (
                <div className = 'container'>
                    <h1>User List</h1>
                    <br></br>
                    {/*SEARCH PART*/}
                    <div>
                    <input type = 'search' className = "form-control mr-sm-2 col col-lg-4" aria-label = "Search"
                     placeholder = 'Search' onChange = {this.handleSearch} />
                    </div>
                    {/*Table Part*/}
                    <table className = "table table-bordered">
                    <thead className = "thead-dark">
                        <tr>
                            <th className = "text-center">Edit</th>
                            <th className = "text-center">Delete</th>
                            <th scope = "col">
                            <button type = 'button' className = "btn btn-info btn-block" onClick = {e => this.handleSort(e, 'firstname')}>
                                First Name
                            </button>
                            </th>
                            <th scope = "col">
                            <button type = 'button' className = "btn btn-info btn-block" onClick = {e => this.handleSort(e, 'lastname')}>
                                Last Name
                            </button>
                            </th>
                            <th scope = "col">
                            <button type = 'button' className = "btn btn-info btn-block" onClick = {e => this.handleSort(e, 'sex')}>
                                Sex
                            </button>
                            </th>
                            <th scope = "col">
                            <button type = 'button' className = "btn btn-info btn-block" onClick = {e => this.handleSort(e, 'age')}>
                                Age
                            </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayUsers.map(user => {
                            return (
                                <tr key = {user._id}>
                                    <td className = "text-center"><Link className = "btn btn-info" to = {`/users/${user._id}`}>Edit</Link></td>
                                    <td className = "text-center"><button type = 'button' className = "btn btn-danger" onClick = {() => this.props.deleteUser(user._id)}>Delete</button></td>
                                    <td className = "text-center">{user.firstname}</td>
                                    <td className = "text-center">{user.lastname}</td>
                                    <td className = "text-center">{user.sex}</td>
                                    <td className = "text-center">{user.age}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>

                        {/*Pagination Part*/}
                        <Pagination/>

                        {/* Create New User*/}
                        <Link to = "/users" className = "btn btn-primary">
                            Create New User
                        </Link>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        pageOfUsers: state.userList.pageOfUsers,
        searchInput: state.searchInput
    };
};


export default connect(mapStateToProps)(HomePage);