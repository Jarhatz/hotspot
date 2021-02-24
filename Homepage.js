import React from 'react';
import fire from './Fire';
import UserData from './UserData';
import AwesomeMap from './AwesomeMap';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
 
function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
 
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
 
function a11yProps(index) {
  return {
    id: `horizontal-tab-${index}`,
    'aria-controls': `horizontal-tabpanel-${index}`,
  };
}
 
const useStyles = makeStyles((theme) => ({
  root: {
    position: "top",
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));
 
function logout() {
  fire.auth().signOut();
}

export default function HorizontalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const user = fire.auth().currentUser;
 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <div style={{
      maxWidth: "70%",
      minWidth: "70%",
      marginTop: '0'}}>
      <Paper className={classes.root} elevation={24} square={false}>
        <Tabs
          orientation="horizontal"
          variant="standard"
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          aria-label="Horizontal Tabs"
          className={classes.tabs}
          centered>
          <Tab style={{marginLeft: '20px', marginRight: '10px'}} label="Profile" {...a11yProps(0)} />
          <Tab style={{marginLeft: '10px', marginRight: '10px'}} label="Self Report" {...a11yProps(1)} />
          <Tab style={{marginLeft: '10px'}} label="Map" {...a11yProps(2)} />
          <Button style={{maxWidth: '100px', marginLeft: 'auto', marginRight: '20px',
                          maxHeight: '50px', minWidth: '200px', minHeight: '50px'}}
                          variant="outlined" color="secondary" disableElevation onClick={logout}>Logout</Button>
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography variant="h5" component="h2">Welcome!</Typography><br/>
          <Typography color="textSecondary">Account Information:</Typography><br/>
          Email: <TextField disabled id="outlined-basic" label={user == null ? "Loading..." : String(user.email)} variant="outlined" name="email" type="email" style={{width: 400}}/>
          <br/><br/>Name: <TextField disabled id="outlined-basic" label={user == null ? "Loading..." : "John Ericsson"} variant="outlined" name="name" type="name" style={{width: 400}}/>
          <br/><br/>Infected: 
          <FormControl variant="outlined">
            <InputLabel id="simple-select-outlined-label">covid</InputLabel>
            <Select
              labelId="simple-select-outlined-label"
              id="simple-select-outlined"
              name="infected"
              value={false}
              label="covid">
              <MenuItem value={false}>No</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
            </Select>
            <Typography variant="body2" component="p">corona virus symptoms (flu-like symptoms, coughing, etc)</Typography>
          </FormControl>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserData/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AwesomeMap/>
        </TabPanel>
      </Paper>
    </div>
  );
}