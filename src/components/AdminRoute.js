import React, {useState} from "react"
import { Route, Redirect } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import clsx from 'clsx'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Menu from "./Menu"
import Header from "./Header"

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24// keep right padding when drawer closed
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto'
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
}))

const AdminRoute = ({ component: Component,  auth, ...rest }) => {
    const classes = useStyles()
    const history = useHistory()
    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };  

    const onLogout = () => {
        history.push('/')
    }

    return (<Route {...rest}
            render={props => <div className={classes.root}>
            <CssBaseline />
            <Header title={rest?.name} open={open} 
                handleDrawerOpen={handleDrawerOpen} 
                handleDrawerClose={handleDrawerClose} 
            />
            <Menu open={open} 
                onLogout={onLogout}
                isOpenDrawer={open}
                handleDrawerOpen={handleDrawerOpen} 
                handleDrawerClose={handleDrawerClose} 
            />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Component {...props} />
                </Container>
            </main>
        </div>}
    />)
}

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  common: state.common
});

export default connect(mapStateToProps)(AdminRoute);
