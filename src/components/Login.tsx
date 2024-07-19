import { useState } from "react";
import { validateInputs } from "../utils/validateInputs";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack, useToast, Text } from "@chakra-ui/react"
import login from "../utils/login";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  has2FA: boolean;
  setHas2Fa: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ( { setIsLoggedIn, has2FA, setHas2Fa }: Props ) => {

  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameSubmitted, setUsernameSubmitted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const isErrorUsername = !validateInputs.isValidUsername(username) && usernameSubmitted;
  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;


  const onChangeName = (e: any) => {
    setUsernameSubmitted(false);
    setUsername(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setPasswordSubmitted(false)
    setPassword(e.target.value);
  }

  const onSubmit = async () => {
    setUsernameSubmitted(true);
    setPasswordSubmitted(true);
    if (!validateInputs.isValidUsername(username) || !validateInputs.isValidPassword(password)) {
      return;
    } else {
      await login({username: username, password: password})
      .then((response) => {
        setIsLoggedIn(true);
        toast({
          title: 'Login successful.',
          position: "top-right",
          description: `Welcome ${username}!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setUsername("");
        setPassword("");
        setUsernameSubmitted(false);
        setPasswordSubmitted(false);

      })
      .catch((error) => {
        toast({
          title: 'Error logging in. Please try again.',
          position: "top-right",
          description: `${error}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setUsername("");
        setPassword("");
        setUsernameSubmitted(false);
        setPasswordSubmitted(false);
      })
    }
  }

  return (
    <Box>
      <VStack >
        <Heading mb={6}>Log-In</Heading>
        <Box maxWidth={"75%"} width={"100%"}>
          <Stack spacing={3}>
            <Box>
              <FormControl isInvalid={isErrorUsername} isRequired>
                <FormLabel>User Name:</FormLabel>
                <Input type='text' value={username ? username : ""} onChange={onChangeName} />
                {!isErrorUsername ? null : (
                  <FormErrorMessage>Name is required.</FormErrorMessage>
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
            <Button
            onClick={onSubmit}
            >Submit
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Box>
  )
}

export default Login