import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  useDisclosure,
  ModalContent,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@nextui-org/react';

import SignOutIcon from 'src/components/SignOutIcon';

import useStore from 'src/store';

import stanbic from 'src/assets/stanbic-pic.jpeg';

export default function INavbar() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  function logout() {
    useStore.setState((state) => ({
      ...state,
      currentUser: {
        ...state.currentUser,
        email: '',
        no: null,
        phoneNumber: '',
        imageId: null,
      },
    }));
  }

  return (
    <Navbar position="static">
      <NavbarBrand className="flex">
        <img src={stanbic} alt="Stanbic_ibtc_logo" className="w-20" />
        <p className="font-semibold text-xl">Onboarding</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="danger"
            startContent={<SignOutIcon />}
            className="font-inter font-semibold bg-black"
            radius="sm"
            onClick={onOpen}
          >
            Logout
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="font-inter"
            backdrop="blur"
            isDismissable={false}
          >
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">
                Leave Registration?
              </ModalHeader>
              <ModalBody>
                <p className="font-inter">
                  Don't worry, you can complete the process anytime. Are you
                  sure you want to logout?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={onClose}
                  className="font-inter font-semibold"
                >
                  No
                </Button>
                <Button
                  color="danger"
                  variant="light"
                  onPress={logout}
                  className="font-inter font-semibold"
                >
                  Yes
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
