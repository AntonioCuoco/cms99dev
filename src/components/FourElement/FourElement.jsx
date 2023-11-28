import { useState } from 'react';
import { Button, Modal } from 'antd';
import axios from 'axios';
import "./FourElement.css";

const FourElement = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [reset, setReset] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };
  
  const handleImageUpload = async () => {
    setLoading(true);
     const formData = new FormData();
     formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:8080/cms/upload', formData);
      if(response.data === "Immagine caricata con successo." && response.status === 200) {
          console.log(response.data);
          if(selectedImage != null) {
              setReset(true);
              setSelectedImage(null);
              setOpen(false);
              setLoading(false);
          }
      }
      
    } catch (error) {
      console.log('Errore durante il caricamento dell\'immagine:', error);
    }
  };

  const openModal = () => {
    setOpen(true); 
  };

  const closeModal = () => {
    setOpen(false);
  }

    return(
        <div className="FourElementLayout2">
            <input type="file" accept="image/*" onChange={(e) => handleImageChange(e)} value={reset && ""}/>
            <button onClick={() => openModal()} className='btn-carica'>Carica Immagine</button>
            <Modal
              open={open}
              title="Carica Immagini a Db"
              footer={[
                <Button key="back" onClick={() => closeModal()}>
                  Close
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={(e) => handleImageUpload(e)}>
                  Confirm
                </Button>
              ]}></Modal>
        </div>
    )

} 

export default FourElement;
