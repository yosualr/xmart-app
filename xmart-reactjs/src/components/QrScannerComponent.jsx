import { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import Box from '@mui/material/Box';

const QrScannerComponent = ({ onScan }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const qrScanner = new QrScanner(
      videoRef.current,
      result => {
        onScan(result);
        qrScanner.stop(); // Stop scanning after a successful scan
      },
      {
        onDecodeError: error => {
          console.log(error);
        },
        highlightScanRegion: true,
        highlightCodeOutline: true,
      }
    );

    qrScanner.start();

    return () => {
      qrScanner.stop();
    };
  }, [onScan]);

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <video ref={videoRef} style={{ width: '100%' }} />
    </Box>
  );
};

export default QrScannerComponent;
