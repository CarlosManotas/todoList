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
      span{
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`
export default ({ listOfItems, handleDeleted, handleUpdate }) => listOfItems.length > 0
  ? (
    <UlWrapper>
      {listOfItems.map(list => (
        <li key={list.id}>
          <p>{list.name}</p>
          <a><span onClick={() => handleUpdate(list)}>Edit/ </span><span onClick={() => handleDeleted(list.id)}> Deleted</span></a>
        </li>
        ))
      }
    </UlWrapper>
  )
  : <UlWrapper><li>No found item</li></UlWrapper>
