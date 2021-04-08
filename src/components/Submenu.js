import React, { Fragment, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom"
import startCase from "lodash.startcase"
import { setActiveMenu } from "../actions/common"

const styles = {
    listItem: {
        paddingLeft: '1rem',
        paddingTop:10,
        paddingBottom:10,
    },
    listItemText: {
        paddingLeft: 2,
        color:'#fff',
        fontSize: '1rem',
    },
    sidebarIsOpen: {
        paddingLeft: 25,
        transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    sidebarIsClosed: {
        paddingLeft: 0,
        transition: 'padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
    },
    nested:{
        paddingLeft: 24,
    }
};

const SubMenu = ({
    updateToggle,
    isOpen,
    name,
    icon,
    classes,
    children,
    submenus
}) => {
        const history = useHistory()
        const [isCollapsed, setIsCollapsed] = useState(false)
        const dispatch = useDispatch()
        const { menuId } = useSelector(({common})=>common)

        const handleToggle = (key) => {
            setIsCollapsed(!isCollapsed)
            if( !submenus ) {
                //updateToggle()
                dispatch(setActiveMenu({
                    parent:key
                }))
            }
        }

        const handleChildToggle = (parentMenu, key) => {
            updateToggle(key)
            dispatch(setActiveMenu({
                parent:parentMenu,
                child:key
            }))
        }

        return (<Fragment>
            <ListItem
                dense
                button
                selected={menuId ? (menuId.parent === name ? true:false) : false}
                onClick={()=>handleToggle(name)}
                className={classes.listItem}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                    inset
                    primary={isOpen ? startCase(name) : ''}
                    className={classes.listItemText}
                />
                {submenus && (isCollapsed ? <ExpandMore /> : <ChevronRightIcon />)}
            </ListItem>
            {submenus ? (isOpen && <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
                <List
                    dense
                    component="div"
                >
                    {submenus.map(submenu=>
                        <ListItem
                            dense
                            button
                            className={classes.nested}
                            selected={menuId ? (menuId.child === submenu.id ? true:false) : false}
                            onClick={()=>handleChildToggle(name, submenu.id)}
                        >
                            <ListItemText
                                primary={startCase(submenu.id)}
                            />
                        </ListItem>
                    )}
                </List>
                <Divider />
            </Collapse>) : null}
        </Fragment>)
    }

const enhance = withStyles(styles)(SubMenu)

export default enhance
