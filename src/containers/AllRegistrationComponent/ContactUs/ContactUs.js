import React, { Component } from 'react';
import classes from './ContactUs.css';
 import axios from 'axios';



class ContactUs extends Component {

    state = {
        fields: {},
        errors: {},
        button:false,
        completed:false,
        error:false
       
    }
   

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        //Name
        if(!fields["firstname"]){
           formIsValid = false;
           errors["firstname"] = "FirstName cannot be empty";
        }

        if(typeof fields["firstname"] !== "undefined"){
           if(!fields["firstname"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["firstname"] = "FirstName can only be letters Or Only one Word";
           }        
        }

        if(!fields["lastname"]){
            formIsValid = false;
            errors["lastname"] = "LastName cannot be empty";
         }
 
         if(typeof fields["lastname"] !== "undefined"){
            if(!fields["lastname"].match(/^[a-zA-Z]+$/)){
               formIsValid = false;
               errors["lastname"] = "LastName can only be letters Or Only one Word";
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

        //Feedback text area
         //Email
         if(!fields["feedback"]){
            formIsValid = false;
            errors["feedback"] = "Feedback cannot be empty";
            
         }

         if(fields["feedback"] === ' '){
            formIsValid = false;
            errors["feedback"] = "Feedback cannot be filled with only space";
         }
        
        

       this.setState({errors: errors});
       return formIsValid;
   }



   contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
       //console.log('Form is Valid');
       //console.log(this.state.fields.email);

       const feedback = {
         firstname: this.state.fields.firstname,
         lastname: this.state.fields.lastname,
         email:this.state.fields.email,
         feedback:this.state.fields.feedback
         }

         

            axios.post('http://localhost:3001/feedback', feedback)
            .then(response => {
                console.log(response);
                this.setState({completed:true});
            })
            .catch(e=>{
                console.log(e);
                this.setState({error:true});
            })

        setTimeout(()=>{
            this.props.history.push('/');
        }, 5000);

        
         
    }

}



handleChange(field, e){         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
}


    cancelDataHandler =()=>{
        this.props.history.push('/');
    }
    

    //<p style={{color:'red'}}>{this.state.errors["firstname"]}</p>
   
    render () {
        return (
            <div className={classes.ContactUs}>
                <h4><span class="label label-default">ENTER YOUR FEEDBACK</span></h4><br/>
                <form>
                        {/* error display */}
                        <p style={{color:'red'}}>{this.state.errors["firstname"]}</p>
                        <p style={{color:'red'}}>{this.state.errors["lastname"]}</p>
                        <p style={{color:'red'}}>{this.state.errors["email"]}</p>
                        <p style={{color:'red'}}>{this.state.errors["feedback"]}</p>


                        {/* FirstName field */}
                        <label><b>Enter FirstName:</b><input  ref="firstname" type="text" placeholder="Enter FirstName.." onChange={this.handleChange.bind(this, "firstname")} 
                        value={this.state.fields["firstname"]} maxLength="20" minLength="1" 
                        style={{ border: this.state.errors.firstname ? '2px solid red': null }}/></label><br />

                        {/* LastName field */}
                        <label><b>Enter LastName:</b><input ref="lasttname" type="text" placeholder="Enter LastName.." onChange={this.handleChange.bind(this, "lastname")} 
                        value={this.state.fields["lastname"]} maxLength="20" minLength="1" style={{ border: this.state.errors.lastname ? '2px solid red': null }}/></label><br/>

                        {/* Email field */}
                        <label style={{marginLeft:'20px'}}><b>Enter Email:</b><input type="Email" refs="email" placeholder="Enter Email.." onChange={this.handleChange.bind(this, "email")} 
                        value={this.state.fields["email"]}  style={{ border: this.state.errors.email ? '2px solid red': null , width:'200px' }} id="email-id"/></label>
                        <label><b>Enter Your Feedback:</b> <br/><br/>

                         {/* Feedback field */}
                        <textarea  refs="feedback" class="form-control" id="exampleFormControlTextarea1" rows="10" cols="80" type="text" placeholder="Enter your feedback..."  
                        onChange={this.handleChange.bind(this, "feedback")} 
                        value={this.state.fields["feedback"]} style={{ border: this.state.errors.feedback ? '2px solid red': null }}></textarea>
                        </label>
                        <br />
                        <br />
                        <button type="button" class="btn btn-danger"onClick={this.cancelDataHandler} >CANCEL</button>
                        <button type="button" class="btn btn-success" onClick= {this.contactSubmit.bind(this)} >SUBMIT FEEDBACK</button>
                        {this.state.completed ? <p style={{color:'green'}}>Feedback recieved and we acknowledged to your email.Site will redirect after 5 seconds</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>Sorry trouble in recieving feedback</p> : null}



                     

            </form>    
            </div>
        );
    }
}



export default ContactUs;