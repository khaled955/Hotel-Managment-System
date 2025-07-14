import { RoomDetailsProps } from "../../../../Interfaces/Rooms.interface";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  IconButton,Chip
} from "@mui/material";
import Carousel from "react-material-ui-carousel"; 
import CloseIcon from "@mui/icons-material/Close";



export default function RoomDetails({open,room,onClose}:RoomDetailsProps) {

  return (
  //  <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
  //     <DialogTitle>
  //       Room Details #{roomData.roomNumber}
  //       <IconButton
  //         onClick={onClose}
  //         sx={{ position: "absolute", right: 8, top: 8 }}
  //       >
  //         <CloseIcon />
  //       </IconButton>
  //     </DialogTitle>
  //     <DialogContent>
  //       <Grid container spacing={3} justifyContent={"center"}>
  //         {/* Images slider */}
  //         <Grid  size={{xs:12}}>
  //           <Swiper
  //             modules={[Navigation]}
  //             navigation
  //             spaceBetween={20}
  //             slidesPerView={1}
  //           >
  //             {roomData.images.map((imgUrl, idx) => (
  //               <SwiperSlide key={idx}>
  //                 <Box
  //                   component="img"
  //                   src={imgUrl}
  //                   alt={`Room Image ${idx + 1}`}
  //                   sx={{ width: "100%", height: 300, objectFit: "cover", borderRadius: 2 }}
  //                 />
  //               </SwiperSlide>
  //             ))}
  //           </Swiper>
  //         </Grid>

  //         {/* Room Details */}
  //         <Grid size={{xs:12 , sm:4}}>
  //           <Typography variant="subtitle1">Capacity:</Typography>
  //           <Typography>{roomData.capacity}</Typography>
  //         </Grid>

  //         <Grid size={{xs:12 , sm:4}}>
  //           <Typography variant="subtitle1">Price:</Typography>
  //           <Typography>${roomData.price}</Typography>
  //         </Grid>

  //         <Grid size={{xs:12 , sm:4}}>
  //           <Typography variant="subtitle1">Discount:</Typography>
  //           <Typography>{roomData.discount}%</Typography>
  //         </Grid>

  //         <Grid size={{xs:12 , sm:6}}>
  //           <Typography variant="subtitle1">Created By:</Typography>
  //           <Typography>{roomData.createdBy}</Typography>
  //         </Grid>

  //         <Grid size={{xs:12 , sm:6}}>
  //           <Typography variant="subtitle1">Created At:</Typography>
  //           <Typography>{new Date(roomData.createdAt).toLocaleString()}</Typography>
  //         </Grid>

  //         <Grid size={{xs:12}}>
  //           <Typography variant="subtitle1">Facilities:</Typography>
  //           <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
  //             {roomData.facilities.map((facility) => (
  //               <Box
  //                 key={facility._id}
  //                 sx={{
  //                   px: 2,
  //                   py: 0.5,
  //                   backgroundColor: "#f0f0f0",
  //                   borderRadius: 2,
  //                 }}
  //               >
  //                 {facility.name}
  //               </Box>
  //             ))}
  //           </Box>
  //         </Grid>
  //       </Grid>
  //     </DialogContent>
  //   </Dialog>




   <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            boxShadow: 1,
            zIndex: 10,
            "&:hover": { bgcolor: "error.main", color: "#fff" },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle>{`Room Details of ${room.roomNumber}`}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>

             {/* Image Carousel */}
            {room.images.length > 0 && (
              <Grid size={{xs:12}}>
                <Carousel autoPlay={room.images.length > 1} navButtonsAlwaysVisible = {room.images.length > 1} animation="slide">
                  {room.images.map((url, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={url}
                      alt={`Room image ${i + 1}`}
                      sx={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 2 }}
                    />
                  ))}
                </Carousel>
              </Grid>
            )}


            {/* Room Number, Price, Capacity */}
            <Grid size={{xs:12 , sm:6}}>
              <Typography><strong>Room Number:</strong> {room.roomNumber}</Typography>
              <Typography><strong>Price:</strong> ${room.price}</Typography>
              <Typography><strong>Discount:</strong> {room.discount}%</Typography>
              <Typography><strong>Capacity:</strong> {room.capacity}</Typography>
              <Typography><strong>Date:</strong> {new Date(room.createdAt).toLocaleDateString()}</Typography>
            </Grid>

            {/* Facilities */}
            <Grid size={{xs:12 , sm:6}}>
              <Typography><strong>Facilities:</strong></Typography>
              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {room.facilities.map((f) => (
                  <Chip key={f._id} label={f.name} color="primary" />
                ))}
              </Box>
            </Grid>

         
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
