import React from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import PropTypes from "prop-types";

// components
import UsersAvatar from "./UsersAvatar";
import AvatarSelector from "./AvatarSelector";

// @material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

class ChatDialog extends React.Component {
  constructor(props) {
    super(props);
    const { isModify } = props;

    const state = {
      title: "",
      searchText: "",
      searchResult: [],
      selectedUserIds: [],
      titleIsModified: false,
      avatarIsModified: false,
      selectedUserIdsIsModified: false
    };

    if (isModify) {
      const { title, users } = props.chat;
      state.title = title;
      state.selectedUserIds = users;
    }
    this.state = state;
    this.avatarFileInput = React.createRef();
  }

  componentDidMount() {
    const { getUsers } = this.props;
    getUsers();
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      [name + "IsModified"]: true
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

  avatarOnChange = () => {
    this.setState({
      avatarIsModified: true
    });
  };

  handleSubmit = event => {
    const {
      onAddChat,
      onSaveChat,
      closeChatDialog,
      isModify,
      chat
    } = this.props;
    const {
      title,
      selectedUserIds,
      titleIsModified,
      avatarIsModified,
      selectedUserIdsIsModified
    } = this.state;
    const avatar = this.avatarFileInput.current.files[0];

    if (isModify) {
      let options = {};
      if (titleIsModified) {
        options = { ...options, title };
      }
      if (selectedUserIdsIsModified) {
        options = { ...options, users: selectedUserIds };
      }
      if (avatarIsModified) {
        options = {
          ...options,
          avatar: this.avatarFileInput.current.files[0]
        };
      }

      onSaveChat(chat._id, options);
    } else {
      onAddChat(title, avatar, selectedUserIds);
    }
    closeChatDialog();
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
      selectedUserIds,
      selectedUserIdsIsModified: true
    });
  };

  render() {
    const { closeChatDialog, users, isModify, chat } = this.props;
    const { title, selectedUserIds, searchText, searchResult } = this.state;
    const usersList = !searchText ? users : searchResult;

    let avatar;
    if (isModify) {
      avatar = chat.avatar;
    }

    return (
      <Dialog open onClose={closeChatDialog}>
        <DialogTitle>{isModify ? "Modify chat" : "Add chat"}</DialogTitle>
        <DialogContent>
          <ValidatorForm id="validatorForm" onSubmit={this.handleSubmit}>
            <AvatarSelector
              onChange={this.avatarOnChange}
              avatar={avatar}
              avatarFileInput={this.avatarFileInput}
            />
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
            {isModify ? "Save" : "Add"}
          </Button>
          <Button onClick={closeChatDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ChatDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  closeChatDialog: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      email: PropTypes.string
    })
  ),
  isModify: PropTypes.bool.isRequired,
  chat: PropTypes.shape({
    avatar: PropTypes.string
  })
};

const styles = theme => ({});

export default withStyles(styles)(ChatDialog);
