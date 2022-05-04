import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useUser } from '../../hooks/useUser';

export const AuthGuard: React.FC = ({ children }) => {
  const { firebaseUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!firebaseUser) {
      router.push('/');
    }
  }, [firebaseUser, router]);

  if (!firebaseUser) return null;

  return <>{children}</>;
};
