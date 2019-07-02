import React, { Component } from 'react';
import classes from './Login.css';
import {NavLink} from 'react-router-dom'
 import axios from 'axios';



class Login extends Component {

    state = {
        fields: {},
        errors: {},
        completed:false,
        error:false,
        inActive:false,
        mismatch:false,
        sentNewlink:false,
        noLink:false
       
    }
   

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
       

          //Email
        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Email cannot be empty";
         }
 
         if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email is not valid";
             }
        } 

       this.setState({errors: errors});
       return formIsValid;
   }



   contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
        const data ={
            email:this.state.fields.email,
            password: this.state.fields.password
        }
       
        axios.post('http://localhost:3001/login', data)
            .then(response => {
                if(response.data === 'Your account is not active. Please activate'){
                    this.setState({inActive:true});
                    this.setState({completed:false});
                    this.setState({error:false});
                    this.setState({mismatch:false});
                    localStorage.setItem('email',this.state.fields.email);
                   
                }else if(response.data === 'Unable to login') {
                    this.setState({inActive:false});
                    this.setState({completed:false});
                    this.setState({error:false});
                    this.setState({mismatch:true});
                }else{
                    this.setState({inActive:false});
                    this.setState({completed:true});
                    this.setState({error:false});
                    this.setState({mismatch:false});
                   
                    console.log(response.data.token);

                    localStorage.setItem('isAuth' , response.data.token);
                    localStorage.setItem('user', response.data.user.username)
                    this.props.history.push('/myposts');
                    window.location.reload();
                    
                }

                
            })
            .catch(e=>{
                console.log(e);
                this.setState({error:true});
                this.setState({completed:false});
                this.setState({inActive:false});
                this.setState({mismatch:false});
            })
         
    }

}



handleChange(field, e){         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
}


sendActiveLink =() =>{
    axios.post('http://localhost:3001/sendactivelink/' + localStorage.getItem('email'))
    .then(res=>{
        console.log(res);
        this.setState({sentNewlink: true});
        this.setState({noLink:false});
        this.setState({error:false});
        this.setState({completed:false});
        this.setState({mismatch:false});
        this.setState({inActive:false});
        localStorage.removeItem('email');
        
        
    }).catch(e=>{
        this.setState({noLink:true});
        this.setState({sentNewlink: false});
        this.setState({error:false});
        this.setState({completed:false});
        this.setState({mismatch:false});
        this.setState({inActive:false});
    })
}
   


    render () {
        return (
            <div className={classes.Login}>
                <h4><span class="label label-default">LOGIN</span></h4><br/>
                <form>
                        {/* error display */}
                       
                        <p style={{color:'red'}}>{this.state.errors["email"]}</p>
                        {this.state.completed ? <p style={{color:'green'}}>Logged in successfully</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>Unable to Fetch Please try again later</p> : null}
                        {this.state.inActive ? <p style={{color:'red'}}>Your account is inactive. Please activate your account</p> : null}
                        {this.state.mismatch ? <p style={{color:'red'}}>Your account email or password is not correct</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>Unable to Fetch Please try again later</p> : null}
                        {this.state.sentNewlink ? <p style={{color:'green'}}>Email sent with new ink</p> : null}
                        {this.state.noLink ? <p style={{color:'red'}}>Sorry unable to sent link</p> : null}


                        {/* Email field */}
                        <label style={{marginLeft:'20px'}}><b>Enter Email:</b><input type="Email" refs="email" placeholder="Enter Email.." 
                        onChange={this.handleChange.bind(this, "email")} 
                        value={this.state.fields["email"]}  style={{ border: this.state.errors.email ? '2px solid red': null , width:'200px' }} id="email-id"/></label>
                        <br />

                         {/* Password field */}
                         <label style={{marginLeft:'20px' ,marginRight:'45px'}}><b>Enter Password:</b><input type="password" refs="password" 
                         placeholder="Enter Password.." onChange={this.handleChange.bind(this, "password")} 
                        value={this.state.fields["password"]} style={{width:'210px'}} /></label>
                        <br />
                        {this.state.inActive ?<NavLink to="/" style={{marginRight:'-80px' , fontSize:'12px', textDecoration:'underline'}} 
                        onClick={this.sendActivelinkHandler} onClick={this.sendActiveLink}>Want a new user activation link?</NavLink> :null}<br />
                        <button type="button" class="btn btn-success"  style={{marginRight:'-30px'}} onClick= {this.contactSubmit.bind(this)}  >Login</button><br/>
                        <NavLink to="/forgotpassword" style={{marginRight:'-80px' , fontSize:'12px', textDecoration:'underline'}}>Forgot Password</NavLink>
                       
                     
                       



                     

            </form>    
            </div>
        );
    }
}



export default Login;