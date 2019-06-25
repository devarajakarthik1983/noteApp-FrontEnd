import React , {Component} from 'react';
import axios from 'axios';


import Post from '../../components/Post/Post';
import classes from './Posts.css';
 
class Posts extends Component {

    state = {
        posts: [],
        error: false,
    }

    fetchNotes = () =>{
      
        axios.get( 'http://localhost:3001/notes' )
            .then( response => {
                //console.log(response.data.todo.complete);
                const posts = response.data;
                this.setState({posts: posts});
                
                
            } )
            .catch(error => {
               
                this.setState({error: true});
            });
    }

    componentDidMount () {
        this.fetchNotes();
    }

  

    sortOldestHandler =()=>{

        axios.get( 'http://localhost:3001/notesoldest' )
            .then( response => {
              
                const posts = response.data;
                this.setState({posts: posts});
               // this.fetchNotes();
            } )
            .catch(error => {
               
                this.setState({error: true});
            });

    }

    sortByCompletedHandler =()=>{
        axios.get( 'http://localhost:3001/notescompleted' )
            .then( response => {
              
                const posts = response.data;
                this.setState({posts: posts});
               // this.fetchNotes();
            } )
            .catch(error => {
               
                this.setState({error: true});
            });
    }

    sortByIncompleteHandler =(event)=>{
        axios.get( 'http://localhost:3001/notesnotcomplete' )
            .then( response => {
              
                const posts = response.data;
                this.setState({posts: posts});
               // this.fetchNotes();
            } )
            .catch(error => {
               
                this.setState({error: true});
            });
    }


    render(){

        let posts =null;

        if(this.state.error){
            posts = <p>Something went wrong!</p>;
        } else if(this.state.posts.length === 0){
            posts =<p>Oops no post to show...</p>
        }else {
            posts = this.state.posts.map(post => {
                
                return <Post key={post._id} 
                    title={post.title} 
                    text={post.text}
                    id={post._id}
                    fetchNotes={this.fetchNotes}
                    complete={post.complete}
                    edit={() => this.props.history.push(`${'/update-note/'}${post._id}`)}
                  />;
            });
        }
     

        return(
            <div>
                <div className={classes.Posts}>
                <ul>
                     <li onClick={this.sortOldestHandler} style={{textDecoration:'underline' , cursor:'pointer'}}>Sort By Oldest Note</li>
                     <li onClick={this.fetchNotes} style={{textDecoration:'underline' , cursor:'pointer'}}>Sort By Newest Note(Default)</li>
                     <li onClick={this.sortByCompletedHandler} style={{textDecoration:'underline' , cursor:'pointer'}}>Sort By Completed Note</li>
                     <li onClick={this.sortByIncompleteHandler} style={{textDecoration:'underline' , cursor:'pointer'}}>Sort By Open Note</li>
                    </ul>
                    </div>
                {posts}
            </div>
        )
    }
}



export default Posts;