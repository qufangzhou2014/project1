import React from 'react';
//import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
//import {updateUser, getAllUsers} from '../../redux/action-creator/index';
import './editUser.css';

class EditUser extends React.Component {
  constructor(props){
    super(props);
   this.state = {
     firstname : '',
     lastname : '',
     sex: '',
     age: '',
     password: '',
     repeatpassword: '',
     passwordsame: true
   };
}


componentDidMount() {
  const {id, getUser} = this.props;
  console.log('id is', id);
  const userToEdit = getUser(id);
  console.log('current edit user is: ', userToEdit);
  if (userToEdit) {
    const {firstname, lastname, sex, age, password, repeatpassword} = userToEdit;
    this.setState({firstname: firstname, 
      lastname: lastname, 
      sex: sex, 
      age: age, 
      password: password,
      repeatpassword: repeatpassword});
  }
}

handleSubmit = (e) => {
e.preventDefault();
let {id, editUser} = this.props;
let {firstname, lastname, sex, age, password} = this.state;
if (this.state.password === this.state.repeatpassword) {
const curUser = {id, firstname, lastname, sex, age, password};
editUser(id, curUser);
this.setState({
  firstname: '',
  lastname:'',
  sex: '',
  age: '',
  password:'',
  repeatpassword:'',
  passwordsame: true
});
this.props.redirectToHome();
}
else {
  this.setState({
    password:'',
    repeatpassword:'',
    passwordsame: false
  });
}
}

handleChange = (e, keyword) => {
  const editUser = {};
  editUser[keyword] = e.target.value;
  this.setState(editUser);
}

handleRepeatChange = (e) => {
  this.setState({repeatpassword: e.target.value});
}
  render() {
  const passwordStyle = {color: 'red'};  
  const {redirect} = this.props;
  if (redirect && ! this.props.isLoading) { 
  return <Redirect to = {{pathname: '/'}}/>
  }
  else {
    return (
      <div className = "container">
        <h2>Edit User</h2>
        <br></br>
        <form onSubmit = {this.handleSubmit}>
         <div className = "form-group col-md-50">
           <label htmlFor = 'first_name'>
           First Name:
           </label>
          <input type = 'text' class = 'form-control' id = 'firstname' value = {this.state.firstname} onChange = {e => this.handleChange(e, 'firstname')} required = {true}/>
          </div>

          <div className = "form-group col-md-50">
          <label htmlFor = 'last_name'>
            Last Name:
          </label>
          <input type = 'text' class = 'form-control' id = 'lastname' value = {this.state.lastname} onChange = {e => this.handleChange(e, 'lastname')} required = {true}/>
          </div>

        <div className = "form-group col-md-50">
         <lable htmlFor = 'sex'>
           Sex:
         </lable>
         <input type = 'text' class = 'form-control' id = 'sex' value = {this.state.sex} onChange = {e => this.handleChange(e, 'sex')} required = {true}/>
         </div>

         <div className = "form-group col-md-50">
          <label htmlFor = 'age'>
            Age:
          </label>
          <input type = 'number' class = 'form-control' id = 'age' value  = {this.state.age} onChange = {e => this.handleChange(e, 'age')} required = {true}/>
         </div>
         
         <div className = "form-group col-md-50">
          <label htmlFor = 'password' style = {this.state.passwordsame === true ? null : passwordStyle} >
            Password: 
          </label>
          <input type = 'password' class = 'form-control' id = 'password' value = {this.state.password} onChange = {e =>this.handleChange(e,'password')} required = {true}/>
         </div>

         <div className = "form-group col-md-50">
           <lable htmlFor ='passwordRepeat' style = {this.state.passwordsame === true ? null : passwordStyle}>
             Repeat Password:
           </lable>
           <input type = 'password' class = 'form-control' id = 'passwordRepeat' value = {this.state.repeatpassword} onChange = {this.handleRepeatChange} required = {true}/>
         </div>

        <button className = "btn btn-success" type = "submit">Save Changes</button>
        </form>
        {this.state.passwordsame === true ? null : <p style = {passwordStyle}>Password doesn't match!</p>}
      </div>
    );
  }
  }
}

export default EditUser;
