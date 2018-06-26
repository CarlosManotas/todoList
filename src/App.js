import React, { Component } from 'react'
import logo from './logo.svg'
import Load from './loading.gif'
import './App.css'
import styled, { css } from 'styled-components'
import { getItems, addItem, removeItem } from './api'

const Loading = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px auto;
  width: ${props => props.small ? '15px' : '30px'};
  img{
    max-width: 100%
  }
`
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
const Modal = styled.div`
  display: flex;
  visibility: hidden;
  transition: visibility 400ms linear;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.8);
  padding: 16px;
  ${props => props.show && css`
    visibility: visible;
    ${Content}{
      top: 0;
      transition-delay: 200ms;
      transiton-duration: 600ms;
    }
  `}
`
const Content = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  margin: auto;
  position: relative;
  transition-duration: 600ms;
  top: -100vh;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 996px) {
    width: 500px;
    height: 250px;
  }
  .close{
    position: absolute;
    right: 16px;
    top: 16px; 
    cursor: pointer;
  }
  form{
    display: flex;
    flex-direction: column;
    width: 100%;
    input{
      width: 100%;
      height: 35px;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 0 16px;
    }
    .wrapper-buttons{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      button{
        width: 100%;
        height: 35px;
        background-color: #f96332;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        margin-top: 10px;
        color: #fff;
        font-size: 14px;
      }
    }
  }
`
const UlWrapper = styled.ul`
  padding: 0;
  width: 100%;
  max-width: 450px;
  margin: auto;
  list-style: none;
  background: #ddd;
  border-radius: 8px;
  padding-top: 40px;
  margin-top: -30px;
  li{
    text-align: center;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    p{
      margin: 0;
      margin-left: auto;
    }
    a{
      display: inline-block;
      margin-left: auto;
      font-size: .8em;
    }
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
        <Button onClick={this.toggleShow}>Add Item + {loading && <Loading small><img src={Load} alt='loading' /></Loading>}</Button>
        <Modal show={show}>
          <Content>
            <span onClick={this.toggleShow} className='close'>x</span>
            <form onSubmit={this.handleClick}>
              <input type='text' onChange={this.handleChange} value={value} placeholder='Add new item' />
              <div className='wrapper-buttons'>
                <button onClick={this.handleClick}>Save</button>
                <button
                  onClick={e => {
                    e.preventDefault()
                    this.toggleShow()
                  }}
                >Cancel</button>
              </div>
              {loading && <Loading><img src={Load} alt='loading' /></Loading>}
            </form>
          </Content>
        </Modal>
        {listOfItems.length > 0 && (
          <UlWrapper>
            {listOfItems.map((list, index) => <li key={index}><p>{list}</p> <a href='' onClick={e => {
              e.preventDefault()
              this.handleDeleted(list)
            }}>Deleted</a></li>)}
          </UlWrapper>
        )}
      </div>
    )
  }
}

export default App
