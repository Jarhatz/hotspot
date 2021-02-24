import React, { Component } from 'react'
import { Map, TileLayer } from 'react-leaflet-universal'
import MarkerPopup from './MarkerPopup'
import fire from "./Fire"

const position = [37.3675, -122.009]
var bigarr = getDocs();

async function getDocs() {
    const storeRef = fire.firestore().collection('stores').doc('list');
    const doc = await storeRef.get();
    
    if (!doc.exists) {
        console.log("doc doesn't exist")
        return [];
    }
    const storeNames = doc.get("stores")
    var arr = []
    
    for (var i=0; i<storeNames.length; i++) {
        const store = fire.firestore().collection('stores').doc(storeNames[i])
        const storeDoc = await store.get()

        if (!storeDoc.exists) {
            arr[i] = null
        } else {
            arr[i] = storeDoc
        }
    }

    bigarr = arr;
    return arr;
}

class AwesomeMap extends Component {

    render() {
        this.arr = bigarr;
        return (
            <Map center={position} zoom={11} style={{height: 500, width: "100%"}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {bigarr.map((store, i, arr) => (
                    <MarkerPopup storeName={store.get("name")} safety={store.get("isSafe")} visitors={store.get("visitors")}
                                 location={store.get("geolocation")} infVisitors={store.get("infectedVisitors")}/>
                ))}
            </Map>
        )
    }
}

export default AwesomeMap