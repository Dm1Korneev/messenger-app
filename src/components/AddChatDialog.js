import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import UsersAvatar from "./UsersAvatar";
import ListItemText from "@material-ui/core/ListItemText";

// common
import { getUsers } from "../common/messengerAPI";

import { currentUser } from "../common/authentication";

class AddChatDialog extends React.Component {
  constructor(props) {
    super(props);

    const token = props.token;
    const user = currentUser(token);
    const allUsers = props.usersList.filter(
      element => element._id !== user._id
    );

    this.state = {
      open: false,
      user: user,
      title: "",
      searchText: "",
      searchResult: [],
      allUsers,
      selectedUserIds: []
    };
  }

  componentDidMount() {
    const { token } = this.props;
    const { user } = this.state;

    getUsers(token, users => {
      this.setState({
        allUsers: users.filter(element => element._id !== user._id)
      });
    });
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSearchTextChange = event => {
    const { allUsers } = this.state;
    const searchText = event.target.value;

    if (!searchText) {
      this.setState({
        searchText,
        searchResult: []
      });
      return;
    } else {
      const searchResult = allUsers.filter(
        value =>
          value.name.toUpperCase().includes(searchText.toUpperCase()) ||
          value.email.toUpperCase().includes(searchText.toUpperCase())
      );
      this.setState({
        searchText,
        searchResult
      });
    }
  };

  handleSubmit = event => {
    const { onAddChat } = this.props;
    const { title, selectedUserIds } = this.state;

    event.preventDefault();
    onAddChat(title, selectedUserIds);
  };

  userSelect = userId => {
    let { selectedUserIds } = this.state;

    if (selectedUserIds.includes(userId)) {
      selectedUserIds = selectedUserIds.filter(element => element !== userId);
    } else {
      selectedUserIds = [...selectedUserIds, userId];
    }

    this.setState({
      selectedUserIds
    });
  };

  render() {
    const { closeAddChatDialog } = this.props;
    const {
      title,
      selectedUserIds,
      searchText,
      allUsers,
      searchResult
    } = this.state;

    const users = !searchText ? allUsers : searchResult;

    return (
      <Dialog
        open
        onClose={this.handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">Add chat</DialogTitle>
        <DialogContent>
          <ValidatorForm id="validatorForm" onSubmit={this.handleSubmit}>
            <TextValidator
              margin="normal"
              label="Title *"
              fullWidth
              onChange={this.handleInputChange}
              name="title"
              id="title"
              color="primary"
              value={title}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextValidator
              margin="normal"
              label="Search"
              fullWidth
              onChange={this.handleSearchTextChange}
              name="searchText"
              id="searchText"
              color="primary"
              value={searchText}
            />

            <List>
              {users.map(value => (
                <ListItem
                  button
                  key={value._id}
                  selected={selectedUserIds.includes(value._id)}
                  onClick={() => this.userSelect(value._id)}
                >
                  <UsersAvatar author={value.name} avatar={value.avatar} />
                  <ListItemText primary={`${value.name} (${value.email})`} />
                </ListItem>
              ))}
            </List>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" form="validatorForm">
            Add
          </Button>
          <Button onClick={() => closeAddChatDialog()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = theme => ({});

export default withStyles(styles)(AddChatDialog);
