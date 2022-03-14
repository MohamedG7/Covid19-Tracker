import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    countries : [],
    defaultSelect: 'Worldwide',
    countryInfo: {},
    tableData: [],
    data: {},
    mapZoom: 3,
    mapCountries: []
}

const tracker = createSlice({
    name: "tracker",
    initialState,
    reducers: {
        setContries: ( state, action ) => {
            state.countries = action.payload.countries
        },
        setDefaultSelect: ( state, action ) => {
            state.defaultSelect = action.payload.defaultSelect
        },
        setCountryInfo: ( state, action ) => {
            state.countryInfo = action.payload.countryInfo
        },
        setTableData: ( state, action ) => {
            state.tableData = action.payload.tableData
        },
        setData: ( state, action ) => {
            state.data = action.payload.data
        },
        setMapZoom: ( state, action ) => {
            state.mapZoom = action.payload.mapZoom
        },
        setMapCountries: ( state, action ) => {
            state.mapCountries = action.payload.mapCountries
        },
    }
});

export const {
    setContries,
    setDefaultSelect,
    setCountryInfo,
    setTableData,
    setData,
    setMapCountries,
    setMapZoom
} = tracker.actions

export const selectCountries = state => state.tracker.countries;
export const selectDefault = state => state.tracker.defaultSelect;
export const selectCountryInfo = state => state.tracker.countryInfo;
export const selectTableData = state => state.tracker.tableData;
export const selectData = state => state.tracker.data;
export const selectMapZoom = state => state.tracker.mapZoom;
export const selectMapCountries = state => state.tracker.mapCountries;



export default tracker.reducer