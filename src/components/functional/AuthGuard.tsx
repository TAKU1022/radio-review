import React from 'react';
import { useUser } from '../../hooks/useUser';

export const AuthGuard: React.FC = ({ children }) => {
  const { firebaseUser } = useUser();

  if (!firebaseUser) return null;

  return <>{children}</>;
};
