import { Text, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useToast, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import { validateInputs } from "../utils/validateInputs";
import verifyEmail from "../utils/verifyEmail";

type Props = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const TwoFAModal = ( { isOpen, onOpen, onClose }: Props ) => {

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const toast = useToast();

  const [email, setEmail] = useState<string>("");
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const isErrorEmail = !validateInputs.isValidEmail(email) && emailSubmitted;

  const onChangeEmail = (e: any) => {
    setEmailSubmitted(false);
    setEmail(e.target.value);
  }

  const onCancel = () => {
    setEmail('');
    setEmailSubmitted(false);
    toast({
      title: `Error`,
      position: "top-right",
      description: `Please try again.`,
      status: 'error',
      duration: 7000,
      isClosable: true,
    });
    onClose();
  }

  const closeThanksForSubmittingModal = () => {
    setEmail('');
    setEmailSubmitted(false);
    onClose();
  }


  const handleSubmit = async () => {
    try {
      setEmailSubmitted(true);
      const respsonse = await verifyEmail(email);
      if (respsonse.success) {
        toast({
          title: `Success:`,
          position: "top-right",
          description: `${respsonse.message}`,
          status: 'success',
          duration: 7000,
          isClosable: true,
        });
        setTimeout(() => {
          setEmail('');
          setEmailSubmitted(false);
          onClose();
        })
      } else {
        toast({
          title: `Error:`,
          position: "top-right",
          description: `${respsonse.message}`,
          status: 'error',
          duration: 7000,
          isClosable: true,
        });
        setEmail('');
        setEmailSubmitted(false);
        onClose();
      }
    } catch (error) {
      toast({
        title: `Error: ${error}`,
        position: "top-right",
        description: `Please try again.`,
        status: 'error',
        duration: 7000,
        isClosable: true,
      });
      setEmail('');
      setEmailSubmitted(false);
      onClose();
    }
  }

  return (
      <>
      {emailSubmitted ? (
        <>
         <Modal isOpen={isOpen} onClose={closeThanksForSubmittingModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Thank You For Submitting</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Please check your email. Please close this tab in your browser.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        </>
      ) : (
        <>
        {/* <Button onClick={onOpen}>Open Modal</Button> */}
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Verify Via Email</ModalHeader>
              <ModalCloseButton onClick={onCancel}/>
              <ModalBody pb={6}>
                <FormControl>
                  <HStack>
                  <FormControl isInvalid={isErrorEmail} isRequired>
                    <FormLabel>Email:</FormLabel>
                    <Input type='email' value={email} onChange={onChangeEmail} />
                    {!isErrorEmail ? null : (
                      <FormErrorMessage>Enter valid email.</FormErrorMessage>
                    )}
                  </FormControl>
                  </HStack>
                </FormControl>
              </ModalBody>
            {!emailSubmitted && (
              <>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                  Send
                </Button>
                <Button onClick={onCancel}>Cancel</Button>
              </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        </>
      )}
    </>
  )
};

export default TwoFAModal;