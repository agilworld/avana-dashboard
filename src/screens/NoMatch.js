import React, { Fragment } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {useSelector} from 'react-redux'
import startCase from "lodash.startcase"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function NoMatch() {
  const classes = useStyles();
  const { menuId } = useSelector(({common})=>common)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (<Fragment>
      <Grid container spacing={3}>
          <Grid item xs={12} md={8} lg={12}>
              <Paper className={fixedHeightPaper}>
                  <Typography variant="h3" component="h2">
                      {menuId.parent?startCase(menuId.parent):'No title'}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                      {menuId.child?startCase(menuId.child):'No subpage'}
                  </Typography>
              </Paper>
          </Grid>
      </Grid>
      <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              </Paper>
          </Grid>
      </Grid>
      <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightPaper}>
              </Paper>
          </Grid>
      </Grid>
    </Fragment>        
  );
}