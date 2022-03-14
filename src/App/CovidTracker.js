import React, { useEffect, useState } from 'react'
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import { Header, Status, Left, Right } from '../Styles/styledComps';
import { 
    selectCountries, 
    setContries, 
    selectDefault, 
    setDefaultSelect, 
    selectCountryInfo, 
    setCountryInfo,
    selectTableData,
    setTableData,
    selectMapZoom,
    setMapZoom,
    selectMapCountries,
    setMapCountries,
} from '../Redux/Reducer';
import { useDispatch, useSelector } from 'react-redux';
import InfoBox from '../Components/InfoBox';
import Table from '../Components/Table';
import numeral from "numeral";
import MapTracker from '../Components/MapTrack';
import { sortData, prettyPrintStat } from './util';
import useStyles from '../Styles/styles';
import LineGraph from '../Components/LineGraph';
import 'leaflet/dist/leaflet.css';


//*---------------------------------------------------------
const CovidTracker = () => {
    const [mapCenter, setMapCenter] = useState([34.80746, -40.4796 ]);
    const [casesType, setCasesType] = useState("cases");

    const classes = useStyles();

    const dispatch = useDispatch();

    const defaultSelect = useSelector(selectDefault);
    const countries = useSelector(selectCountries);
    const countryInfo = useSelector(selectCountryInfo);
    const tableData = useSelector(selectTableData);
    const mapZoom = useSelector(selectMapZoom);
    const mapCountries = useSelector(selectMapCountries);

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
        .then(response => response.json())
        .then(data => {
            dispatch(setCountryInfo({
                countryInfo: data
            }))
        })
    }, []);

    const getData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
            const countriesC19 = data.map((country) => ({
                name: country.country,
                value: country.countryInfo.iso2
            }));
            const sortedData = sortData(data);
            dispatch(setTableData({
                tableData: sortedData
            }))
            dispatch(setContries({
                countries: countriesC19
            }))
            dispatch(setMapCountries({
                mapCountries: data
            }))
        })
    };
    const selectChange = async (e) => {
        const countryCode = e.target.value;

        const url =
          countryCode === "Worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`
        ;
        await fetch(url)
        .then(response => response.json())
        .then(data => {
            dispatch(setDefaultSelect({
                defaultSelect: countryCode
            }))
            dispatch(setCountryInfo({
                countryInfo: data
            }))
            dispatch(setMapZoom({
                mapZoom: 4
            }))
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            console.log("here>>>>>>>", data);
            console.log("lat---->",data.countryInfo.lat);
            console.log(mapCenter);
        });
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className = {classes.app}>
            <Left>
               <Header>
                  <h1>COVID-19 TRACKER</h1>
                  <FormControl>
                     <Select
                       variant = "outlined"
                       value = {defaultSelect}
                       onChange = {selectChange}
                     >
                       <MenuItem value ="Worldwide">Worldwide</MenuItem>
                       {countries.map((country, key) => (
                           <MenuItem key ={key} value={country.value}>{country.name}</MenuItem>
                       ))}
                     </Select>
                  </FormControl>
               </Header>
               <Status>
                 <InfoBox
                  title = "Coronavirus Cases" 
                  isRed
                  onClick={(e) => setCasesType("cases")}
                  active={casesType === "cases"}
                  cases={prettyPrintStat(countryInfo.todayCases)}
                  total={numeral(countryInfo.cases).format("0.0a")}
                />
                 <InfoBox
                  title = "Recovered" 
                  onClick={(e) => setCasesType("recovered")}
                  active={casesType === "recovered"}
                  cases={prettyPrintStat(countryInfo.todayRecovered)}
                  total={numeral(countryInfo.recovered).format("0.0a")}
                />
                 <InfoBox 
                  title = "Deaths" 
                  isRed
                  onClick={(e) => setCasesType("deaths")}
                  active={casesType === "deaths"}
                  cases={prettyPrintStat(countryInfo.todayDeaths)}
                  total={numeral(countryInfo.deaths).format("0.0a")}      
                />
               </Status>
               <MapTracker countries = {mapCountries} center = {mapCenter} zoom = {mapZoom} casesType = {casesType} />
            </Left>
            <Right>
               <Card className = {classes}>
                  <CardContent>
                      <h3>Live Cases by Country</h3>
                      <Table countries = {tableData} />
                      <h3>Worldwide new {casesType}</h3>
                      <LineGraph />
                  </CardContent>
               </Card>
            </Right>
        </div>
    )
}

export default CovidTracker
