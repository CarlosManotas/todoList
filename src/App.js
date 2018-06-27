import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import styled from 'styled-components'
import Modal from './components/modal'
import LoadComponent, { Loading } from './components/loading'
import List from './components/list'
import { getItems, addItem, removeItem } from './api'
const Button = styled.button`
  background-color: #f96332;
  height: 60px;
  border-radius: 8px;
  border: none;
  color: #fff;
  width: 100%;
  max-width: 250px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 60px;
  position: relative;
  &:hover{
    background-color: #f06002;
  }
  &:focus{
    outline: none;
  }
  ${Loading} {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
`
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      value: '',
      listOfItems: [],
      loading: false
    }
    this.toggleShow = this.toggleShow.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDeleted = this.handleDeleted.bind(this)
  }
  componentDidMount () {
    getItems()
      .then(listOfItems => this.setState({listOfItems}))
  }
  toggleShow () {
    const { show } = this.state
    this.setState({ show: !show, value: '' })
  }
  handleChange (e) {
    const value = e.target.value
    this.setState({ value })
  }
  handleClick (e) {
    e.preventDefault()
    const { value } = this.state
    if (value === '') return false
    this.setState({ loading: true })
    addItem(value)
      .then(listOfItems => this.setState({ listOfItems, value: '', show: false, loading: false }))
  }
  handleDeleted (list) {
    this.setState({ loading: true })
    removeItem(list)
      .then(listOfItems => this.setState({ value: '', listOfItems, show: false, loading: false }))
  }
  render () {
    const { show, value, listOfItems, loading } = this.state
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1 className='App-title'>Welcome to React Todo List</h1>
        </header>
        <Button onClick={this.toggleShow}>Add Item + {loading && <LoadComponent small />}</Button>
        <Modal
          show={show}
          toggleShow={this.toggleShow}
          handleChange={this.handleChange}
          value={value}
          handleClick={this.handleClick}
          loading={loading}
        />
        <List listOfItems={listOfItems} handleDeleted={this.handleDeleted} />
      </div>
    )
  }
}

export default App
