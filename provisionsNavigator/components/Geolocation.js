
//written by Jo Jackley

// CURRENTLY A TEST AND RECORD OF GEOLOCATION CODE.

import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import axios from 'axios'; // Axios is used for async shenanigans and url calls

// in milliseconds, is how often google maps is checked.
const Timer = 60;// currently a minute.

//the api key, change if another is used.
const API_KEY = "AIzaSyB6B5RD_yRJo4-jwtGvuLDJjI8wNrvRp60";

export default function Geolocation (){

  //Stores latitude and longitude for reference
  const [currLat,setLat]=useState('0');
  const [currLong,setLong] =useState('0');
  
  //radius in meters for the search, max radius is 50000.
  const [radius,setRadius]=useState('40000');
    
  // list of all sources : https://developers.google.com/maps/documentation/places/web-service/supported_types
  // tells the function searchLocation what the searchtype is
  const [searchType, setSearchType] =useState("supermarket");
    
  // list of responses after the search function is called.
  const [searchResponse, setSearchResponse] = useState([]);
  
    //gets current location and stores in currLat and currLong
    const getLocation = async () => {
      let tempUrl='https://www.googleapis.com/geolocation/v1/geolocate?key='+API_KEY;
      axios
        .request({
          method: 'post',
          url:tempUrl,
        })
        .then((response) => {
          //console.log(response.data.location);
          setLat(response.data.location.lat);
          setLong(response.data.location.lng);
          return response.data.location;
        })
        .catch((e) => {
          console.log(e.response);
        });
    };
  
    //using currLat/currLong, radius, and searchType, 
    //returns searchResult which contains all the search results of nearby locations
    const searchLocation = async () => {
      await getLocation;
      let tempUrl="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+currLat+","+currLong+"&radius="+radius+"&type="+searchType+"&key="+API_KEY;
      console.log(tempUrl);
      axios
        .request({
          method: 'post',
          url:tempUrl
        })
        .then((response) => {
          //console.log(response.data);
          setSearchResponse(response.data);
          return response.data.result;
        })
        .catch((e) => {
          console.log(e.response);
        });
    };
  
    //Called to get the information!
    // I couldn't get props passed into work so I'll use a jank variable storage work around!
    // searchType, setSearchType() sets what you are searching for
    // radius, setRadius sets the radius in meters, from 0-15,000
    // searchResponse is all the nearby areas
    const getNearbyPlaces = async () => {
      let tempLat = currLat;
      let tempLong = currLong;
      let currLocation= await getLocation();
      let searchTemp = await searchLocation();
      return searchTemp;
    }

    // this automatically calls the google map api every Timer milliseconds.
    useEffect(()=>{
        const interval = setInterval(()=>{
            console.log('Pretend this is a google maps api call');
            //searchLocation();
        },Timer);
        return () => clearInterval(interval);
    },[]);

    return(
      <View>
      <Button
        onPress={searchLocation}
        title="getLocation"
        color="#841584"
      />
      <Text> Your Location is {currLat} , {currLong} </Text>
      </View>
    );
  }