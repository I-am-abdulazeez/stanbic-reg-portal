import { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import useStore from 'src/store';

export default function PrivateRoute({ children }: PropsWithChildren) {
  const { currentUser } = useStore();

  if (!currentUser.no) {
    return <Navigate to="/" />;
  }
  return children;
}
