import React from "react";
import { Menu } from "semantic-ui-react";
import MenuItem from "./Components/MenuItem"
import PreviewContainer from "./Containers/PreviewContainer";

class App extends React.Component {

  state = {
    api: [],
    preview: {}
  }

  componentDidMount() {
    fetch(`http://localhost:3000/books`)
    .then(r=>r.json())
    .then(data => this.setState({api: data, preview: data[0]}))
  }

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item header>Bookliker</Menu.Item>
        </Menu>
        <main>
          <Menu vertical inverted>
            {this.renderMenuItemTitles()}
          </Menu>
          <PreviewContainer book={this.state.preview} likeBook={this.likeBook}/>
        </main>
      </div>
    );
  }

  renderMenuItemTitles = () => {
    return this.state.api.map(book => <MenuItem key={book.id} book={book} selectBookForPreview={this.selectBookForPreview}/>)
  }

  selectBookForPreview = (book) => {
    this.setState({preview: book})
  }

  likeBook = (book, user) => {
    const newApi = [...this.state.api]
    const index = newApi.findIndex(b => b.id === book.id)
    const bookToUpdate = newApi[index]

    if (bookToUpdate.users.find(e => e.id === user.id)) {
      const userIndex = bookToUpdate.users.findIndex(e => e.id === user.id)
      bookToUpdate.users.splice(userIndex, 1)
    } else {
      bookToUpdate.users = [...book.users, user]
    }

    this.patchBook(book.id, {users: bookToUpdate.users})
    .then(() => this.setState({api: newApi}))
  }

  patchBook = (id, data) => {
    return fetch(`http://localhost:3000/books/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accepts: "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(r=>r.json())
  }
}

export default App;
