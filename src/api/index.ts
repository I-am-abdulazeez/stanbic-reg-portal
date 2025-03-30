import { TEMPCUST_API, TEMPIMAGE_API } from 'src/data';
import { employerData } from 'src/data/employerData';

import {
  DocumentUploadType,
  EmployerType,
  ImageIDs,
  UserDetails,
  formStepData,
} from 'src/types';

const fetchTempCustomers = () => {
  return fetch(TEMPCUST_API, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};

const fetchTempCustomerCountries = () => {
  return fetch(`${TEMPCUST_API}/Countries`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};
const fetchTempCustomerStates = () => {
  return fetch(`${TEMPCUST_API}/States`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};
const fetchTempCustomerLocalGovt = (stateCode: string | undefined) => {
  return fetch(`${TEMPCUST_API}/LocalGovt?stateCode=${stateCode}`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};

const fetchPencomResponse = (referenceID: string | undefined) => {
  return fetch(`${TEMPCUST_API}/GetPencomRequestStatus?setid=${referenceID}`, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};

const fetchTempCustomerEmployer = async (): Promise<EmployerType[]> => {
  // const response = await fetch(`${TEMPCUST_API}/EmployerList`, {
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // });
  // if (!response.ok) {
  //   throw new Error('Network response was not ok');
  // }

  // const data: EmployerType[] = await response.json();
  return employerData.filter((data) => data.name);
};

const fetchTempCustomerByDetails = (data: UserDetails) => {
  return fetch(
    `${TEMPCUST_API}/${data.email}?phoneNumber=${data.phoneNumber}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ).then((response) => response.json());
};

const fetchTempCustomerImage = (data: ImageIDs) => {
  return fetch(`${TEMPIMAGE_API}/${data.id}/${data.customerID}`, {
    headers: {
      method: 'GET',
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};

const sendCustomerToPencom = (no: number) => {
  return fetch(`${TEMPCUST_API}/generate`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(no),
  }).then((response) => response.json());
};

// https://jsonplaceholder.typicode.com/posts

const createTempCustomer = async (data: formStepData) => {
  const response = await fetch(TEMPCUST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

const updateTempCustomerDetails = async (data: formStepData) => {
  const response = await fetch(
    `${TEMPCUST_API}/${data.email}?phoneNumber=${data.phoneNumber}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  console.log(response.url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

const createTempCustomerImage = async (
  data: Omit<DocumentUploadType, 'id' | 'customerID'>
) => {
  const response = await fetch(TEMPIMAGE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

const updateTempCustomerImage = async (data: ImageIDs) => {
  const response = await fetch(
    `${TEMPIMAGE_API}/${data?.customerID}?ID=${data?.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export {
  fetchTempCustomers,
  fetchTempCustomerByDetails,
  fetchTempCustomerImage,
  fetchTempCustomerCountries,
  fetchTempCustomerStates,
  fetchTempCustomerLocalGovt,
  fetchTempCustomerEmployer,
  fetchPencomResponse,
  sendCustomerToPencom,
  createTempCustomer,
  createTempCustomerImage,
  updateTempCustomerImage,
  updateTempCustomerDetails,
};
