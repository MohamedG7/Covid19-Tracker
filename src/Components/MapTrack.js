//npm i react-leaflet@3.1.0 @react-leaflet/core@1.0.2
import React from "react";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { WMap } from "../Styles/styledComps";
import { showDataOnMap } from '../App/util';
import ChangeView from "./ChangeView";
import '../Styles/map.css'

function MapTracker({ center, zoom, countries, casesType }) {
  return (
    <WMap>
      <LeafletMap center={center} zoom={zoom}>
        <ChangeView style = {{ position: "absolute"}} center = {center} zoom = {zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </WMap>
  );
}

export default MapTracker;