import React from 'react'
import styled from 'styled-components'
import Load from '../loading.gif'
export const Loading = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px auto;
  width: ${props => props.small ? '15px' : '30px'};
  img{
    max-width: 100%
  }
`
export default ({small}) => <Loading small={small}><img src={Load} alt='loading' /></Loading>
