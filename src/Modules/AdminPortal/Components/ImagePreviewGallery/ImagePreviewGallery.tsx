import React, { useEffect } from "react";
import { Grid, Box, Button } from "@mui/material";
import { ImagePreviewGalleryProps } from "../../../../Interfaces/ImagePreviewGallery.interface";



const ImagePreviewGallery: React.FC<ImagePreviewGalleryProps> = ({ images, onRemove,setImages,defaultImages }) => {


useEffect(() => {
  if (defaultImages && defaultImages.length > 0) {
    setImages(defaultImages);
  }
}, [defaultImages,setImages]);


  return (
    <Grid container spacing={2} mt={2}>
      {images.map((img, index) => (
        <Grid  size={{xs:6,sm:4,md:3}} key={`img-${index}`}>
          <Box 
            sx={{ 
              position: "relative", 
              borderRadius: 2, 
              overflow: "hidden", 
              boxShadow: 3 
            }}
          >
            <img
              src={typeof img === "string" ? img : URL.createObjectURL(img)}
              alt={`uploaded-${index}`}
              style={{ width: "100%", height: 150, objectFit: "cover" }}
            />
            <Button
              size="small"
              onClick={() => onRemove(index)}
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                minWidth: 0,
                padding: "4px",
                backgroundColor: "#fff",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#f44336", color: "#fff" },
              }}
            >
              ✕
            </Button>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ImagePreviewGallery;
