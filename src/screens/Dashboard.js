import Reac, {Fragment, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import {useSelector, useDispatch} from 'react-redux'
import startCase from "lodash.startcase"
import { updateMenu } from "../actions/common"


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { menus } = useSelector(({common})=>common)

  const handleToggle = (menu) => {
    // udpate menu
    menu = {...menu, isShowed:!menu.isShowed}
    // find processing
    let am = menus
    let idx = menus.findIndex(mn=>{
      return mn.id === menu.id
    })
    if( idx > -1) {
      am.splice(idx, 1, menu)
    }
    dispatch(updateMenu(am))
  }

  const handleSubToggle = (menu, submenu) => {
    // udpate menu
    submenu = {...submenu, isShowed:!submenu.isShowed}
    // find processing
    let am = menus
    let idxParent = menus.findIndex(mn=>{
      return mn.id === menu.id
    })

    let idxChild = menu.childs.findIndex(mn=>{
      return mn.id === submenu.id
    })
    
    if( idxChild > -1) {
      am[idxParent].childs.splice(idxChild, 1, submenu)
    }
    dispatch(updateMenu(am))
  }

  return (
    <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={12}>
            <Paper className={fixedHeightPaper}>
              <Typography variant="h4">Main Settting</Typography>
              <List className={classes.root}>
                {menus.map(menu=>{
                   const labelId = `checkbox-list-label-${menu.id}`;
                  return (<Fragment>
                      <ListItem 
                        key={menu.id} role={undefined} dense button 
                        onClick={()=>handleToggle(menu)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={menu.isShowed}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={startCase(menu.id)} />
                    </ListItem>
                    {menu.childs && <List style={{paddingLeft:36}}>
                        {menu.childs.map(submenu=>{
                          const sublabelId = `checkbox-list-label-${submenu.id}`;
                          return(<ListItem 
                            key={submenu.id} role={undefined} dense button 
                            onClick={()=>handleSubToggle(menu, submenu)}>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={submenu.isShowed}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': sublabelId }}
                              />
                            </ListItemIcon>
                            <ListItemText id={sublabelId} primary={startCase(submenu.id)} />
                        </ListItem>)}
                    )}

                    </List>}
                  </Fragment>)
              })}
              </List>
              
            </Paper>
        </Grid>
    </Grid>
             
  );
}