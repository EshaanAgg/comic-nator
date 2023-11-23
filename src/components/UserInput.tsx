import { useUserInputContext } from '../context/UserInput';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import toast from 'react-hot-toast';

export const UserInput = () => {
  const { userInput, setUserInput } = useUserInputContext();

  const handleSubmit = () => {
    if (userInput === '') {
      toast.error(
        "Umm! An empty mind is a devil's workshop. Especially when you're trying to write a story. Try something else!"
      );
      return;
    }

    toast.success('Your comic is being generated!');
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
