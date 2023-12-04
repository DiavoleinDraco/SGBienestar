import React, { useEffect, useRef, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import get from '../../UseFetch';
import QRCode from 'qrcode';

export default function GenerateQr({ busqueda }) {
    const [imageUrl, setImageUrl] = useState('');

    const qrRef = useRef(null);

    useEffect(() => {
        generateQrCodeWithLogo(150);
    }, []);

    const generateQrCodeWithLogo = async (size) => {
        try {
            const qrOptions = {
                errorCorrectionLevel: 'H',
                type: 'image/png',
                quality: 0.92,
                margin: 1,
                width: size,
                color: {
                    dark: '#2C0757', 
                    light: '#fff', 
                },
            };

            const qrCode = await QRCode.toDataURL(import.meta.env.VITE_HOST + `/prestamo/info/${busqueda}`, qrOptions);

            setImageUrl(qrCode);

        } catch (error) {
            console.log(error);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'qr_code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <Button variant="contained" color="primary" onClick={handleDownload}>
                Download
            </Button>
            <br />
            <br />
            <br />
            {imageUrl && (
                <div>
                    <img src={imageUrl} alt="QR Code" />
                </div>
            )}
        </Grid>
    );
}
