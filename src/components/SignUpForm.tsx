import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { validateInputs } from "../utils/validateInputs";
import createUserSubmit from "../utils/createUserSubmit";
import { useToast } from '@chakra-ui/react'
import FingerprintJS from '@fingerprintjs/fingerprintjs';

type Props = {
  has2FA: boolean;
  setHas2Fa: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm = ( { has2FA, setHas2Fa }: Props ) => {

  const toast = useToast();

  const [fPHash, setFpHash] = useState<string | null>(null);

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("")

  const [usernameSubmitted, setUsernameSubmitted] = useState<boolean>(false);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState<boolean>(false);
  const [secondPasswordSubmitted, setSecondPasswordSubmitted] = useState<boolean>(false);

  const isErrorUsername = !validateInputs.isValidUsername(username) && usernameSubmitted;
  const isErrorEmail = !validateInputs.isValidEmail(email) && emailSubmitted;
  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;
  const isErrorSecondPassword = !validateInputs.isValidSecondPassword(password, secondPassword) && secondPasswordSubmitted;

  const onChangeusername = (e: any) => {
    setUsernameSubmitted(false);
    setUsername(e.target.value);
  }

  const onChangeEmail = (e: any) => {
    setEmailSubmitted(false);
    setEmail(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setPasswordSubmitted(false)
    setPassword(e.target.value);
  }

  const onChangeSecondPassword = (e: any) => {
    setSecondPasswordSubmitted(false);
    setSecondPassword(e.target.value);
  }

  const onSubmit = async () => {
    try {
      setUsernameSubmitted(true);
      setEmailSubmitted(true);
      setPasswordSubmitted(true);
      setSecondPasswordSubmitted(true);

      if (!validateInputs.isValidUsername(username) || !validateInputs.isValidEmail(email) || !validateInputs.isValidPassword(password) || !validateInputs.isValidSecondPassword(password, secondPassword)) {
        return;
      }

      const response = await createUserSubmit({
        username: username,
        email: email,
        password: password,
        visitorId: fPHash,
        has2FA: has2FA
      });

      if (response.success === false) {
        toast({
          title: `Error:`,
          position: "top-right",
          description: `${response.message}`,
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
      } else if (response.success === true) {
        toast({
          title: `Success!`,
          position: "top-right",
          description: `${response.message} Please Log-in.`,
          status: 'success',
          duration: 7000,
          isClosable: true,
        });
      }


      setUsername("");
      setEmail("");
      setPassword("");
      setSecondPassword("");

      setUsernameSubmitted(false);
      setEmailSubmitted(false);
      setPasswordSubmitted(false);
      setSecondPasswordSubmitted(false);
    } catch (error) {
      toast({
        title: `Error creating account. Error: ${error}`,
        position: "top-right",
        description: `Please try again`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setSecondPassword("");

      setUsernameSubmitted(false);
      setEmailSubmitted(false);
      setPasswordSubmitted(false);
      setSecondPasswordSubmitted(false);

      console.error(error);
    }
  };


  useEffect(() => {
    const setFp = async () => {
      const fp = await FingerprintJS.load();

      const { visitorId } = await fp.get();

      setFpHash(visitorId);
    };

    setFp();
  }, []);

  return (
    <Box>
      <VStack >
        <Heading mb={6}>Create an Account</Heading>
        <Box maxWidth={"75%"} width={"100%"}>
          <Stack spacing={3}>
            <Box>
              <FormControl isInvalid={isErrorUsername} isRequired>
                <FormLabel>Username:</FormLabel>
                <Input type='text' value={username ? username : ""} onChange={onChangeusername} />
                {!isErrorUsername ? null : (
                  <FormErrorMessage>username is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={isErrorEmail} isRequired>
                <FormLabel>Email:</FormLabel>
                <Input type='email' value={email} onChange={onChangeEmail} />
                {!isErrorEmail ? null : (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={isErrorPassword} isRequired>
                <FormLabel>Password:</FormLabel>
                <Input type='password' value={password} onChange={onChangePassword} />
                {!isErrorPassword ? null : (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl isInvalid={isErrorSecondPassword} isRequired>
                <FormLabel>Confirm Password:</FormLabel>
                <Input type='password' value={secondPassword} onChange={onChangeSecondPassword} />
                {!isErrorSecondPassword ? null : (
                  <FormErrorMessage>Passwords Do Not Match.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Button
            onClick={onSubmit}
            >Submit
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SignUpForm;