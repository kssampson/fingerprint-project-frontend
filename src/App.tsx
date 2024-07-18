import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, VStack, Heading } from '@chakra-ui/react';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import LoginSuccessful from './components/LoginSuccessful';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <VStack m={6}>
      <SignUpForm />
      <Box>
        <VStack>
        <Heading as='h5' size='md' m={8}>or</Heading>
        </VStack>
      </Box>
      {isLoggedIn ? (
        <LoginSuccessful />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn}/>
      )}
    </VStack>
  );
}

export default App;
