import { useEffect, useState } from "react";
import "../App.css";


import InfoBox from "./InfoBox";

import Map from "./Map";
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import Table from "./Table";
import { sortData, prettyPrintStat } from "../util";
import numeral from "numeral";
import Linegraph from "./Linegraph";
import "leaflet/dist/leaflet.css";

const Covid = () => {
    const [mapCountries, setMapCountries] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [countries, setCountries] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);
    const [country, setCountry] = useState("worldwide");
    const [casesType, setCasesType] = useState("cases");
    const [countryInfo, setCountryInfo] = useState({});
    useEffect(() => {
      // start hitting the api and render info to the screen
  
      const getData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
          .then((response) => response.json())
          .then((data) => {
            const countries = data.map((item) => ({
              name: item.country,
              value: item.countryInfo.iso2,
            }));
            const sortedData = sortData(data);
            setTableData(sortedData);
            setMapCountries(data);
            setCountries(countries);
          });
      };
      getData();
    }, []);
  
    useEffect(() => {
      fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => setCountryInfo(data));
    }, []);
    // on country change by clicking at the selection bar the all values will be update
    const onCountryChange = async (e) => {
      const url =
        e.target.value === "worldwide"
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${e.target.value}`;
  
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCountry(e.target.value);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        });
    };
  return (
    <>
          

    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Pendemic status</h1>
          {/* @metarialui start here using FromControl,Select,MenuItem */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {/* shows stats about current cases in numeral form */}
          <InfoBox
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            active={casesType === "cases"}
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            isGreen
            active={casesType === "recovered"}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            active={casesType === "deaths"}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        {/* map component from components folder display map by using leaflet */}
        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
          <h3 style={{ marginTop: "25px" }}>World wide new {casesType}</h3>
          <Linegraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
    
    </>
  );
};

export default Covid
