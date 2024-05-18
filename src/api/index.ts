import { TEMPCUST_API, TEMPIMAGE_API } from 'src/data';

import {
  DocumentUploadType,
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
    headers: {
      method: 'POST',
      'Content-type': 'application/json; charset=UTF-8',
      body: JSON.stringify(no),
    },
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
  sendCustomerToPencom,
  createTempCustomer,
  createTempCustomerImage,
  updateTempCustomerImage,
  updateTempCustomerDetails,
};
