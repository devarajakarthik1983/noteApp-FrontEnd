import React , {Component} from 'react';
import axios from 'axios';


import Post from '../Post/Post';
import classes from './Posts.css';
import styles from './pagination.module.css';
 
class Posts extends Component {

    state = {
        posts: [],
        error: false,
        total: null,
        per_page: null,
        current_page: 1
    }

    fetchNotes = (pageNumber) =>{
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');
        axios.get( `https://noteappbackend.herokuapp.com/notes?page=${pageNumber}` )
            .then( response => {
                //console.log(response.data.todo.complete);
                const posts = response.data.notes;
                this.setState({
                    posts: posts,
                    total: response.data.total,
                    per_page: response.data.per_page,
                    current_page: response.data.page
                });
                console.log(response.data);
                
                
            } )
            .catch(error => {
               
                this.setState({error: true});
            });
    }

    componentDidMount () {
        this.fetchNotes();
    }

  

    sortOldestHandler =(pageNumber)=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');
        axios.get( `https://noteappbackend.herokuapp.com/notesoldest?page=${pageNumber}` )
            .then( response => {
              
                const posts = response.data.notes;
                this.setState({
                    posts: posts,
                    total: response.data.total,
                    per_page: response.data.per_page,
                    current_page: response.data.page
                });
               // this.fetchNotes();
            } )
            .catch(error => {
               
                this.setState({error: true});
            });

    }

    sortByCompletedHandler =(pageNumber)=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');
        axios.get( `https://noteappbackend.herokuapp.com/notescompleted?page=${pageNumber}` )
            .then( response => {
              
                const posts = response.data.notes;
                this.setState({
                    posts: posts,
                    total: response.data.total,
                    per_page: response.data.per_page,
                    current_page: response.data.page
                });
               // this.fetchNotes();
            } )
            .catch(error => {
               
                this.setState({error: true});
            });
    }

    sortByIncompleteHandler =(pageNumber)=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('isAuth');
        axios.get( `https://noteappbackend.herokuapp.com/notesnotcomplete?page=${pageNumber}` )
            .then( response => {
              
                const posts = response.data.notes;
                this.setState({

                    posts: posts,
                    total: response.data.total,
                    per_page: response.data.per_page,
                    current_page: response.data.page
                });
               // this.fetchNotes();
            } )
            .catch(error => {
               
                this.setState({error: true});
            });
    }


    render(){

        let posts;
        let renderPageNumbers;

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

        const pageNumbers = [];
        if (this.state.total !== null) {
          for (let i = 0; i <= Math.floor(this.state.total / this.state.per_page); i++) {
            pageNumbers.push(i);
            console.log(pageNumbers);
          }
    
    
          renderPageNumbers = pageNumbers.map(number => {
            let classes = this.state.current_page === number ? styles.active : '';
          
            if (number === 0 || number === this.state.total || (number >= this.state.current_page -2 && number <= this.state.current_page + 2)) {
              return <span key={number} className={classes} onClick={() => this.fetchNotes(number)}>{number}</span>
              
            }
          });
        }
     

        return(
           <React.Fragment>
            <div >
                <div className={classes.Posts} >
                <ul>
                     <li onClick={this.sortOldestHandler} style={{textDecoration:'underline' , cursor:'pointer'}}>Sort By Oldest Note</li>
                     <li onClick={this.fetchNotes} style={{textDecoration:'underline' , cursor:'pointer'}}>Sort By Newest Note(Default)</li>
                     <li onClick={this.sortByCompletedHandler} style={{textDecoration:'underline' , cursor:'pointer'}}>Sort By Completed Note</li>
                     <li onClick={this.sortByIncompleteHandler} style={{textDecoration:'underline' , cursor:'pointer'}}>Sort By Open Note</li>
                    </ul>
                    </div>
                    <p style={{textAlign:'center' , fontSize:'20px' ,boxShadow:'borderbox'}}><b>Only 8 posts are shown and pagination is only for default sort</b></p>
                {posts}
            </div>
            
            <footer className={styles.pagination}>
            <br /><br />
        <span onClick={() => this.fetchNotes(0)}>&laquo;</span>
        {renderPageNumbers}
        <span onClick={() => this.fetchNotes(0)}>&raquo;</span>
      </footer>
          </React.Fragment>
        )
        
    }
}



export default Posts;