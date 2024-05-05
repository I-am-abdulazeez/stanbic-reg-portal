import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import useStore from 'src/store';
import {
  createTempCustomer,
  createTempCustomerImage,
  fetchTempCustomerByDetails,
  updateTempCustomerDetails,
} from 'src/api';
import { Router } from 'src/router';

import {
  CurrentCustomer,
  ExistingCustomer,
  TempPostData,
  formStepData,
} from 'src/types';

function useCreateCustMutation() {
  const custMutation = useMutation({
    mutationKey: ['new-customer'],
    mutationFn: createTempCustomer,
    onSuccess: (data: TempPostData) => {
      console.log(data);
      useStore.setState((state) => ({
        ...state,
        currentUser: {
          email: data.email,
          phoneNumber: data.phoneNumber,
          no: data.no,
        },
      }));
      toast.success('Please confirm OTP sent to your phone number', {
        position: 'bottom-center',
        duration: 4000,
      });
      Router.navigate('/confirm-otp');
    },
    onError: (err) => {
      console.log(err, err.message);
      toast.error(err.message, {
        position: 'bottom-center',
        duration: 4000,
      });
      useStore.setState((state) => ({
        ...state,
        currentUser: {
          email: '',
          phoneNumber: '',
          no: null,
        },
      }));
    },
  });

  return custMutation;
}

function useActiveCustMutation() {
  const updateCustMutation = useMutation({
    mutationKey: ['customer'],
    mutationFn: fetchTempCustomerByDetails,
    onSuccess: (data: ExistingCustomer) => {
      useStore.setState((state) => ({
        ...state,
        currentUser: {
          email: data.temporaryCustomer.email,
          phoneNumber: data.temporaryCustomer.phoneNumber,
          no: data.temporaryCustomer.no,
        },
      }));
      toast.success(`Welcome back, ${useStore.getState().currentUser?.email}`, {
        position: 'bottom-center',
        duration: 4000,
      });
      Router.navigate('/step-two');
    },
    onError: (err) => {
      console.log(err, err.message);
      toast.error(err.message, {
        position: 'bottom-center',
        duration: 4000,
      });
      useStore.setState((state) => ({
        ...state,
        currentUser: {
          email: '',
          no: null,
          phoneNumber: '',
        },
      }));
    },
  });

  return updateCustMutation;
}

function useUpdateCustMutation<TData extends formStepData>(
  nextStepRoute: string
) {
  const updateCustomerDetailsMutation = useMutation<
    CurrentCustomer & { message: string },
    Error,
    TData
  >({
    mutationKey: ['customer-details'],
    mutationFn: (data: TData) => updateTempCustomerDetails(data),
    onSuccess: (data) => {
      console.log(data);
      setTimeout(() => {
        toast.success(`Data Saved...`, {
          position: 'bottom-center',
          duration: 4000,
        });
      }, 1000);
      Router.navigate({ pathname: nextStepRoute });
    },
    onError: (err) => {
      console.log(err, err.name);
      toast.error(err.message, {
        position: 'bottom-center',
        duration: 4000,
      });
    },
  });

  return updateCustomerDetailsMutation;
}

function useCreateImageMutation() {
  const createCustomerImageMutation = useMutation({
    mutationKey: ['customer-details'],
    mutationFn: createTempCustomerImage,
    onSuccess: (data: CurrentCustomer & { message: string }) => {
      console.log(data);
      setTimeout(() => {
        toast.success(`Image Saved..`, {
          position: 'bottom-center',
          duration: 4000,
        });
      }, 1000);
      Router.navigate('/summary');
    },
    onError: (err) => {
      console.log(err, err.name);
      toast.error(err.message, {
        position: 'bottom-center',
        duration: 4000,
      });
    },
  });

  return createCustomerImageMutation;
}

export {
  useCreateCustMutation,
  useActiveCustMutation,
  useUpdateCustMutation,
  useCreateImageMutation,
};
