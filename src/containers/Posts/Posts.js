import React , {Component} from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';

 
class Posts extends Component {

    state = {
        posts: [],
        error: false,
        strikeThrough:false
      
    }

    fetchNotes = () =>{
      
        axios.get( 'http://localhost:3001/notes' )
            .then( response => {
                //console.log(response.data);
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

   

    completeHandler =()=>{
        if(this.state.strikeThrough){
            this.setState({strikeThrough:false})
        }else{
            this.setState({strikeThrough:true})
        }
        }




    render(){

        let posts = <p>Something went wrong!</p>;
        if(this.state.posts.length === 0){
            posts =<p>Oops no post to show...</p>
        }else if (!this.state.error) {
            posts = this.state.posts.map(post => {
                //console.log(post._id);
                return <Post key={post._id} 
                    title={post.title} 
                    text={post.text}
                    id={post._id}
                    fetchNotes={this.fetchNotes}
                    edit={() => this.props.history.push(`${'/update-note/'}${post._id}`)}
                    complete = {()=>this.completeHandler(post._id)}
                    striked={this.state.strikeThrough}
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