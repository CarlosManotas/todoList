import React from 'react'
import styled from 'styled-components'
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
export default ({ listOfItems, handleDeleted }) => listOfItems.length > 0
  ? (
    <UlWrapper>
      {listOfItems.map((list, index) => <li key={index}><p>{list}</p> <a href='' onClick={e => {
        e.preventDefault()
        handleDeleted(list)
      }}>Deleted</a></li>)}
    </UlWrapper>
  )
  : <UlWrapper><li>No found item</li></UlWrapper>
