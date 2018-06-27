import React from 'react'
import styled, { css } from 'styled-components'
import LoadComponent, { Loading } from './loading'

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
    heigth: 100%;
    align-items: center;
    input{
      width: 100%;
      height: 35px;
      border: 1px solid #eee;
      border-radius: 5px;
      padding: 0 16px;
    }
    ${Loading}{
      position: absolute;
      left: 0;
      right: 0;
      bottom 25px;
      margin: auto;
    }
    .wrapper-buttons{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100%;
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
      @media (min-width: 996px) {
        flex-direction: row;
        button{
          width: 48%;
        }
      }
    }
  }
`
export default ({toggleShow, handleClick, handleChange, value, loading, show}) => (
  <Modal show={show}>
    <Content>
      <span onClick={toggleShow} className='close'>x</span>
      <form onSubmit={handleClick}>
        <input type='text' onChange={handleChange} value={value} placeholder='Add new item' />
        <div className='wrapper-buttons'>
          <button onClick={handleClick}>Save</button>
          <button
            onClick={e => {
              e.preventDefault()
              toggleShow()
            }}
          >Cancel</button>
        </div>
        {loading && <LoadComponent />}
      </form>
    </Content>
  </Modal>
)
