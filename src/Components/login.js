import React from 'react';
import '../css/Login.css';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password:''};
    
        this.handleChangeLog = this.handleChangeLog.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      };
      
    handleChangeLog(event) 
    {
       this.setState({username: event.target.value});
    }
    
    handleChangePass(event) 
    {
        this.setState({password: event.target.value});
    }

    handleSubmit(event)
    {
        axios.post('/login', this.state.username, this.state.password)
            .then((req, res) => {
    
            })
            .catch(err => console.log(err));
        event.preventDefault();
    };
    render(){
        return(
            <div className="osnova">
                <form onSubmit = {this.handleSubmit}>
                        <input className="input" value={this.state.user} onChange={this.handleChangeLog} placeholder="Логин"/>
                        <input className="input" value={this.state.password} onChange={this.handleChangePass} placeholder="Пароль"/>
                        <br/>
                        <input type="submit" className="confirm" value="Войти"/>
                </form>
            </div>
        );
    }
}
export default Login;