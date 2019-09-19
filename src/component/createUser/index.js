import './createUser.css';
import React , {Component} from 'react';
import {Redirect} from 'react-router-dom';

class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            sex: "",
            age: "",
            password: "",
            repeatpassword:"",
            passwordsame: true
        };
}

handleSubmit = (e) => {
  e.preventDefault();
  if (this.state.password === this.state.repeatpassword) {
    const newUser = {
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      sex: this.state.sex,
      age: this.state.age,
      password: this.state.password
     
    }
    this.props.createUser(newUser);
    this.setState({
      firstName: "",
      lastName: "",
      sex: "",
      age: "",
      passwordsame: true
    });
    this.props.redirectToHome();
  }
  else {
    this.setState({passwordsame: false});
  }
}

handleFirstChange = (e) => {
  this.setState({
    firstName: e.target.value
  });
}

handleLastChange = (e) => {
  this.setState({lastName: e.target.value});
}

handleSexChange = (e) => {
  this.setState({sex: e.target.value});
}

handleAgeChange = (e) => {
  this.setState({age: e.target.value});
}

handlePasswordChange = (e) => {
  this.setState({password: e.target.value});
}

handleRepeatChange = (e) => {
  this.setState({repeatpassword: e.target.value});
}

render() {
  const {redirect} = this.props;
  const passwordStyle = {color: 'red'};
  if (redirect && !this.props.isLoading) { 
  return <Redirect to = {{pathname: '/'}}/>
  }
  else {
    return (
      <div className = "container">
        <h2>Create New User</h2>
        <br></br>
        <form onSubmit = {this.handleSubmit}>
        <div className ="form-group col-md-50">
          <lable htmlFor = "firstname">
          First Name: 
          </lable>
            <input type = "text" className = "form-control" id = "firstname" value = {this.state.firstName} onChange = {this.handleFirstChange} required = {true}/>
        </div>
        <div className = "form-group col-md-50">
          <label htmlFor = "lastname">
          Last Name: 
          </label>  
            <input type = "text" className = "form-control" id = "lastname" value = {this.state.lastName} onChange = {this.handleLastChange} required = {true}/>
        </div>
        <div className = "form-group col-md-50">
          <lable htmlFor = "sex">
            Sex:
          </lable>  
            <input type = "text" className = "form-control" id = "sex" value = {this.state.sex} onChange = {this.handleSexChange} required = {true}/>      
        </div>
        <div className = "form-group col-md-50">
          <label htmlFor = "age">
            Age:
          </label> 
            <input type = "number" className = "form-control" id = "age" value = {this.state.age} onChange = {this.handleAgeChange} required = {true}/>
        </div>
        <div className = "form-group col-md-50">
          <lable htmlFor = "password">
          Password:
          </lable>
          <input type = "password" className = "form-control" id = "password" value = {this.state.password} onChange = {this.handlePasswordChange} required = {true}/>
        </div>
        <div className = "form-group col-md-50">
        <label htmlFor = "repeatpassword">
        Repeat Password:
        </label>
        <input type = "password" className = "form-control" id = "repeatpassword" value = {this.state.repeatpassword} onChange = {this.handleRepeatChange} required = {true}/>
        </div>
        <button className = "btn btn-success" type = "submit">Save User</button>
        </form>
        {this.state.passwordsame === true ? null : <p style = {passwordStyle}>Passwords doesn't matched</p>}
      </div>
    );
  }
 }
}

export default CreateUser;
/*
    render() {
        <div className = "container">
        <form>
        <h1>Create User</h1>
        FisrtName: 
        <input 
        type = "text"
        name = "firstname"
        value = {this.state.firstName}
        onClick = {e => {
            this.setState({firstName: e.target.value});
        }}
        />
        LastName: 
        <input 
        type = "text"
        name = "lastname"
        value = {this.state.lastName}
        onClick = {e=> {
            this.setState({lastName: e.target.value});
        }}
        />
        Sex:
        <input
          type="text"
          name="sex"
          value={this.state.sex}
          onChange={e => {
            this.setState({ sex: e.target.value });
          }}
        />
        Age:
        <input
          type="text"
          name="age"
          value={this.state.age}
          onChange={e => {
            this.setState({ age: e.target.value });
          }}
        />
        Password:
        <input
          type="text"
          name="password"
          value={this.state.password}
          onChange={e => {
            this.setState({ password: e.target.value });
          }}
        />
        Repeat:
        <input
          type="text"
          name="repeatepassword"
          value={this.state.repeatpassword}
          onChange={e => {
            this.setState({ repeatpassword: e.target.value });
          }}
        />
        {this.state.password === this.state.repeatpassword ? (
          <button
            onClick={() => {
              this.props.history.push("/api/users");
              this.props.create(
                this.state.firstName,
                this.state.lastName,
                this.state.sex,
                this.state.age,
                this.state.password,
                this.state.repeatpassword
              );
            }}
          >
            CreateUser
          </button>
        ) : (
          <button disabled={true}>CreateUser</button>
        )}
        />
        </form>                         
        </div>
    }
}

const mapStateToPropS = (state) => {
      return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    create: () => {
    dispatch(actions.createUser());
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createUser);
*/