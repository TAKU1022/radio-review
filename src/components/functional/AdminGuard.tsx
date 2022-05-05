import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '../../hooks/useUser';

export const AdminGuard: React.FC = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user?.isAdmin) {
      router.push('/');
    }
  }, [user, router]);

  if (!user || !user.isAdmin) return null;

  return <>{children}</>;
};
