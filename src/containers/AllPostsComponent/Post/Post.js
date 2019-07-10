import React, {Component} from 'react';
import classes from './Post.css';
import axios from 'axios';




class Post extends Component {

    state={
        error:false,
       
    }

    //props.complete

    render(){

        return(
            <div>
                
                <article className={classes.Post}><span style={{float:'right'}} onClick={()=>{
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');    
                axios.delete('https://noteappbackend.herokuapp.com/notes/' + this.props.id)
                .then(response=>{
                    //console.log(this.state.complete);
                   // console.log(complete);
                    // complete[complete]='true'
                   // console.log(localStorage.getItem('complete'));
                    this.props.fetchNotes();
                }).catch(e=>{
                    console.log(e);
                })
            }}>x</span>
            <h3 style={{ textDecorationLine: this.props.complete ? 'line-through': null }}>{this.props.title}</h3>
            <p style={{ textDecorationLine: this.props.complete ? 'line-through': null }}>{this.props.text}</p>
<button type="button" class="btn btn-success" onClick={()=>{
                if(!this.props.complete){
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');
                    axios.patch('https://noteappbackend.herokuapp.com/notes/' + this.props.id , {complete:true})
                    .then(response => {
                        //console.log(response.data.complete);
                        //this.setState({complete:true})

                       console.log('success');
                       window.location.reload();
                        
                    })
                    .catch(e=>{
                        this.setState({error:true})
                    })
                } else {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');
                    axios.patch('https://noteappbackend.herokuapp.com/notes/' + this.props.id , {complete:false})
                    .then(response => {
                        //console.log(response.data);
                        //this.setState({complete:false})

                       console.log('success');
                       window.location.reload();
                        
                      
                      
                    })
                    .catch(e=>{
                        this.setState({error:true})
                    })
                }
                
                    
            }}>{this.props.complete ? ' UNDO COMPLETE' :'COMPLETE'}</button>

           <button type="button" class="btn btn-warning" onClick={this.props.edit} disabled={this.props.complete}>EDIT</button>
        <button type="button" class="btn btn-danger"  onClick={()=>{
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');
            axios.delete('https://noteappbackend.herokuapp.com/notes/' + this.props.id)
            .then(response=>{
                console.log(response.data);
                this.props.fetchNotes();
            }).catch(e=>{
                console.log(e);
            })
        }}>DELETE</button>
        {this.state.error ? <p>Unable to complete the note try again later</p> : null}
        </article>
            </div>
            
        );
    }
}





export default Post;






