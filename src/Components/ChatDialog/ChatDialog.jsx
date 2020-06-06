import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import AvatarSelector from 'Components/AvatarSelector';
import UsersAvatar from 'Components/UsersAvatar';
import {
  name as nameValidation,
} from 'Common/validation';

import TitleField from './TitleField';

const validationSchema = Yup.object().shape({
  title: nameValidation,
});

const ChatDialog = ({
  users, onAddChat, onSaveChat, isModify, chat, getUsers, closeChatDialog,
}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [avatarIsModified, setAvatarIsModified] = useState(false);

  const avatarFileInput = useRef();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (isModify) {
      setSelectedUserIds(chat.users);
    }
  }, [chat, isModify]);

  const handleSearchTextChange = (event) => {
    const newSearchText = event.target.value;

    if (!newSearchText) {
      setSearchResult([]);
    } else {
      const newSearchResult = users.filter(
        (value) => value.name.toUpperCase().includes(newSearchText.toUpperCase())
          || value.email.toUpperCase().includes(newSearchText.toUpperCase()),
      );
      setSearchResult(newSearchResult);
    }
    setSearchText(newSearchText);
  };

  const avatarOnChange = () => {
    setAvatarIsModified(true);
  };

  const onSubmit = ({ title }) => {
    const avatar = avatarFileInput.current.files[0];

    if (isModify) {
      let options = { title, users: selectedUserIds };
      if (avatarIsModified) {
        options = {
          ...options,
          avatar: avatarFileInput.current.files[0],
        };
      }

      onSaveChat({ chatId: chat._id, options });
    } else {
      onAddChat({ title, avatar, selectedUserIds });
    }
    closeChatDialog();
  };

  const userSelect = (userId) => {
    const selectedUserIdsFromState = selectedUserIds;

    let newSelectedUserIds;
    if (selectedUserIdsFromState.includes(userId)) {
      newSelectedUserIds = selectedUserIdsFromState.filter(
        (element) => element !== userId,
      );
    } else {
      newSelectedUserIds = [...selectedUserIdsFromState, userId];
    }

    setSelectedUserIds(newSelectedUserIds);
  };

  let avatar;
  if (isModify) {
    avatar = chat.avatar;
  }

  const usersList = !searchText ? users : searchResult;
  return (
    <Dialog open onClose={closeChatDialog}>
      <Formik
        initialValues={{
          title: isModify ? chat.title : '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, submitForm }) => (
          <Form>
            <DialogTitle>{isModify ? 'Modify chat' : 'Add chat'}</DialogTitle>
            <DialogContent>
              <AvatarSelector
                onChange={avatarOnChange}
                avatar={avatar}
                avatarFileInput={avatarFileInput}
              />
              <Field
                component={TitleField}
                name="title"
              />
              <TextField
                margin="normal"
                label="Search"
                fullWidth
                onChange={handleSearchTextChange}
                name="searchText"
                id="searchText"
                color="primary"
                value={searchText}
              />

              <List>
                {usersList.map((value) => (
                  <ListItem
                    button
                    key={value._id}
                    selected={selectedUserIds.includes(value._id)}
                    onClick={() => userSelect(value._id)}
                  >
                    <ListItemAvatar>
                      <UsersAvatar author={value.name} avatar={value.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={`${value.name} (${value.email})`} />
                  </ListItem>
                ))}
              </List>
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button
                type="submit"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                {isModify ? 'Save' : 'Add'}
              </Button>
              <Button onClick={closeChatDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

ChatDialog.defaultProps = {
  chat: undefined,
};

ChatDialog.propTypes = {
  closeChatDialog: PropTypes.func.isRequired,
  onAddChat: PropTypes.func.isRequired,
  onSaveChat: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      email: PropTypes.string,
    }),
  ).isRequired,
  isModify: PropTypes.bool.isRequired,
  chat: PropTypes.shape({
    _id: PropTypes.string,
    avatar: PropTypes.string,
    title: PropTypes.string,
    users: PropTypes.array,
  }),
};

export default ChatDialog;
