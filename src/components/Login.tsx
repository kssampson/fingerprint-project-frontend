import { useState } from "react";
import { validateInputs } from "../utils/validateInputs";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack, useToast, Spinner } from "@chakra-ui/react"
import login from "../utils/login";

type Props = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  has2FA: boolean;
  setHas2Fa: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Login = ( { setIsLoggedIn, has2FA, setHas2Fa, isOpen, onOpen, onClose }: Props ) => {

  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const isErrorUsername = !validateInputs.isValidUsername(email) && emailSubmitted;
  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;

  const onChangeName = (e: any) => {
    setEmailSubmitted(false);
    setEmail(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setPasswordSubmitted(false)
    setPassword(e.target.value);
  }

  const resetEmailPasswordStates = () => {
    setEmail("");
    setPassword("");
    setEmailSubmitted(false);
    setPasswordSubmitted(false);
    return null;
  }

  const onSubmit = async () => {
      try {
        setEmailSubmitted(true);
        setPasswordSubmitted(true);
        const response = (await login(email, password)).data;
        if (response.success) {
          /*
          await call to database w/ email and password and change has2Fa to true
          setHas2Fa(true);
          setIsLoggedIn(true);
          resetEmailPasswordStates();
          toast success
           */
          toast({
            title: "Login successful.",
            position: "top-right",
            description: `${response.message}`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } else if (!response.success) {
          //check for invalid email
          if (response.inValidEmail) {
            toast({
              title: "Error:",
              position: "top-right",
              description: `${response.message}`,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            resetEmailPasswordStates();
          } else if (response.inValidPassword) {
            toast({
              title: "Error:",
              position: "top-right",
              description: `${response.message}`,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            resetEmailPasswordStates();
          } else if (response.needs2Fa) {
            toast({
              title: "Notice: ",
              position: "top-right",
              description: `${response.message}`,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
            onOpen();
          }
        }
        resetEmailPasswordStates();
        return;
      } catch (error) {
        toast({
          title: "Error logging in. Please try again.",
          position: "top-right",
          description: `${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        resetEmailPasswordStates();
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
                    <FormLabel>Email:</FormLabel>
                    <Input type='text' value={email ? email : ""} onChange={onChangeName} />
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