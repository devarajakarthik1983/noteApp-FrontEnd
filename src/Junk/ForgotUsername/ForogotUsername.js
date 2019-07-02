import React, { Component } from 'react';
import axios from 'axios';



class ForgotUsername extends Component {

    state = {
        fields: {},
        errors: {},
        complete:false,
        error:false,
        username:'',
        
       
    }
   

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        
          //Email
        if(!fields["email"]){
            formIsValid = false;
            errors["email"] = "Email cannot be empty";
            this.setState({error:false});
            this.setState({complete:false});
         }
 
         if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');
 
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
               formIsValid = false;
               errors["email"] = "Email is not valid";
               this.setState({error:false});
               this.setState({complete:false});
             }
        }
        
       this.setState({errors: errors});
       return formIsValid;
   }



   contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
       //console.log('Form is Valid');
       //console.log(this.state.fields.email);
       axios.get('http://localhost:3001/forgotusername/' + this.state.fields.email)
       .then(res=>{
           //console.log(!res.data);
           if(!(res.data)){
               this.setState({error:true});
               this.setState({complete:false});

           }else {
                //console.log(res.data[0]);
                   this.setState({username:res.data[0].username})
                    this.setState({complete:true});
                    this.setState({error:false});
           }
         
       }).catch(e=>{
           console.log(e);
           this.setState({error:true});
           this.setState({complete:false});
          
       })      
    }
    
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
                        <p style={{color:'red'}}>{this.state.errors["email"]}</p>
                        {this.state.error ? <p style={{color:'red'}}>Username does not exist for that email</p> : null}
                        {this.state.complete ? <p style={{color:'green'}}>Your Username: <span style={{color:'black'}}><b>{this.state.username}</b></span></p> : null}
                        {/* Email field */}
                        <label style={{marginLeft:'20px'}}><b>Enter Email:  </b><input type="Email" refs="email" placeholder="Enter Email.." onChange={this.handleChange.bind(this, "email")} 
                        value={this.state.fields["email"]}  style={{ border: this.state.errors.email ? '2px solid red': null , width:'200px', height:'35px' }} id="email-id"/></label>
                        <button type="button" class="btn btn-success" onClick= {this.contactSubmit.bind(this)} style={{marginLeft:'10px',marginTop:'0' ,marginBottom:'2px'}}>Retrieve Username</button>
                        
                        



                     

            </form>    
            </div>
        );
    }
}



export default ForgotUsername;