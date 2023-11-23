import { createContext, useContext, useState } from 'react';

type ComicContextType = {
  inProgress: boolean;
  setInProgress: (progress: boolean) => void;

  loadingStates: boolean[];
  setLoadingStates: (loadingStates: boolean[]) => void;

  imageData: Buffer[];
  setImageData: (imageData: Buffer[]) => void;
};

type ComicContextProviderProps = {
  children: React.ReactNode;
};

export const ComicContext = createContext<null | ComicContextType>(null);

export const ComicContextProvider = ({ children }: ComicContextProviderProps) => {
  const [inProgress, setInProgress] = useState(false);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([]);
  const [imageData, setImageData] = useState<Buffer[]>([]);

  return (
    <ComicContext.Provider
      value={{
        inProgress,
        setInProgress,
        loadingStates,
        setLoadingStates,
        imageData,
        setImageData
      }}
    >
      {children}
    </ComicContext.Provider>
  );
};

export const useComicContext = () => {
  const context = useContext(ComicContext);
  if (!context) throw new Error('ComicContext must be used within a ComicContextProvider.');

  return context;
};
