import React , {Component} from 'react';
import axios from 'axios';


import Post from '../../components/Post/Post';
 
class Posts extends Component {

    state = {
        posts: [],
        error: false,
    }

    fetchNotes = () =>{
      
        axios.get( 'http://localhost:3001/notes' )
            .then( response => {
              
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

  


    render(){

        let posts = <p>Something went wrong!</p>;
        if(this.state.posts.length === 0){
            posts =<p>Oops no post to show...</p>
        }else if (!this.state.error) {
            posts = this.state.posts.map(post => {
              
                return <Post key={post._id} 
                    title={post.title} 
                    text={post.text}
                    id={post._id}
                    fetchNotes={this.fetchNotes}
                    edit={() => this.props.history.push(`${'/update-note/'}${post._id}`)}
                  />;
            });
        }
     

        return(
            <div>
                {posts}
            </div>
        )
    }
}



export default Posts;