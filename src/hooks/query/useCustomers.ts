import { useQuery } from '@tanstack/react-query';

import {
  fetchTempCustomers,
  fetchTempCustomerByDetails,
  fetchTempCustomerImage,
  sendCustomerToPencom,
} from 'src/api';

import { DocumentUploadType, RegFormType } from 'src/types';

function useCustomer() {
  const customers = useQuery({
    queryKey: ['temp_customers'],
    queryFn: fetchTempCustomers,
    refetchInterval: 5000,
  });

  return customers;
}

function useCustomerByDetails(email: string, phoneNumber: string) {
  const customerByDetails = useQuery<
    {
      status: number;
      result: RegFormType;
    },
    Error
  >({
    queryKey: ['existing_temp_customer', email, phoneNumber],
    queryFn: () => fetchTempCustomerByDetails({ email, phoneNumber }),
    refetchInterval: 5000,
  });

  return customerByDetails;
}

function useCustomerImage(id: number | null, customerID: number | null) {
  const customerImage = useQuery<{
    status: number;
    temporaryImages: DocumentUploadType[];
  }>({
    queryKey: ['existing_cust_images', customerID, id],
    queryFn: () => fetchTempCustomerImage({ customerID, id }),
    refetchInterval: 5000,
    // enabled: id !== null,
  });

  return customerImage;
}

function useSendToPencom(no: number) {
  const sendToPen = useQuery({
    queryKey: ['existing_cust_images', no],
    queryFn: () => sendCustomerToPencom(no),
    refetchInterval: 5000,
  });

  return sendToPen;
}

export { useCustomer, useCustomerByDetails, useCustomerImage, useSendToPencom };
