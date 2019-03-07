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

class AddChatDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      title: "",
      searchText: "",
      searchResult: [],
      selectedUserIds: []
    };
  }

  componentDidMount() {
    const { loadAllUsers } = this.props;
    loadAllUsers();
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
    const { users } = this.props;
    const searchText = event.target.value;

    if (!searchText) {
      this.setState({
        searchText,
        searchResult: []
      });
      return;
    } else {
      const searchResult = users.filter(
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
    const { onAddChat, closeAddChatDialog } = this.props;
    const { title, selectedUserIds } = this.state;

    onAddChat(title, selectedUserIds);
    closeAddChatDialog();
  };

  userSelect = userId => {
    const selectedUserIdsFromState = this.state.selectedUserIds;

    let selectedUserIds;
    if (selectedUserIdsFromState.includes(userId)) {
      selectedUserIds = selectedUserIdsFromState.filter(
        element => element !== userId
      );
    } else {
      selectedUserIds = [...selectedUserIdsFromState, userId];
    }

    this.setState({
      selectedUserIds
    });
  };

  render() {
    const { closeAddChatDialog, users } = this.props;
    const { title, selectedUserIds, searchText, searchResult } = this.state;
    const usersList = !searchText ? users : searchResult;

    return (
      <Dialog open onClose={() => closeAddChatDialog()}>
        <DialogTitle>Add chat</DialogTitle>
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
              {usersList.map(value => (
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
