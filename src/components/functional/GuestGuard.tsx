import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';

export const GuestGuard: React.FC = ({ children }) => {
  const { firebaseUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (firebaseUser) {
      router.push('/');
    }
  }, [firebaseUser, router]);

  if (firebaseUser) return null;

  return <>{children}</>;
};
