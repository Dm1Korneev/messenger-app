import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import AddBoxIcon from '@material-ui/icons/AddBox';

import { DRAWER_WIDTH, RELOAD_PERIOD } from 'Common/constants';

import Chat from './Chat';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.getChats = props.getChats;
    this.interval = undefined;
  }

  componentDidMount() {
    this.interval = setInterval(this.getChats, RELOAD_PERIOD);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const {
      drawerIsOpen,
      chats,
      activeChat,
      onDrawerClose,
      classes,
      changeActiveChat,
      openAddChatDialog,
      openModifyChatDialog,
    } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !drawerIsOpen && classes.drawerPaperClose,
          ),
        }}
        open={drawerIsOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={onDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="add_chat" onClick={openAddChatDialog}>
            <AddBoxIcon color="primary" className={classes.addChatIcon} />
            <ListItemText primary="Add chat" />
          </ListItem>

          {chats.allIds.map((value) => {
            const chat = chats.byId[value];
            const { _id } = chat;
            return (
              <Chat
                chat={chat}
                key={_id}
                selected={_id === activeChat}
                chatOnClick={changeActiveChat}
                chatModifyOnClick={openModifyChatDialog}
              />
            );
          })}
        </List>
      </Drawer>
    );
  }
}

SideBar.defaultProps = {
  activeChat: null,
  chats: [],
};
SideBar.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  getChats: PropTypes.func.isRequired,
  drawerIsOpen: PropTypes.bool.isRequired,
  chats: PropTypes.shape({
    allIds: PropTypes.arrayOf(PropTypes.string),
    byId: PropTypes.object,
  }),
  activeChat: PropTypes.string,
  onDrawerClose: PropTypes.func.isRequired,
  changeActiveChat: PropTypes.func.isRequired,
  openAddChatDialog: PropTypes.func.isRequired,
  openModifyChatDialog: PropTypes.func.isRequired,
};

const styles = (theme) => ({
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  addChatIcon: {
    fontSize: theme.spacing.unit * 7,
    marginLeft: -theme.spacing.unit,
  },
});

export default withStyles(styles)(SideBar);
