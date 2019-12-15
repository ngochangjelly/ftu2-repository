import React from 'react';
import moduleStyles from './notfound.module.scss';
import {
  Divider,
  Card,
  CardContent,
  Typography,
  IconButton
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { KeyboardBackspace } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = muiBaseTheme => ({
  iconBtn: {
    width: '25px',
    height: '25px',
    padding: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    transition: '0.3s',
    boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
    '&:hover': {
      boxShadow: '0 16px 70px -12.125px rgba(0,0,0,0.3)'
    }
  },
  media: {
    paddingTop: '56.25%'
  },
  content: {
    textAlign: 'left',
    padding: muiBaseTheme.spacing.unit * 3
  },
  divider: {
    margin: `${muiBaseTheme.spacing.unit * 3}px 0`
  },
  heading: {
    fontWeight: 'bold'
  },
  subheading: {
    lineHeight: 1.8
  },
  avatar: {
    display: 'inline-block',
    border: '2px solid white',
    '&:not(:first-of-type)': {
      marginLeft: -muiBaseTheme.spacing.unit
    }
  }
});

const NotFound = ({ classes }) => {
  return (
    <div className={moduleStyles.wrapper}>
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography
            className={'MuiTypography--heading'}
            variant={'h6'}
            gutterBottom
          >
            Oops, You got 404 Page Not Found
          </Typography>
          <Typography
            className={'MuiTypography--subheading'}
            variant={'caption'}
          >
            Maybe go back and try different options
          </Typography>
          <Divider className={classes.divider} light />
          <Link to={'/'}>
            <IconButton>
              <KeyboardBackspace />
            </IconButton>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
export default withStyles(styles)(NotFound);
