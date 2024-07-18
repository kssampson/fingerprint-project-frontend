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




  return (
    <Box>
      <VStack >
        <Heading mb={6}>Create an Account</Heading>
        <Box maxWidth={"75%"} width={"100%"}>
          <Stack spacing={3}>
            <Box>
              <FormControl isRequired>
                <FormLabel>Username:</FormLabel>
                <Input />

              </FormControl>
            </Box>
            <Box>
              <FormControl  isRequired>
                <FormLabel>Email:</FormLabel>
                <Input  />

              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Password:</FormLabel>
                <Input/>

              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel>Confirm Password:</FormLabel>
                <Input  />
              </FormControl>
            </Box>
            <Button

            >Submit
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Form;