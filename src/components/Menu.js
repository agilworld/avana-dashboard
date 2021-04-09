import React, { useState, useEffect } from 'react';
import clsx from 'clsx'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Grid from "@material-ui/core/Grid"
import Avatar from "@material-ui/core/Avatar"
import Submenu from "./Submenu"
import menudata from "../data/dummy-menu.json"
import Logo from "../data/logo.png"
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      fontSize:'1rem',
      ...theme.mixins.toolbar,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      background:'#222',
      width: 240,
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
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    profileWrapper:{
      margin:'20px 0px'
    },
    avatar:{
      width:props => props.isOpenDrawer?60:40,
      height:props => props.isOpenDrawer?60:40,
    },
    listItem: {
        paddingLeft: '1rem',
        paddingTop:16,
        paddingBottom:16,
    },
    listItemText: {
        paddingLeft: 2,
        color:'#ccc',
        fontSize: '1rem',
    },
}));

const Menu = (props) => {
    const classes = useStyles(props)
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)
    
    const onLogout = () => {
      props.onLogout()
    }
    const handleToggle = (key='/') => {
        setIsOpen(!isOpen)
        history.push(key)
    }
    
    useEffect(() => {
        console.log(menudata)
    }, []);

    return (<Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
        }}
        open={props.open}>
            <div className={classes.toolbarIcon}>
              <IconButton onClick={props.handleDrawerClose}>
                  <ChevronLeftIcon />
              </IconButton>
            </div>
        <Divider />
        <div className={classes.profileWrapper}>
            <Grid container spacing={2} direction={"column"} justify="center" alignItems={"center"}>
              {props.isOpenDrawer && <Grid item>
                <img width={150} src={Logo} alt="Logo Avana" />
              </Grid>}

              <Grid item>
                <Avatar src={'https://gravatar.com/avatar/2bf2ede75e6b75e8f6223d5aff4ea033?s=400&d=robohash&r=x'} className={classes.avatar} />
              </Grid>
              
              {props.isOpenDrawer && <Grid item>
                <Typography variant={'subtitle1'}>Dian Afrial R Ragil</Typography>
              </Grid>}
              
            </Grid>
        </div>
        <List>
            <ListItem
                    dense
                    button
                    onClick={()=>history.push('/')}
                    className={classes.listItem}
                >
                  <ListItemIcon><DashboardIcon style={{color:"#ccc"}} /></ListItemIcon>
                  <ListItemText
                      inset
                      primary={'Main View'}
                      className={classes.listItemText}
                  />
              </ListItem>
            {menudata.map(menu=><Submenu
                updateToggle={(key) => handleToggle(key??menu.id) }
                isOpen={props.isOpenDrawer}
                name={menu.id}
                isShowed={menu.isShowed}
                submenus={menu?.childs}
                icon={<DashboardIcon style={{color:"#ccc"}} />}
            />)}            
        </List>
    </Drawer>)
}

export default Menu