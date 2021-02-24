import React, {Component} from 'react';
import fire from './Fire';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert'
import KNN from 'ml-knn';
import VirtualizedList from './LocationList';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';

var locations = getLocations()

async function getLocations(email="johnericsson@gmail.com") {
    const thisUser = fire.auth().currentUser;
    if (thisUser || !thisUser) {
        const userRef = fire.firestore().collection('users').doc(email);
        const doc = await userRef.get()

        if (!doc.exists) {
            console.log("doc doesn't exist")
            return [];
        }
        const storeNames = doc.get("visitedStores")
        const storeTimes = doc.get("visitedTimes")

        var arr = [storeNames, storeTimes]
        locations = arr
        return arr
    }
}

async function runKnnModel() {
    var x_data = locations;
    var y_data = []

    for (var i=0; i<locations[0].length; i++) {
        const ref = fire.firestore().collection('stores').doc(name).get();
        const doc = await userRef.get()

        y_data[i] = doc.get("isSafe")
    }

    var kNN = new KNN(dataset, predictions);
    kNN.setDiv([20, 75])
    var prediction = kNN.predict(locations[0]).match()

    return prediction;
}

const useStyles = makeStyles((theme) => ({
    root: {
      height: 300,
      backgroundColor: theme.palette.background.paper,
      marginLeft: '100px',
      marginRight: '100px'
    },
  }));
  
function renderRow(props) {
    const { index, style } = props;

    return (
        <ListItem button style={style} key={index}>
        <ListItemText primary={locations[0][index]} />
        <Button variant="contained" color="secondary" disableElevation
                onClick={() => {this.changeText("Removed"); this.setColor("#BBBBBB")}}>Delete</Button>
        </ListItem>
    );
}
  
renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };
  
function VirtualizedList(props) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <FixedSizeList height={400} width="100%" itemSize={100} itemCount={locations[0].length}>
          {renderRow}
        </FixedSizeList>
      </div>
    );
  }

class UserData extends Component {

    render() {
        var prediction = String(runKnnModel());
        let color, message;
        if (prediction === "safe") {
            color = "info"
            message = "By our estimations, you are safe! Keep Social distancing!"
        } else if (prediction === "unsafe") {
            color = "error"
            message = "By our estimations, you are likely to have Covid-19. Please get tested and self-quarantine."
        } else {
            color = "warning"
            message = "By our estimations, you might have Covid-19. Please self-quaritine."
        }
        return (
            <div>
                <Alert id="mainAlert" severity={color}>{message}</Alert>
                <br/> <br/>
                <Typography variant="h6" component="h2">Stores we think you have visited:</Typography>
                <VirtualizedList />
            </div>
        )
    }

}

export default UserData;