
import { useComicContext } from "../context/Comic";
import { Skeleton } from '@mui/material';

type ComicImageProps = {
    loadingState: boolean;
    imageData: Buffer;
  };
  
  const ComicImage = ({ loadingState, imageData }: ComicImageProps) => {
    const blob = new Blob([new Uint8Array(imageData)], { type: 'image/png' });
    const imageUrl = URL.createObjectURL(blob);
    if (loadingState === false) {
      return <img src={imageUrl} alt="comic" />;
    }
  
    if (loadingState === true) {
      return <Skeleton
      sx={{ bgcolor: 'grey.900' }}
      variant="rectangular"
      width={528}
      height={616}
    />
    }
  
    return null;
  };

export const ComicStrip = () => {
    const { imageData, setImageData, loadingStates, setLoadingStates } = useComicContext();
  
    return (
      <div>
        {[...Array(10)].map((_, i) => (
          <div key={i}>
            <ComicImage loadingState={loadingStates[i]} imageData={imageData[i]} />
          </div>
        ))}
      </div>
    );
  };