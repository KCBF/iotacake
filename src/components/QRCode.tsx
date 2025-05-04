
import React, { useEffect, useRef } from 'react';
import QRCodeLib from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
}

const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 128,
  bgColor = '#FFFFFF',
  fgColor = '#000000',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    QRCodeLib.toCanvas(
      canvasRef.current,
      value,
      {
        width: size,
        margin: 1,
        color: {
          dark: fgColor,
          light: bgColor,
        },
      },
      (error) => {
        if (error) console.error('Error generating QR Code:', error);
      }
    );
  }, [value, size, bgColor, fgColor]);

  return <canvas ref={canvasRef} />;
};

export default QRCode;
