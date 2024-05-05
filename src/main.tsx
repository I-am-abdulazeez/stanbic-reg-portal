import React from 'react';
import ReactDOM from 'react-dom/client';

import { NextUIProvider } from '@nextui-org/react';

import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import { Toaster } from 'react-hot-toast';

import { Router } from './router';

import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Toaster />
        <RouterProvider router={Router} />
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
