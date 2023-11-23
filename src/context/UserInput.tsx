import { createContext, useContext, useState } from 'react';

type UserInputContextType = {
  userInput: string;
  setUserInput: (userInput: string) => void;
};

type UserInputContextProviderProps = {
  children: React.ReactNode;
};

export const UserInputContext = createContext<null | UserInputContextType>(null);

export const UserInputContextProvider = ({ children }: UserInputContextProviderProps) => {
  const [userInput, setUserInput] = useState('');

  return (
    <UserInputContext.Provider value={{ userInput, setUserInput }}>
      {children}
    </UserInputContext.Provider>
  );
};

export const useUserInputContext = () => {
  const context = useContext(UserInputContext);
  if (!context) throw new Error('UserInputContext must be used within a UserInputContextProvider.');

  return context;
};
