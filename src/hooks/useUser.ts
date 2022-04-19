import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }

  const { user, firebaseUser, updateUser, updateFirebaseUser } = context;

  return { user, firebaseUser };
};
