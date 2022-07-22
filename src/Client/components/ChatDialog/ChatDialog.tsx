import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import { Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import {
  name as nameValidation,
} from 'Client/common/validation';
import {
  useChatById, useUsers, useUpdateChat, UseUpdateChatPayload, useCreateChat,
} from 'Client/hooks';
import { User } from 'Client/types';

import { AvatarSelector } from '../AvatarSelector';
import { UsersAvatar } from '../UsersAvatar';

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
    <Dialog onClose={onClose} open>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ isSubmitting, submitForm }) => (
          <Form>
            <DialogTitle>{isModify ? 'Modify chat' : 'Add chat'}</DialogTitle>
            <DialogContent>
              <AvatarSelector
                avatar={avatar}
                avatarFileInput={avatarFileInput}
                onChange={avatarOnChange}
              />
              <Field
                component={TitleField}
                name="title"
              />
              <TextField
                color="primary"
                fullWidth
                id="searchText"
                label="Search"
                margin="normal"
                name="searchText"
                onChange={handleSearchTextChange}
                value={searchText}
              />

              <List>
                {usersList.map((value) => (
                  <ListItemButton
                    key={value._id}
                    onClick={() => userSelect(value._id)}
                    selected={selectedUserIds.includes(value._id)}
                  >
                    <ListItemAvatar>
                      <UsersAvatar author={value.name} avatar={value.avatar} />
                    </ListItemAvatar>
                    <ListItemText primary={`${value.name} (${value.email})`} />
                  </ListItemButton>
                ))}
              </List>
              {isSubmitting && <LinearProgress />}
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                type="submit"
              >
                {isModify ? 'Save' : 'Add'}
              </Button>
              <Button color="primary" onClick={onClose}>
                Close
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  ) : null;
};
