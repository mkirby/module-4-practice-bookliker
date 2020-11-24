import React from 'react'
import { Menu } from "semantic-ui-react";

function MenuItem(props) {

  const clickHandler = () => {
    props.selectBookForPreview(props.book)
  }

  return (
  <Menu.Item as={"a"} onClick={clickHandler}>
    {props.book.title}
  </Menu.Item>
  )
}

export default MenuItem