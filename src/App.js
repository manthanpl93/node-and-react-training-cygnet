import React, { useEffect } from 'react'
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';
import API from "./lib/api";
export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputText: "",
      todos: [],
      status: "all",
      filteredTodos: []
    }
  }

  componentDidMount = () => {
    this.fetchTodos()
  }

  render() {
    const { todos, inputText, filteredTodos } = this.state;
    return (
      <div className="App">
        <header>
          <h1>Cygnet's Todo List</h1>
        </header>

        <Form todos={todos}
          setTodos={this.setTodos}
          inputText={inputText}
          setInputText={this.setInputText}
          setStatus={this.setStatus} />

        <TodoList todos={filteredTodos} setTodos={this.setTodos} />
      </div>
    );
  }

  filterHandler = () => {
    const { todos, status } = this.state;
    switch (status) {
      case 'completed':
        this.setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        this.setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        this.setFilteredTodos(todos)
        break;
    }
  }

  fetchTodos = async () => {
    const todos = await API.todos.getAll();
    this.setTodos(todos);
  }

  setFilteredTodos = (todos) => {
    this.setState({
      filteredTodos: todos
    })
  }

  setInputText = (input) => {
    this.setState({
      inputText: input
    })
  }

  setStatus = (status) => {
    this.setState({
      status: status
    }, () => {
      this.filterHandler();
    })
  }

  setTodos = (todos) => {
    this.setState({
      todos: todos
    }, () => {
      this.filterHandler();
    })
  }

}
