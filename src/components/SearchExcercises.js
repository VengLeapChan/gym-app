import React, {useEffect, useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import {fetchData, exerciseOptions} from "../utils/fetchData";

import HorizontalScrollBar from './HorizontalScrollBar';

const SearchExcercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(()=>{
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

      setBodyParts((prev) => ["all", ...bodyPartsData]);
    }

    fetchExercisesData();
  }, [])

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

      // filters for name, equipment, bodyPart, and target
      const searchedExercises = exercisesData.filter((exercise) => exercise.name.toLowerCase().includes(search) || exercise.target.toLowerCase().includes(search) || exercise.equipment.toLowerCase().includes(search) ||exercise.bodyPart.toLowerCase().includes(search));

      setSearch("");
      setExercises(searchedExercises);
    }
  }
  return (
    <Stack
      alignItems="center" 
      mt="37px"
      justifyContent= "center" 
      p="20px">
        <Typography 
          fontWeight={700}
          sx={{fontSize: {lg:'44px', xs: '30px'}}}
          mb="50px"
          textAlign="center"
          >
          Awesome Exercsises You <br /> 
          Should Know
        </Typography>
        <Box 
          position="relative" 
          mb="72px">
            <TextField 
              height="76px"
              value={search}
              onChange={(e) => {setSearch(e.target.value.toLowerCase())}}
              placeholder='Search Me'
              type="text"
              sx={{
                input: {fontWeight: '700', border: "none",
                borderRadius: "4px"},
                width: {lg: '800px', xs:"350px"},
                backgroundColor: "#fff",
                borderRadius: "40px"
              }}>
              
            </TextField>
            <Button 
              className='search-btn'
              sx={{
                bgcolor: "#FF2625",
                color: "#FFF",
                textTransform: "none",
                width: {lg: "175px", xs:"80px"},
                fontSize: {lg:"20px", xs: "14px"},
                height: "56px",
                position: "absolution", right:"0"
              }}
              onClick={handleSearch}>
              Search
            </Button>
         </Box>
         <Box 
          sx={{position: 'relative', width: "100%", p:'20px'}}>
            <HorizontalScrollBar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart}/>
         </Box>
    </Stack>
  )
}

export default SearchExcercises