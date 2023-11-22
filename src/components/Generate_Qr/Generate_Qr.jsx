import React, { useEffect, useRef, useState } from 'react';
import { Container, Card, CardContent, makeStyles, Grid, TextField, Button } from '@material-ui/core';
import get from '../../UseFetch';
import QRCode from 'qrcode';


export default function GenerateQr({ busqueda }) {
    const [imageUrl, setImageUrl] = useState('');
    console.log(busqueda)
    const qrRef = useRef(null);
    useEffect(() => {
        get('/prestamos').then((data) => console.log(data))
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
                    dark: '#2C0757', // Color de los módulos oscuros
                    light: '#fff', // Color de los módulos claros
                },
            };

            const qrCode = await QRCode.toDataURL(`http://localhost:5173/prestamo/info/${busqueda}`, qrOptions);

            setImageUrl(qrCode);

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
            <Button className={"adios"} variant="contained"
                color="primary" onClick={() => generateQrCodeWithLogo(150)}>Generate</Button>
            <br />
            <br />
            <br />
            {imageUrl ? (
                <a href={imageUrl} download>
                    <img src={imageUrl} alt="img" />
                </a>
            ) : null}
        </Grid>

    );
}

