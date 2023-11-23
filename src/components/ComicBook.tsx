import { useComicContext } from '../context/Comic';
import { ComicImage } from './ComicImage';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ComicBook = () => {
  const { imageData } = useComicContext();

  return (
    <ImageList sx={{ width: 1024 }} cols={2} rowHeight={512}>
      {imageData.map((item, index) => (
        <ImageListItem key={index}>
          <ComicImage index={index} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
