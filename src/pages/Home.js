import React, {useState} from 'react';
import {Box} from "@mui/material"

//components
import HeroBanner from "../components/HeroBanner"
import SearchExcercises from "../components/SearchExcercises"
import Exercises from "../components/Exercises"

function Home() {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box>
      <HeroBanner />
      <SearchExcercises 
        setExercises={setExercises} 
        bodyPart ={ bodyPart} 
        exercises={exercises}
        setBodyPart={setBodyPart}
      />
      <Exercises 
        setExercises={setExercises} 
        bodyPart ={ bodyPart} 
        exercises={exercises}
        setBodyPart={setBodyPart}
      />
    </Box>
  )
}

export default Home