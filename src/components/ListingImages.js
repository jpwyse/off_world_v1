import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ErrorIcon from '@mui/icons-material/Error';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Image from 'mui-image';
import axios from "axios";
import api from '../utils/axios/api';
import ImageGallery from "react-image-gallery";
import '../../design/css/image-gallery.scss';
import "@fontsource/vt323";

const ListingImages = ({residence_id, ...props}) => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchResidenceImages = async () => {
      try {
        const response = await api.get(`api/residences/images/${residence_id}`);
        console.log(response.data);
        setImages(
          response.data.map(img => ({
            original: `${img.url}`,
            thumbnail: `${img.url}`
          }))
        );
      } catch (error) {
        console.log('error', error);
      }
    };
    if (residence_id) {
      fetchResidenceImages();
    }
  }, []);

  

  const renderImages = () => {
    if (images) {
      return (
        <React.Fragment>
          <Card sx={{ minWidth: 250, width: '100%', pt: 1,  border: "none", boxShadow: "none", background: 'none'  }}>
            <ImageGallery items={images} />
          </Card>
          <Divider variant="middle" sx={{ mt: 3 }} />
        </React.Fragment>
      );
    } else {
      return (
        <Box component="span" sx={{ font: '28px VT323', mt: 1 }}>
          Loading images...
        </Box>
      );
    }
  };

  return (
    renderImages()
  );
};

export default ListingImages;