import { useComicContext } from '../context/Comic';
import Skeleton from '@mui/material/Skeleton';

type Props = { index: number };

export const ComicImage = ({ index }: Props) => {
  const { loadingStates, imageData } = useComicContext();

  if (loadingStates[index])
    return <Skeleton variant="rounded" animation="wave" width={512} height={512} />;

  // const b64 = imageData[index].toString('base64');
  // const mimeType = 'image/png';

  // <img src={imageData} alt={`Comic Panel ${index + 1}`} />;
};
