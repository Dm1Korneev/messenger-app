import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import UsersAvatar from "./UsersAvatar";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: undefined
    };
  }

  handlerAvatarChange = event => {
    if (!event.target.files.length) {
      return;
    }

    const avatar = URL.createObjectURL(event.target.files[0]);

    this.setState({
      avatar
    });
  };

  render() {
    const { avatar } = this.state;
    const { classes, avatarFileInput } = this.props;

    return (
      <div className={classes.avatarSelector}>
        <div className={classes.avatar}>
          <UsersAvatar avatar={avatar} size={60} />
        </div>
        <div className={classes.avatarSelector__labalButtons}>
          <InputLabel>
            <span>Avatar</span>
            <input
              accept="image/*"
              style={{ display: "none" }}
              onChange={this.handlerAvatarChange}
              type="file"
              ref={avatarFileInput}
            />
            <div className={classes.avatarSelector__buttons}>
              <Button variant="outlined" component="span" size="small">
                <CloudUploadIcon className={classes.leftIcon} />
                Upload
              </Button>
            </div>
          </InputLabel>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  avatar: { marginRight: theme.spacing.unit * 2 },
  avatarSelector: {
    marginTop: theme.spacing.unit * 2,
    display: "flex"
  },
  avatarSelector__labalButtons: {
    display: "flex",
    flexDirection: "column"
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  avatarSelector__buttons: {
    marginTop: theme.spacing.unit,
    display: "flex",
    flexDirection: "row"
  }
});

export default withStyles(styles)(AvatarSelector);
