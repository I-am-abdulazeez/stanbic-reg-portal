import { useQuery } from '@tanstack/react-query';
import {
  fetchTempCustomerCountries,
  fetchTempCustomerStates,
  fetchTempCustomerLocalGovt,
} from 'src/api';
import { CountryType } from 'src/types';

function useCustCountries() {
  const custCountries = useQuery<CountryType[], Error>({
    queryKey: ['countries'],
    queryFn: fetchTempCustomerCountries,
    refetchInterval: 5000,
  });

  return custCountries;
}
function useCustStates() {
  const custStates = useQuery<CountryType[], Error>({
    queryKey: ['state'],
    queryFn: fetchTempCustomerStates,
    refetchInterval: 5000,
  });

  return custStates;
}
function useCustLocalGovt(stateCode: string | undefined) {
  const custLocalGovt = useQuery<CountryType[], Error>({
    queryKey: ['local_govt', stateCode],
    queryFn: () => fetchTempCustomerLocalGovt(stateCode),
    refetchInterval: 5000,
    enabled: !!stateCode,
  });

  return custLocalGovt;
}

export { useCustCountries, useCustStates, useCustLocalGovt };
