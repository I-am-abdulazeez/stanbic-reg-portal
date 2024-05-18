import { createBrowserRouter } from 'react-router-dom';

import OTP from 'src/pages/OTP/index.tsx';

import SelectProduct from 'src/pages/SelectProduct/index.tsx';
import PersonalDetails from 'src/pages/PersonalDetails/index.tsx';
import EmploymentRecord from 'src/pages/EmploymentRecord/index.tsx';
import NOKBio from 'src/pages/NOKBio/index.tsx';
import DocsUpload from 'src/pages/DocsUpload/index.tsx';

import Summary from 'src/pages/Summary/index.tsx';

import App from 'src/App.tsx';
import PrivateRoute from 'src/components/PrivateRoute';

export const Router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/confirm-otp',
    element: (
      <PrivateRoute>
        <OTP />
      </PrivateRoute>
    ),
  },
  {
    path: '/step-one',
    element: (
      <PrivateRoute>
        <SelectProduct />
      </PrivateRoute>
    ),
  },
  {
    path: '/step-two',
    element: (
      <PrivateRoute>
        <PersonalDetails />
      </PrivateRoute>
    ),
  },
  {
    path: '/step-three',
    element: (
      <PrivateRoute>
        <EmploymentRecord />
      </PrivateRoute>
    ),
  },
  {
    path: '/step-four',
    element: (
      <PrivateRoute>
        <NOKBio />
      </PrivateRoute>
    ),
  },
  {
    path: '/step-five',
    element: (
      <PrivateRoute>
        <DocsUpload />
      </PrivateRoute>
    ),
  },
  {
    path: '/summary',
    element: (
      <PrivateRoute>
        <Summary />
      </PrivateRoute>
    ),
  },
]);
