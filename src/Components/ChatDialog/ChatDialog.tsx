import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import {
  name as nameValidation,
} from 'Common/validation';
import { AvatarSelector } from 'Components/AvatarSelector';
import { UsersAvatar } from 'Components/UsersAvatar';
import {
  useChatById, useUsers, useUpdateChat, UseUpdateChatPayload, useCreateChat,
} from 'Hooks';
import { User } from 'Types';

import TitleField from './TitleField';

const validationSchema = Yup.object().shape({
  title: nameValidation,
});

type FromValues = {
  title: string;
}

type ChatDialogProps = {
  chatId?: string
  onClose: ()=>void
  isModify?: boolean
}

export const ChatDialog = ({ chatId, onClose, isModify }: ChatDialogProps) => {
  const { data: users } = useUsers();
  const { data: chat } = useChatById(chatId);
  const { mutate: updateChat } = useUpdateChat();
  const { mutate: createChat } = useCreateChat();

  const [searchText, setSearchText] = useState<string>('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [avatarIsModified, setAvatarIsModified] = useState<boolean>(false);

  const avatarFileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isModify && chat) {
      setSelectedUserIds(chat.users);
    }
  }, [chat, isModify]);

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
      const modifyData: UseUpdateChatPayload = {
        title,
        users: selectedUserIds,
      };
      if (avatarIsModified) {
        modifyData.avatar = avatar;
      }

      updateChat({ chatId: chat._id, modifyData });
    } else if (!isModify) {
      createChat({ title, avatar, users: selectedUserIds });
    }
    onClose();
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
  return !isModify || chat ? (
    <Dialog open onClose={onClose}>
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
              <Button onClick={onClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  ) : null;
};
