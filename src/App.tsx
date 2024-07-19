import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Box, VStack, Heading } from '@chakra-ui/react';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import LoginSuccessful from './components/LoginSuccessful';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [has2FA, setHas2Fa] = useState<boolean>(false);

  return (
    <VStack m={6}>
      <SignUpForm has2FA={has2FA} setHas2Fa={setHas2Fa}/>
      <Box>
        <VStack>
        <Heading as='h5' size='md' m={8}>or</Heading>
        </VStack>
      </Box>
      {isLoggedIn ? (
        <LoginSuccessful />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} has2FA={has2FA} setHas2Fa={setHas2Fa}/>
      )}
    </VStack>
  );
}

export default App;
