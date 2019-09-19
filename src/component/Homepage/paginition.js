import React, {Component} from 'react';
import {connect} from 'react-redux';
import {countPage, redirectReset, fetchPage, setPageStatus} from '../../redux/action-creator'

class Pagination extends Component {
    constructor(props) {
        super(props)
        const pageLength = this.props.pageLength;
        const count = this.props.count;
        const List = [];
        const totalPages = Math.ceil(count / pageLength);
        let start = 1, end = totalPages;
        console.log('Current page count is', count);
        for (let i = start; i <= end; i++) {
            List.push(i);
            console.log('pushed pages number', List);
        }
        this.state = {
            pageNumber: List
        };
    }
    setCurPage = (curPage) => {
        this.props.countPage();
        this.props.fetchPage(curPage, 5);
        const pageLength = this.props.pageLength;
        const count = this.props.count;
        const pageNumber = this.state.pageNumber;

        const totalPages = Math.ceil(count / pageLength);
        let start = 1, end = totalPages;
        for (let i = start; i <= end; i++) {
            pageNumber.push(i);
        }
        this.setState({pageNumber: pageNumber});
    };

    componentDidUpdate(prevProps) {
        if (this.props.count !== prevProps.count) {
            this.setCurPage(this.props.curPage);
            console.log('the previous count is', prevProps.curPage);
        }
    }

    render() {
        const pageNumber = this.state.pageNumber;
        const count = this.props.count;
        const pageLength = this.props.pageLength;
        const totalPages = Math.ceil(count / pageLength);

        return (
            <div >
            <ul className = "pagination">
            <li className = "page-item">
            {this.props.curPage === 1 ? '' :
             <a className = "page-link" onClick = {() => this.setCurPage(this.props.curPage - 1)}>Previous</a>}
            </li>
            {pageNumber.map(page => {
                return (
                    <li key = {page} className = "page-item">
                        <a className = "page-link" onClick = {() => this.setCurPage(page)}>{page}</a>
                    </li>
                );
            })}
            <li className = "page-item">
              {this.props.curPage === totalPages ? '' : 
              <a className = "page-link" onClick = {() => this.setCurPage(this.props.curPage + 1)}> Next</a>}
            </li>    
            </ul>
            </div>
            );
        }
    }

const mapStateToProps = (state) =>{            
    return {
        pageOfUsers: state.userList.pageOfUsers,
        pageStatus: state.pageStatus,
        count: state.userList.count,
        pageNumber: state.userList.pageNumber,
        curPage: state.userList.curPage,
        pageLength: state.userList.pageLength
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        redirectReset: () => {
        dispatch(redirectReset());    
        },
        countPage: () => {
            dispatch(countPage());
        },
        fetchPage: (page, length) => {
            dispatch(fetchPage(page, length));
        },
        setPageStatus: (page) => {
            dispatch(setPageStatus(page));
        }
    };
}
export default connect(mapStateToProps ,mapDispatchToProps)(Pagination);