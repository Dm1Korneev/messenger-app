import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// @material-ui
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

function getDateTimeText(value) {
  if (value) {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    if (
      now.valueOf() ===
      new Date(value.getFullYear(), value.getMonth(), value.getDate()).valueOf()
    ) {
      return value.toLocaleString(undefined, {
        hour: "numeric",
        minute: "numeric"
      });
    } else {
      return value.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric"
      });
    }
  }
}

function MessageDateTime(props) {
  const { isCurrentUserMessage, children, classes } = props;
  const dateTime = getDateTimeText(props.dateTime);

  let ListItemTextClass = classNames(
    classes.ListItemText,
    !isCurrentUserMessage && classes.reverse
  );

  const ListItemClass = classNames(
    classes.ListItem,
    isCurrentUserMessage && classes.reverse
  );

  return (
    <ListItem className={ListItemClass}>
      <div className={classes.textContent}>
        <ListItemText
          className={classNames(ListItemTextClass, classes.sticky)}
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
        {children}
      </div>
    </ListItem>
  );
}

MessageDateTime.propTypes = {
  classes: PropTypes.object.isRequired,
  isCurrentUserMessage: PropTypes.bool.isRequired,
  children: PropTypes.element
};

const styles = theme => ({
  ListItemText: {
    backgroundColor: theme.palette.background.default,
    zIndex: 1000,
    width: "50%",
    display: "flex",
    justifyContent: "space-between",
    "&:first-child": {
      paddingLeft: theme.spacing.unit * 2
    }
  },
  reverse: {
    flexDirection: "row-reverse",
    alignSelf: "flex-end"
  },
  ListItem: {
    alignItems: "start",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0
  },
  textContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  ListItemText__dateTime: {
    fontSize: theme.typography.pxToRem(11)
  },
  sticky: {
    position: "sticky",
    top: 0
  }
});

export default withStyles(styles)(MessageDateTime);
