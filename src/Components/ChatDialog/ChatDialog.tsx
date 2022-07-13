import React, { useEffect, useRef, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';

import { User } from 'Types';
import * as Actions from 'Redux/actions';
import { modifyChatDialogIsOpenSelector } from 'Selectors/session';
import { notCurrentUsersSelector } from 'Selectors/users';
import { modifiableChatSelector } from 'Selectors/chats';
import AvatarSelector from 'Components/AvatarSelector';
import UsersAvatar from 'Components/UsersAvatar';
import {
  name as nameValidation,
} from 'Common/validation';

import TitleField from './TitleField';

const validationSchema = Yup.object().shape({
  title: nameValidation,
});

type FromValues = {
  title: string;
}

const ChatDialog = () => {
  const dispatch = useDispatch();

  const users = useSelector(notCurrentUsersSelector);
  const isModify = useSelector(modifyChatDialogIsOpenSelector);
  const chat = useSelector(modifiableChatSelector);

  const [searchText, setSearchText] = useState<string>('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [avatarIsModified, setAvatarIsModified] = useState<boolean>(false);

  const avatarFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(Actions.getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isModify && chat) {
      setSelectedUserIds(chat.users);
    }
  }, [chat, isModify]);

  const closeChatDialog = () => dispatch(Actions.closeChatDialog());

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSubmit = ({ title }: FromValues) => {
    const files = avatarFileInput?.current?.files;
    const avatar = files ? files[0] : undefined;

    if (isModify && chat) {
      const options: Actions.ModifyChatPayload['options'] = {
        title,
        users: selectedUserIds,
      };
      if (avatarIsModified) {
        options.avatar = avatar;
      }

      dispatch(Actions.modifyChat({ chatId: chat._id, options }));
    } else if (!isModify) {
      dispatch(Actions.createChat({ title, avatar, selectedUserIds }));
    }
    closeChatDialog();
  };

  const userSelect = (userId: string) => {
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

  const initialValues: FromValues = {
    title: (isModify ? chat?.title : '') ?? '',
  };

  const avatar = isModify ? chat?.avatar : undefined;

  const usersList = !searchText ? users : searchResult;
  return (
    <Dialog open onClose={closeChatDialog}>
      <Formik
        initialValues={initialValues}
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

export default ChatDialog;
