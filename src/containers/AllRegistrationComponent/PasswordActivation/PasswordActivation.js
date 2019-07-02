import React, { Component } from 'react';
import axios from 'axios';



class PasswordActivation extends Component {

    state = {
        fields: {},
        errors: {},
        completed:false,
        error:false,
        mismatchPassowrd:false,
        
       
    }
   

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        
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



   contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
        

        const set = this.state.fields.password === this.state.fields.password1
        
        

       if(set){

        const pathname = this.props.location.pathname;
        //console.log(pathname);
        var email = pathname.split('/')
       const  decodedEmail = decodeURIComponent(email[2]);
       //console.log(decodedEmail);
       //console.log(this.state.fields.password1);

       const data = {
        password: this.state.fields.password
        
    };
       
        console.log(data);
              
            axios.post('http://localhost:3001/newpasswordentry/' + decodedEmail , data)
            .then(response => {
               
                console.log(response.data);
                this.setState({completed:true});
                this.setState({error:false});
                this.setState({mismatchPassowrd:false});
                 setTimeout(()=>{
            this.props.history.push('/');
        }, 5000);

                
            })
            .catch(e=>{
                console.log(e);
                this.setState({error:true});
                this.setState({completed:false});
                this.setState({mismatchPassowrd:false});
            })

      } else {
         this.setState({mismatchPassowrd:true});
        this.setState({completed:false});
        this.setState({error:false});
       }

     } else {return null;}

}



handleChange(field, e){         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
}

    render () {

     

        
        return (
            <div>
                
                <form>
                        {/* error display */}
                        <p style={{color:'red'}}>{this.state.errors["password"]}</p>
                        <p style={{color:'red'}}>{this.state.errors["password1"]}</p>
                        {this.state.mismatchPassowrd ? <p style={{color:'red'}}>Password  mistmatch.Please correct it</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>User's email did not match</p> : null}
                        {this.state.completed ? <p style={{color:'green'}}>Your password is reset.Please try with new password.Page will be redirected to login 5 secs</p> : null}

                        {/* Password field */}
                        <label style={{marginLeft:'20px'}}><b>Enter Password:  </b><input type="password" refs="password" placeholder="Enter Password.." 
                        onChange={this.handleChange.bind(this, "password")} 
                        value={this.state.fields["password"]}  
                        style={{ border: this.state.errors.password ? '2px solid red': null , width:'200px', height:'35px' }} id="passowrd" 
                        style={{ border: this.state.mismatchPassowrd ? '2px solid red': null }}/></label>

                        {/* Confirm field */}
                        <label style={{marginLeft:'20px'}}><b>Confirm Password:  </b><input type="password" refs="password1" placeholder="Confirm Password.." 
                        onChange={this.handleChange.bind(this, "password1")} 
                        value={this.state.fields["password1"]}  
                        style={{ border: this.state.errors.password1 ? '2px solid red': null , width:'200px', height:'35px' }} id="password"
                        style={{ border: this.state.mismatchPassowrd ? '2px solid red': null }}/></label>

                        <button type="button" class="btn btn-success" onClick= {this.contactSubmit.bind(this)} 
                        style={{marginLeft:'10px',marginTop:'0' ,marginBottom:'2px'}}>Set Password</button>
                        
                        



                     


            </form>    
            </div>
        );
    }
}



export default PasswordActivation;