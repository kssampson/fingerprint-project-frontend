import React, { useEffect, useState } from 'react';
import './App.css';
import { Box, VStack, Heading, useDisclosure } from '@chakra-ui/react';
import SignUpForm from './components/SignUpForm';
import Login from './components/Login';
import LoginSuccessful from './components/LoginSuccessful';
import TwoFAModal from './components/TwoFAModal';
import VerifiedLogin from './components/VerifiedLogin';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [has2FA, setHas2Fa] = useState<boolean>(false);
  const [token, setToken] = useState<null | string>(null);
  const [toggleHasTokenModal, setToggleHasTokenModal] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token) {
      setToken(token);
      setToggleHasTokenModal(true);
    }
  }, []);

  return (
    <VStack m={6}>
      {toggleHasTokenModal ? (
        <>
        <VerifiedLogin setToggleHasTokenModal={setToggleHasTokenModal} token={token} setToken={setToken} setIsLoggedIn={setIsLoggedIn}/>
        </>
      ) : (
        <>
          {isLoggedIn ? (
            <LoginSuccessful />
          ) : (
            <>
            <SignUpForm has2FA={has2FA} setHas2Fa={setHas2Fa}/>
          <Box>
            <VStack>
            <Heading as='h5' size='md' m={8}>or</Heading>
            </VStack>
          </Box>
            <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} setIsLoggedIn={setIsLoggedIn} />
            </>
          )}
          <TwoFAModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
        </>
      )}
    </VStack>
  );
}

export default App;
