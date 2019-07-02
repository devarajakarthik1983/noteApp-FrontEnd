import React , {Component} from 'react';
import axios from 'axios';

class ActivateUser extends Component {
    state={
        complete:false,
        error:false
    }

    activateHandler=()=>{
        const id = this.props.match.params.id;
        const token =  this.props.match.params.id1;
            axios.post('http://localhost:3001/newuser/' + id +'/' + token)
            .then(res=>{
                console.log(res);
                this.setState({complete:true});

                setTimeout(()=>{
                    this.setState({complete:false});
                    this.props.history.push('/');
                },5000);

            }).catch(e=>{
                console.log(e);
                this.setState({error:true})
                setTimeout(()=>{
                    this.setState({complete:false});
                    this.setState({error:false})
                    this.props.history.push('/');
                },5000);

            })
    }

    render() {
        let showPost = this.state.complete ?  <p style={{color:'green'}}>Your account is activated you can now login.Site will be redirected to Login page in 5 secs</p>: null;
        let error = this.state.error ?  <p style={{color:'red'}}>Your are already activated or site is down try again later.Site will be redirected to Login page in 5 secs</p>: null;
        return(
        <div>
            {error}
            {showPost}
            <p>Please click the activate now button</p>
            <button type="button" class="btn btn-success" onClick={this.activateHandler} >Activate Now</button>
        </div>
        )
    }

}


export default ActivateUser;