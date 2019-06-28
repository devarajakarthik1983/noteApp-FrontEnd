import React, { Component } from 'react';
import classes from './Registration.css';
import axios from 'axios';




class Registration extends Component {

    state = {
        fields: {},
        errors: {},
        completed:false,
        error:false,
        mismatchPassowrd:false,
        uniqueUser:false
       
    }
   

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

       
        
        //Name
        if(!fields["username"]){
           formIsValid = false;
           errors["username"] = "Username cannot be empty";
        }


        if(typeof fields["username"] !== "undefined"){
            if(!fields["username"].match(/[a-zA-Z0-9]{8,20}$/)){
               formIsValid = false;
               errors["username"] = "Username can be between 8 to 20 characters, only letters and numbers";
            }        
         }


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

        //password
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Password cannot be empty";
         }
 

         if(typeof fields["password"] !== "undefined"){
            if(!fields["password"].match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)){
               formIsValid = false;
               errors["password"] = "Password not meeting standards";
            }        
         }

          //password1
        if(!fields["password1"]){
            formIsValid = false;
            errors["password1"] = "Confirm password cannot be empty";
         }
 

         if(typeof fields["password1"] !== "undefined"){
            if(!fields["password1"].match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)){
               formIsValid = false;
               errors["password1"] = "Confirm password not meeting standards";
            }        
         }


        this.setState({errors: errors});
       return formIsValid;
   }

   //password1
   



   contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
        

        const set = this.state.fields.password === this.state.fields.password1
        

       if(set){

           const user = {
         username: this.state.fields.username,
         email: this.state.fields.email,
         password:this.state.fields.password1,
           }

         
            axios.post('http://localhost:3001/register', user)
            .then(response => {
                if(response.data === 'user exist'){
                        this.setState({uniqueUser:true});
                        this.setState({completed:false});
                        
                } else{
                    console.log(response);
                this.setState({completed:true});
                this.setState({error:false});
                this.setState({uniqueUser:false})
                this.setState({mismatchPassowrd:false});
                }
                
            })
            .catch(e=>{
                console.log(e);
                this.setState({error:true});
                this.setState({completed:false});
                this.setState({uniqueUser:false})
            })

      } else {
          console.log(this.state.fields.password);
        this.setState({mismatchPassowrd:true});
        this.setState({uniqueUser:false})
        this.setState({completed:false});
       }

     } else {return null;}

}



handleChange(field, e){         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
}

    cancelDataHandler =()=>{
        this.props.history.push('/');
    }

    resetHandler =()=>{
        window.location.reload();
    }
    
   
    render () {
        return (
            <div className={classes.Registration}>
                <h4><span class="label label-default">REGISTER</span></h4><br />
                
                <form>
                        <p style={{color:'red'}}>{this.state.errors["username"]}</p>
                        <p style={{color:'red'}}>{this.state.errors["email"]}</p>
                        <p style={{color:'red'}}>{this.state.errors["password"]}</p>
                        <p style={{color:'red'}}>{this.state.errors["password1"]}</p>


                        <label><b>Enter Username:</b><input ref="username" type="text" placeholder="Enter your Username..." onChange={this.handleChange.bind(this, "username")} 
                        value={this.state.fields["username"]} style={{width:'200px' , marginBottom:'0px'}}  style={{ border: this.state.errors.username ? '2px solid red': null }}/></label>
                        <p style={{marginLeft:'60px', fontSize:'10px' , color:'grey' ,marginBottom:'0px'}}>Username should be one word</p>
                        
                        
                        <label style={{margin:'0px 0px 0px 15px'}}><b>Enter Email-ID:</b><input ref="email" type="email" placeholder="Enter your Email..." 
                        onChange={this.handleChange.bind(this, "email")} 
                        value={this.state.fields["email"]}  style={{width:'210px' , marginBottom:'5px'}} style={{ border: this.state.errors.email ? '2px solid red': null }}/></label>
                        <p style={{marginLeft:'20px', fontSize:'10px' , color:'grey' ,marginBottom:'0px'}}>Email should be unique</p>

                        <label style={{margin:'0px 0px 0px 15px'}}><b>Enter Password:</b><input ref="password" type="password" placeholder="Enter your Password..."  
                        onChange={this.handleChange.bind(this, "password")} 
                        value={this.state.fields["password"]}  style={{width:'210px' , marginBottom:'5px'}} style={{ border: this.state.errors.password ? '2px solid red': null }}
                        style={{ border: this.state.mismatchPassowrd ? '2px solid red': null }}/></label>
                        <p style={{marginRight:'-120px', fontSize:'10px' , color:'grey' ,marginTop:'0px'}}>Password should contain One uppercase,One<br/> Lowercase,
                        One Digit,One symbol and no space</p>

                        <label style={{margin:'0px 0px 0px 15px'}}><b>Confrim Password:</b><input ref="password1" type="password" placeholder="Confirm your Password..."  
                        onChange={this.handleChange.bind(this, "password1")} 
                        value={this.state.fields["password1"]}  style={{width:'210px' , marginBottom:'5px'}} style={{ border: this.state.errors.password1 ? '2px solid red': null }}
                        style={{ border: this.state.mismatchPassowrd ? '2px solid red': null }}/></label>
                        <p style={{marginRight:'-150px', fontSize:'10px' , color:'grey' ,marginTop:'0px'}}>Password should contain One uppercase,One<br/> Lowercase,
                        One Digit,One symbol and no space</p>


                        

                        <br />
                        <br />
                        <button type="button" class="btn btn-success" onClick= {this.contactSubmit.bind(this)} >Register</button>
                        <button type="button" class="btn btn-danger"onClick={this.cancelDataHandler} >Cancel</button>
                        <button type="button" class="btn btn-warning"onClick={this.resetHandler} >Reset Form</button>
                        {this.state.completed ? <p style={{color:'green'}}>Registered Successfully and activation link is sent to your Email id</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>Sorry unable to register at this time</p> : null}
                        {this.state.mismatchPassowrd ? <p style={{color:'red'}}>Password  mistmatch.Please correct it</p> : null}
                        {this.state.uniqueUser ? <p style={{color:'red'}}>Email Id already taken.Please use new email id to register.</p> : null}
            </form>    
            </div>
        );
    }
}



export default Registration;