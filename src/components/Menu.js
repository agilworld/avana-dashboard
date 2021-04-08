import React, { useState, useEffect } from 'react';
import clsx from 'clsx'
import { useHistory } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListIcon from '@material-ui/icons/ListAltOutlined';
import Submenu from "./Submenu"
import menudata from "../data/dummy-menu.json"

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
    }
}));

const Menu = (props) => {
    const classes = useStyles()
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
        <List>
            {menudata.map(menu=><Submenu
                updateToggle={(key) => handleToggle(key??menu.id) }
                isOpen={props.isOpenDrawer}
                name={menu.id}
                submenus={menu?.childs}
                icon={<DashboardIcon color={"#fff"} />}
            />)}            
        </List>
    </Drawer>)
}

export default Menu