import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import classNames from "classnames";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import { DRAWER_WIDTH } from "../common/constants";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Chat from "./Chat";

import { RELOAD_PERIOD } from "../common/constants";

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.reloadChatsList = props.reloadChatsList;
    this.interval = undefined;
  }

  componentDidMount() {
    this.interval = setInterval(this.reloadChatsList, RELOAD_PERIOD);
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
      openModifyChatDialog
    } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !drawerIsOpen && classes.drawerPaperClose
          )
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
          <ListItem button key={"add_chat"} onClick={openAddChatDialog}>
            <AddBoxIcon color="primary" className={classes.addChatIcon} />
            <ListItemText primary={"Add chat"} />
          </ListItem>

          {chats.allIds.map(value => {
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

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  addChatIcon: {
    fontSize: theme.spacing.unit * 7,
    marginLeft: -theme.spacing.unit
  }
});

export default withStyles(styles)(SideBar);
