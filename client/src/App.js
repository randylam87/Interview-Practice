import React, { Component } from 'react';
import './App.css';
import EnhancedTable from './components/Table';
import UserTable from './components/UsersTable/UsersTable';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      todos: null,
      users: null
    }

    this.getTodos = this.getTodos.bind(this);
    this.getUsers = this.getUsers.bind(this);
  }

  async componentDidMount(){
    //Call our fetch function below once the component mounts
    try{
      console.log('componentDidMount - getting Todos & Users');
      const todos = await this.getTodos();
      const users = await this.getUsers();
      // console.log('hi', todos);
      this.setState({ todos, users });
      // this.setState({ todos });
    }
    catch(e){
      throw Error(e);
    }
  }

  async getTodos(){
    console.log('getTodos')
    const response = await fetch('/api/todos');
    console.log('got todos - converting into json - body \n', response)
    const body = await response.json();
    console.log('todos response', body)
    if(response.status !== 200){
      throw Error(body.message)
    }

    return body;
  }

  async getUsers(){
    console.log('getUsers')
    const response = await fetch('/api/users'); 
    const body = await response.json();
    console.log('users response', body)
    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  }
  render() {
    const { classes } = this.props;
    console.log('this.state', this.state)
    return (
      <div className="App">
      {this.state.todos &&
        <EnhancedTable data = {this.state.todos} />

        
      }
      {/* {this.state.users &&
        <UserTable data={this.state.users} />
      }
      { (!this.state.todos || !this.state.users) && <CircularProgress className={classes.progress} />} */}
      </div>
    );
  }
}

export default withStyles(styles)(App);
