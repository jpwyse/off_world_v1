import React from "react"
import styled from "styled-components"

// styles
const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: ".";
    width: 1em;
    text-align: left;
    margin-top 40px;
    font-family: "VT323", monospace;
    font-size: 75px;
  }
  @keyframes ellipsis {
    0% {
      content: ".";
    }
    33% {
      content: "..";
    }
    66% {
      content: "...";
    }
  }
`

// return
export default props => {
  return <Dots>{props.children}</Dots>
}