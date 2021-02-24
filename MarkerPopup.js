import React from 'react'
import { Marker } from 'react-leaflet-universal'
import L from 'leaflet';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';



function MarkerPopup(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const iconRed = new L.Icon({
    iconUrl: require('./images/redZone.png'),
    iconRetinaUrl: require('./images/redZone.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 20),
    className: 'leaflet-div-icon'
});
const iconYellow = new L.Icon({
    iconUrl: require('./images/yellowZone.png'),
    iconRetinaUrl: require('./images/yellowZone.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 20),
    className: 'leaflet-div-icon'
});
const iconGreen = new L.Icon({
    iconUrl: require('./images/greenZone.png'),
    iconRetinaUrl: require('./images/greenZone.png'),
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 20),
    className: 'leaflet-div-icon'
});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Marker onClick={handleClickOpen} position={props.location} opacity="0.8"
                icon={props.safety === "unsafe" ? iconRed : props.safety === "safe" ? iconGreen : iconYellow}/>
      </div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.storeName}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Status: {props.safety}.<br />
            Visitors: {props.visitors} visitors in 14 days.<br/>
            Cases: {props.infVisitors} reported infections.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default MarkerPopup