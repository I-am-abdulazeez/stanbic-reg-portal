import { TEMPCUST_API, TEMPIMAGE_API } from 'src/data';

import { OmitNo, RegFormType, formStepData } from 'src/types';

type PickContinue = Pick<RegFormType, 'email' | 'phoneNumber'>;

const fetchTempCustomers = () => {
  return fetch(TEMPCUST_API, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.json());
};

const fetchTempCustomerByDetails = (data: {
  email: string | undefined;
  phoneNumber: string | undefined;
}) => {
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

// https://jsonplaceholder.typicode.com/posts

const createTempCustomer = async (data: any) => {
  const response = await fetch(TEMPCUST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  console.log(response.ok);
  console.log(response.status);

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

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

const createTempCustomerImage = async (data: any) => {
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

export {
  createTempCustomer,
  fetchTempCustomers,
  updateTempCustomerDetails,
  fetchTempCustomerByDetails,
  createTempCustomerImage,
};
