import { createBrowserRouter } from 'react-router-dom';

import OTP from 'src/pages/OTP/index.tsx';

import SelectProduct from 'src/pages/SelectProduct/index.tsx';
import PersonalDetails from 'src/pages/PersonalDetails/index.tsx';
import EmploymentRecord from 'src/pages/EmploymentRecord/index.tsx';
import NOKBio from 'src/pages/NOKBio/index.tsx';
import DocsUpload from 'src/pages/DocsUpload/index.tsx';

import Summary from 'src/pages/Summary/index.tsx';

import App from 'src/App.tsx';

export const Router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/confirm-otp',
    element: <OTP />,
  },
  {
    path: '/step-one',
    element: <SelectProduct />,
  },
  {
    path: '/step-two',
    element: <PersonalDetails />,
  },
  {
    path: '/step-three',
    element: <EmploymentRecord />,
  },
  {
    path: '/step-four',
    element: <NOKBio />,
  },
  {
    path: '/step-five',
    element: <DocsUpload />,
  },
  {
    path: '/summary',
    element: <Summary />,
  },
]);
