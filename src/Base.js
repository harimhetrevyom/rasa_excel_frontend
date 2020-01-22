import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import AssessmentIcon from '@material-ui/icons/Assessment'
import { Link,useHistory } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import Badge from '@material-ui/core/Badge';


const drawerWidth = 198;


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        // display: 'flex'
    },
    title: {
        flexGrow: 2,
      
      },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        background: '#2E86C1'
    },
    logoContainer: {
        flexGrow: 1,
    },
    logo: {
        maxHeight:40,
        margin:10
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    nested: {
        paddingLeft: theme.spacing(6),
    },
    listRoot: {
        width: '100%',
         maxWidth: 360,
         backgroundColor: theme.palette.background.paper,
      },
}));



const Base = ( props,) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null)
    const theme = useTheme();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openRasaPredictor, setRasaPredictor] = React.useState(false);
    let history=useHistory()

    const open = Boolean(anchorEl)
    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleClose() {
        setAnchorEl(null);
    } 
  
    function handleDrawerOpen() {
      setOpenDrawer(true);
    }
  
    function handleDrawerClose() {
      setOpenDrawer(false);
    }

    function handleOpenRasaPredictor() {
        setRasaPredictor(!openRasaPredictor);
      }  

    const onClickLogout = () => {
        localStorage.clear();
        history.push('/SignIn')
      
      }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={handleDrawerOpen}>
                        <MenuIcon style={{ color: "#364655" }}/>
                    </IconButton>
                    <Typography component="h1" variant="h6" color="blue" noWrap  className={classes.title}>
                        <b>AUTOMATION EDGE NLU </b>
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="Account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            style={{marginLeft:800}} >
                           
                             <Badge color="red" >
                                 <AccountCircleRoundedIcon/>
                            </Badge>
                     
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                         <MenuItem ><Link to="/SignIn">Login</Link></MenuItem>
                         <MenuItem ><Link to="/SignUp">Sign Up</Link></MenuItem>
                         <MenuItem onClick={onClickLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={openDrawer}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>  
                    <Typography component="h1" variant="h6" color="white" noWrap  className={classes.title}>
                        <b>RASA NLU</b>
                    </Typography>          
                     {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    
                    </IconButton>
                   
                </div>
                <Divider />
                <List>
                    <ListItem button key="Rasa Predictor" onClick={handleOpenRasaPredictor}>
                        {/* <ListItemIcon>
                            <AssessmentIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/RasaPredictor">Rasa Predictor</Link>
                        </ListItemText> */}
                        {/* {openFundManager ? <ExpandLess /> : <ExpandMore />} */}
                    </ListItem>

                    {/* <Collapse in={openFundManager} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <AssessmentIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                <Link to='/fund-managers/add'>Add Fund Manager</Link>
                            </ListItemText>
                        </ListItem>
                        </List>
                    </Collapse> */}
                    
                    {/* <ListItem button key="Login" onClick={handleOpenBeneficiaries}>
                        <ListItemIcon>
                            <AssessmentIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            <Link to='/' >Login</Link>
                        </ListItemText>
                        {openBeneficiaries ? <ExpandLess /> : <ExpandMore />}
                    </ListItem> */}
                    {/* <Collapse in={openBeneficiaries} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItem button className={classes.nested}>
                            <ListItemIcon>
                                <AssessmentIcon/>
                            </ListItemIcon>
                            <ListItemText>
                                <Link to='/beneficiaries/add'>Add Beneficiaries</Link>
                            </ListItemText>
                        </ListItem>
                        </List>
                    </Collapse> */}
                </List>
                <Divider />
                <List>
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: openDrawer,
                })}
            >
                { props.children }
            </main>
        </div>
    )
}

export default Base