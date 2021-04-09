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
        paddingTop:16,
        paddingBottom:16,
    },
    listItemText: {
        paddingLeft: 2,
        color:'#ccc',
        fontSize: '1rem',
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
    isShowed,
    submenus
}) => {
        const history = useHistory()
        const [isCollapsed, setIsCollapsed] = useState(false)
        const dispatch = useDispatch()
        const { menuId } = useSelector(({common})=>common)

        const handleToggle = (key) => {
            setIsCollapsed(!isCollapsed)
            if( !submenus ) {
                //
                dispatch(setActiveMenu({
                    parent:key,
                    child:null
                }))
                updateToggle()
            } 
        }

        const handleChildToggle = (parentMenu, menu) => {
            if( !menu.isAllowed ) {
                return
            }
            updateToggle(menu.id)
            dispatch(setActiveMenu({
                parent:parentMenu,
                child:menu.id
            }))
        }

        if( ! isShowed ) {
            return null
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
                    {submenus.map(submenu=><SubListItem 
                            parentId={name}
                            menuId={menuId} 
                            classname={classes.nested}
                            submenu={submenu} 
                            handleChildToggle={handleChildToggle} 
                        />
                    )}
                </List>
                <Divider />
            </Collapse>) : null}
        </Fragment>)
    }

const SubListItem = ({
    handleChildToggle,
    menuId,
    submenu,
    classname,
    parentId
}) => {
    if( ! submenu.isShowed ) {
        return null
    }
    return (
        <ListItem
            dense
            button
            className={classname}
            selected={menuId ? (menuId.child === submenu.id ? true:false) : false}
            onClick={()=>handleChildToggle(parentId, submenu)}
        >
            <ListItemText
                primary={startCase(submenu.id)}
            />
        </ListItem>
    )
}

const enhance = withStyles(styles)(SubMenu)

export default enhance
