import React from 'react'
import axios from 'axios';
import { useState , useEffect } from 'react';
import './Location.css';
export default function Location() {

   const [ countries , setCountries ] = useState([]);
   const [ countryName , setCountryName ] = useState('')
   const [ states , setStates ] = useState([]);
   const [ stateName , setStateName ] = useState('')
   const [ cities , setCities ] = useState([]);
   const [ cityName , setCityName ] = useState('');
   

   useEffect(()=>{
    const fetchCountries =async()=>{
        try{
            const response = await axios.get('https://crio-location-selector.onrender.com/countries')
            setCountries(response.data);    
        }
        catch(err){
            console.error("Error fetching the names",err)
        }
           
    }
    fetchCountries();
   },[])

   useEffect(()=>{
    const fetchStates =async()=>{
        if(countryName){
            try{
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/states`)
        setStates(response.data);
        }      
        catch(error){
            console.error("Error fetching the names",error)
        }     
    }
}
    fetchStates();
   },[countryName])

   useEffect(()=>{
    const fetchCities =async()=>{
        if(stateName){
            try{
        const response = await axios.get(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`)
        setCities(response.data);
        }     
        catch(error){
            console.error("Error fetching the names",error)
        }   
    }    
    }
    fetchCities();
   },[stateName])

   return (
   <div className="location">
    <h1>Select Location</h1>

    <select onChange={(e)=>setCountryName(e.target.value)} defaultValue={countryName}>
        <option value={countryName} disabled>Select Country</option>
        {countries.map((item,index)=>(
            <option value={item} key={index}>{item}</option>
        ))}
    </select>

    <select onChange={(e)=>setStateName(e.target.value)} defaultValue={stateName}>
        <option value={stateName} disabled>Select State</option>
        {states.map((item,index)=>(
            <option value={item} key={index}>{item}</option>
        ))}
    </select>

    <select onChange={(e)=>setCityName(e.target.value)} defaultValue={cityName}>
        <option value={cityName} disabled>Select City</option>
        {cities.map((item,index)=>(
            <option value={item} key={index}>{item}</option>
        ))}
    </select>

    {cityName && stateName && countryName &&
    <p>You selected <strong>{cityName}</strong>, {stateName}, {countryName}</p>
}
   </div>)
}
