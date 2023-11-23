import { useUserInputContext } from '../context/UserInput';
import { useComicContext } from '../context/Comic';
import { generateComicData } from '../comic/requestUtils';
import { generateComicPanel } from '../comic/imageUtils';
import { Buffer } from 'buffer';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import toast from 'react-hot-toast';

export const UserInput = () => {
  const { userInput, setUserInput } = useUserInputContext();
  const { setInProgress, setLoadingStates, setImageData } = useComicContext();

  const handleSubmit = async () => {
    if (userInput === '') {
      toast.error(
        "Umm! An empty mind is a devil's workshop. Especially when you're trying to write a story. Try something else!"
      );
      return;
    }

    toast.success('Your comic is being generated!');

    // Make the API requests and generate the comics
    const loadingArray = Array.from({ length: 10 }, () => true);
    const imageArray = Array.from({ length: 10 }, () => Buffer.from(''));

    setInProgress(true);
    setLoadingStates(loadingArray);

    const comicData = await generateComicData(userInput);

    const dataGenerationPromises = comicData.panels.map(
      async (panel: { description: string; text: string }, index: number) => {
        imageArray[index] = await generateComicPanel(panel.description, panel.text);
        loadingArray[index] = false;

        setImageData([...imageArray]);
        setLoadingStates([...loadingArray]);
      }
    );

    Promise.all(dataGenerationPromises).then(() => {
      setInProgress(false);
      toast.success('Wuhu! Checkout your comic below!');
    });
  };

  return (
    <>
      <TextField
        id="userInput"
        variant="outlined"
        label="What are you thinking about today?"
        placeholder="Astronauts riding dinosaurs?"
        multiline
        rows={4}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />

      <Button onClick={handleSubmit}>Make me a comic!</Button>
    </>
  );
};
