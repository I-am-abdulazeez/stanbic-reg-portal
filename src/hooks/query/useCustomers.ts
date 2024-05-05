import { useQuery } from '@tanstack/react-query';

import { fetchTempCustomers, fetchTempCustomerByDetails } from 'src/api';

import { RegFormType } from 'src/types';

function useCustomer() {
  const customers = useQuery({
    queryKey: ['temp_customers'],
    queryFn: fetchTempCustomers,
    refetchInterval: 5000,
  });

  return customers;
}

function useCustomerByDetails(
  email: string | undefined,
  phoneNumber: string | undefined
) {
  const customerByDetails = useQuery<{
    status: number;
    temporaryCustomer: RegFormType;
  }>({
    queryKey: ['existing_temp_customer', email, phoneNumber],
    queryFn: () => fetchTempCustomerByDetails({ email, phoneNumber }),
    refetchInterval: 5000,
  });

  return customerByDetails;
}

export { useCustomer, useCustomerByDetails };
