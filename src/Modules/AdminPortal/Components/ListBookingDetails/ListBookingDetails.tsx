
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
  useTheme
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import { BookingDetailsProps } from "../../../../Interfaces/Booking.interface";



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ListBookingDetails({ open, onClose, booking }: BookingDetailsProps) {


  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: theme.palette.mode === "dark" ? "grey.900" : "background.paper",
          p: 2,
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle fontWeight="bold">Booking Details</DialogTitle>
        <IconButton onClick={onClose}>
          <CloseIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      </Box>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon color="primary" />
            <Typography>User: { booking.userName}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <MeetingRoomIcon color="primary" />
            <Typography>Room: {booking.roomNumber}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <MonetizationOnIcon color="success" />
            <Typography>Total Price: ${booking.totalPrice}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon color="info" />
            <Typography>Start Date: { booking.startDate ? new Date(booking.startDate).toLocaleDateString():"N/A"}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <CalendarMonthIcon color="info" />
            <Typography>End Date: { booking.endDate ?new Date(booking.endDate).toLocaleDateString():"N/A"}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <AccessTimeIcon color="warning" />
            <Typography>Status: {booking.status}</Typography>
          </Box>

         
        </Box>
      </DialogContent>
    </Dialog>
  );
}
