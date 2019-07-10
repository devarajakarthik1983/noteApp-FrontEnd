import React, { Component } from 'react';
import classes from './CreatePost.css';
import axios from 'axios';


//import axios from 'axios';

class CreatePost extends Component {

    state = {
        fields: {},
        errors: {},
        completed:false,
        error:false
       
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        //title
        if(!fields["title"]){
           formIsValid = false;
           errors["title"] = "Title cannot be empty";
        }
          //Email
        if(!fields["text"]){
            formIsValid = false;
            errors["text"] = "Text cannot be empty";
         }

        this.setState({errors: errors});
       return formIsValid;
   }



   contactSubmit(e){
    e.preventDefault();

    if(this.handleValidation()){
        //event.preventDefault();
        const data = {
            title: this.state.fields.title,
            text: this.state.fields.text,
            
        };
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');
        axios.post('https://noteappbackend.herokuapp.com/notes', data)
            .then(response => {
                console.log(response);
                this.setState({completed:true});
                this.setState({title:'' , text:''});
                this.props.history.push('/myposts');
            })
            .catch(e=>{
                this.setState({error:true});
            })
         
    }

}



handleChange(field, e){         
    let fields = this.state.fields;
    fields[field] = e.target.value;        
    this.setState({fields});
}
    
cancelDataHandler =()=>{
        this.props.history.push('/myposts');
    }
    
   
    render () {
        return (
            <div className={classes.CreatePost}>
                <h4><span class="label label-default">ENTER YOUR NOTE</span></h4><br/>
                <form>
                        <p style={{color:'red'}}>{this.state.errors["title"]}</p>
                        <p style={{color:'red'}}>{this.state.errors["text"]}</p>

                        <label><b>Enter Title:</b><input type="text" ref="title" placeholder="Enter your Title..." onChange={this.handleChange.bind(this, "title")} 
                        value={this.state.fields["title"]} style={{ border: this.state.errors.title ? '2px solid red': null }}/></label>
                        <br />
                        <label><b>Enter Text:</b> <br/><br/>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="10" cols="80" type="text" ref="text"  placeholder="Enter your Text..."  
                         onChange={this.handleChange.bind(this, "text")} 
                         value={this.state.fields["text"]} style={{ border: this.state.errors.text ? '2px solid red': null }}></textarea>
                        </label>
                        <br />
                        <br />
                        <button type="button" class="btn btn-danger" onClick={this.cancelDataHandler} >CANCEL</button>
                        <button type="button" class="btn btn-success" onClick= {this.contactSubmit.bind(this)} >SUBMIT NOTE</button>
                        {this.state.completed ? <p style={{color:'green'}}>Note added Successfully</p> : null}
                        {this.state.error ? <p style={{color:'red'}}>Sorry unable to add notes</p> : null}
            </form>    
            </div>
        );
    }
}



export default CreatePost;