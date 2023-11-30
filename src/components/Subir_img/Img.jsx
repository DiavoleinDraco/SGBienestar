import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

export default function Img({ onChangeImage }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('filename', file.name);

      const response = await fetch('https://proyecto-backend-sgbienestar.onrender.com/load-image/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onSuccess(data);
        message.success(`${file.name} file uploaded successfully`);
        setSelectedImage(data[0].src);
        onChangeImage(data[0].src);
      } else {
        const errorData = await response.json();
        onError(errorData);
        message.error(`${file.name} file upload failed.`);
      }
    } catch (error) {
      console.error('Error en la solicitud Fetch:', error);
      onError(error);
      message.error(`${file.name} file upload failed.`);
    }
  };

  const props = {
    customRequest,
  };

  return (
    <div style={{ width: '500px' }}>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      {selectedImage && <img src={selectedImage} alt="Selected" style={{ marginTop: '10px', maxWidth: '100%' }} />}
    </div>
  );
}
