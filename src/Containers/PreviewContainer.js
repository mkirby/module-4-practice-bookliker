import React from "react"
import { Container, Header, Button, List, Image } from "semantic-ui-react";
import UserListItem from "../Components/UserListItem"

class PreviewContainer extends React.Component {
  
  renderLikedUsers = (users) => {
    return Object.entries(this.props.book).length === 0 ? <p>Loading</p> : users.map(user => <UserListItem key={user.id} user={user}/>)
  }

  clickHandler = () => {
    const user = {"id":1, "username":"pouros"}
    this.props.likeBook(this.props.book, user)
  }

  render() {
    const {title, description, img_url, users} = this.props.book
    return (
      <Container text>
            <Header>{title}</Header>
            <Image
              src={img_url}
              alt={title}
              size="small"
            />
            <p>{description}</p>
            <Button
              onClick={this.clickHandler}
              color="red"
              content="Like"
              icon="heart"
              label={{
                basic: true,
                color: "red",
                pointing: "left",
                content: "2,048"
              }}
            />
            <Header>Liked by</Header>
            <List>
              {this.renderLikedUsers(users)}
            </List>
          </Container>
    )
  }
}

export default PreviewContainer