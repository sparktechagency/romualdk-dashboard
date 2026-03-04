
import { IconButton, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { downloadImage } from './downloadImage';

type Props = {
  imageUrl: string;
  fileName?: string;
  size?: 'small' | 'medium' | 'large';
};

const ImageDownloadButton = ({
  imageUrl,
  fileName = 'image',
  size = 'medium',
}: Props) => {
  return (
    <Tooltip title="Download image">
      <IconButton
        size={size}
        onClick={() => downloadImage(imageUrl, fileName)}
        sx={{
          color: '#10B981',
          '&:hover': {
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
          },
        }}
      >
        <DownloadIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ImageDownloadButton;