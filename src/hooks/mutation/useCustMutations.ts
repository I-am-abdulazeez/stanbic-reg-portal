import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import useStore from 'src/store';
import {
  createTempCustomer,
  createTempCustomerImage,
  fetchTempCustomerByDetails,
  updateTempCustomerDetails,
  updateTempCustomerImage,
} from 'src/api';
import { Router } from 'src/router';

import {
  CurrentCustomer,
  DocumentUploadType,
  ExistingCustomer,
  ImageIDs,
  TempPostData,
  TempPostImage,
  formStepData,
} from 'src/types';

function useCreateCustMutation() {
  const custMutation = useMutation<TempPostData, Error, formStepData>({
    mutationKey: ['new-customer'],
    mutationFn: createTempCustomer,
    onSuccess: (data) => {
      console.log(data);
      useStore.setState((state) => ({
        ...state,
        currentUser: {
          ...state.currentUser,
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
          ...state.currentUser,
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
  const updateCustMutation = useMutation<
    ExistingCustomer,
    Error,
    CurrentCustomer
  >({
    mutationKey: ['customer-active'],
    mutationFn: fetchTempCustomerByDetails,
    onSuccess: (data) => {
      useStore.setState((state) => ({
        ...state,
        currentUser: {
          ...state.currentUser,
          email: data.result.email,
          phoneNumber: data.result.phoneNumber,
          no: data.result.no,
          imageId: data?.imageID,
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
          ...state.currentUser,
          email: '',
          phoneNumber: '',
          no: null,
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
  const createCustomerImageMutation = useMutation<
    TempPostImage,
    Error,
    Omit<DocumentUploadType, 'id' | 'customerID'>
  >({
    mutationKey: ['customer-details'],
    mutationFn: createTempCustomerImage,
    onSuccess: (data) => {
      console.log(data);
      useStore.setState((state) => ({
        ...state,
        currentUser: {
          ...state.currentUser,
          imageId: data.imageId,
        },
      }));
      setTimeout(() => {
        toast.success(`Image Saved..`, {
          position: 'bottom-center',
          duration: 4000,
        });
      }, 1000);
      Router.navigate('/summary');
    },
    onError: (err) => {
      toast.error(err.message, {
        position: 'bottom-center',
        duration: 4000,
      });
      useStore.setState((state) => ({
        ...state,
        currentUser: {
          ...state.currentUser,
        },
      }));
    },
  });

  return createCustomerImageMutation;
}

function useUpdateImageMutation() {
  const updateImageMutation = useMutation<
    TempPostImage,
    Error,
    DocumentUploadType
  >({
    mutationKey: ['update_cust_image'],
    mutationFn: (data: ImageIDs) =>
      updateTempCustomerImage({ customerID: data?.customerID, id: data?.id }),
    onSuccess: (data) => {
      setTimeout(() => {
        toast.success(`${data.message}`, {
          position: 'bottom-center',
          duration: 4000,
        });
      }, 1000);
      Router.navigate('/summary');
    },
    onError: (err) => {
      toast.error(err.message, {
        position: 'bottom-center',
        duration: 4000,
      });
    },
  });

  return updateImageMutation;
}

export {
  useCreateCustMutation,
  useActiveCustMutation,
  useUpdateCustMutation,
  useUpdateImageMutation,
  useCreateImageMutation,
};
