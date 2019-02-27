import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";

function Message(props) {
  const { isCurrentUserMessage, sameAuthor, classes } = props;
  const { text } = props.message;
  let { author, avatar, dateTime } = props.message;

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  dateTime = new Date(dateTime);
  if (
    now.valueOf() ===
    new Date(
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate()
    ).valueOf()
  ) {
    dateTime = dateTime.toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric"
    });
  } else {
    dateTime = dateTime.toLocaleString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      timezone: "UTC",
      hour: "numeric",
      minute: "numeric"
    });
  }

  if (sameAuthor) {
    author = undefined;
    avatar = undefined;
  }

  const ListItemTextClass = isCurrentUserMessage
    ? classes.ListItemText_reverse
    : classes.ListItemText;

  let ListItemClass = classes.ListItem;
  if (isCurrentUserMessage) {
    ListItemClass += " " + classes.ListItem_reverse;
  }
  if (sameAuthor) {
    ListItemClass += " " + classes.ListItem_sameAuthor;
  }

  return (
    <ListItem className={ListItemClass}>
      <ListItemAvatar className={classes.ListItemAvatar}>
        <Avatar
          alt={author}
          src={avatar}
          className={sameAuthor ? classes.avatarHidden : ""}
        />
      </ListItemAvatar>
      <div className={classes.textContent}>
        <ListItemText
          className={ListItemTextClass}
          primary={
            <Typography
              component="span"
              className={
                classes.ListItemText__author +
                (sameAuthor ? " " + classes.authorTextHidden : "")
              }
            >
              {author}
            </Typography>
          }
          secondary={
            <Typography
              component="span"
              color="textSecondary"
              className={classes.ListItemText__dateTime}
            >
              {dateTime}
            </Typography>
          }
        />
        <ListItemText
          className={ListItemTextClass}
          primary={
            <Typography component="span" className={classes.ListItemText__text}>
              {text}
            </Typography>
          }
        />
      </div>
    </ListItem>
  );
}

const styles = theme => ({
  ListItemText: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: 0,
    paddingLeft: theme.spacing.unit * 2,
    "&:first-child": {
      paddingLeft: theme.spacing.unit * 2
    }
  },
  ListItemText_reverse: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingLeft: 0,
    paddingRight: theme.spacing.unit * 2,
    "&:first-child": {
      paddingRight: theme.spacing.unit * 2
    }
  },
  ListItemAvatar: {
    borderRadius: theme.spacing.unit / 2
  },
  ListItem_reverse: {
    flexDirection: "row-reverse"
  },
  ListItem: {
    alignItems: "start",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: 0
  },
  ListItem_sameAuthor: {
    paddingTop: theme.spacing.unit / 2
  },
  avatarHidden: {
    visibility: "hidden"
  },
  authorTextHidden: {
    visibility: "hidden"
  },
  textContent: {
    flexGrow: 1
  },
  ListItemText__author: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700
  },
  ListItemText__text: {
    fontSize: theme.typography.pxToRem(13)
  },
  ListItemText__dateTime: {
    fontSize: theme.typography.pxToRem(11)
  }
});

export default withStyles(styles)(Message);
