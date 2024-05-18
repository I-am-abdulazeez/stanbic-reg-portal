import { useNavigate } from 'react-router-dom';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react';

import SignOutIcon from 'src/components/SignOutIcon';

import useStore from 'src/store';

import stanbic from 'src/assets/stanbic-pic.jpeg';

export default function INavbar() {
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
            onClick={logout}
          >
            Logout
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
