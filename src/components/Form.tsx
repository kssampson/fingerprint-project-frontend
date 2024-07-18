import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { validateInputs } from "../utils/validateInputs";
import createUserSubmit from "../utils/createUserSubmit";
import { useToast } from '@chakra-ui/react'

const Form = () => {

  const toast = useToast();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("")

  const [nameSubmitted, setNameSubmitted] = useState<boolean>(false);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState<boolean>(false);
  const [secondPasswordSubmitted, setSecondPasswordSubmitted] = useState<boolean>(false);

  const isErrorName = !validateInputs.isValidName(name) && nameSubmitted;
  const isErrorEmail = !validateInputs.isValidEmail(email) && emailSubmitted;
  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;
  const isErrorSecondPassword = !validateInputs.isValidSecondPassword(password, secondPassword) && secondPasswordSubmitted;

  const onChangeName = (e: any) => {
    setNameSubmitted(false);
    setName(e.target.value);
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
    setNameSubmitted(true);
    setEmailSubmitted(true);
    setPasswordSubmitted(true);
    setSecondPasswordSubmitted(true);
    if (!validateInputs.isValidName(name) || !validateInputs.isValidEmail(email) || !validateInputs.isValidPassword(password) || !validateInputs.isValidSecondPassword(password, secondPassword)) {
      return;
    } else {
      await createUserSubmit({username: name, email: email, password: password})
      .then(() => {
        toast({
          title: `Account created. Please log in.`,
          position: "top-right",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setName("");
        setEmail("");
        setPassword("");
        setSecondPassword("");
        setNameSubmitted(false);
        setEmailSubmitted(false);
        setPasswordSubmitted(false);
        setSecondPasswordSubmitted(false);

      })
      .catch((error) =>{
        toast({
          title: `Error creating account. Error: ${error}`,
          position: "top-right",
          description: `Please try again`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setName("");
        setEmail("");
        setPassword("");
        setSecondPassword("");
        setNameSubmitted(false);
        setEmailSubmitted(false);
        setPasswordSubmitted(false);
        setSecondPasswordSubmitted(false);
        console.error();
      })
    }
  }

  return (
    <Box>
      <VStack >
        <Heading mb={6}>Create an Account</Heading>
        <Box maxWidth={"75%"} width={"100%"}>
          <Stack spacing={3}>
            <Box>
              <FormControl isInvalid={isErrorName} isRequired>
                <FormLabel>Username:</FormLabel>
                <Input type='text' value={name ? name : ""} onChange={onChangeName} />
                {!isErrorName ? null : (
                  <FormErrorMessage>Name is required.</FormErrorMessage>
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

export default Form;