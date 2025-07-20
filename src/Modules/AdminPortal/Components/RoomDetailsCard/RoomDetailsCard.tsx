import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  IconButton,
  Chip,
  Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { RoomProps } from '../../../../Interfaces/Rooms.interface';




interface RoomDetailsModalProps {
  open: boolean;
  onClose: () => void;
  room: RoomProps;
}

export default function RoomDetailsCard({ open, onClose, room }: RoomDetailsModalProps) {



  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth

    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between' }}>
        Room Details
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid  size={{xs:12 , md:6}}>
            <Typography variant="subtitle2" color="text.secondary">Room Number</Typography>
            <Typography>{room.roomNumber}</Typography>
          </Grid>

          <Grid size={{xs:12 , md:6}}>
            <Typography variant="subtitle2" color="text.secondary">Capacity</Typography>
            <Typography>{room.capacity}</Typography>
          </Grid>

          <Grid size={{xs:12 , sm:6}}>
            <Typography variant="subtitle2" color="text.secondary">Price</Typography>
            <Typography>${room.price}</Typography>
          </Grid>

          <Grid size={{xs:12 , sm:6}}>
            <Typography variant="subtitle2" color="text.secondary">Discount</Typography>
            <Typography>{room.discount}%</Typography>
          </Grid>

          <Grid size={{xs:12 , sm:6}}>
            <Typography variant="subtitle2" color="text.secondary">Created By</Typography>
            <Typography>{typeof room.createdBy === "string" && room.createdBy}</Typography>
          </Grid>

        
          <Grid size={{xs:12}}>
            <Typography variant="subtitle2" color="text.secondary">Facilities</Typography>
            <Grid container spacing={1} mt={1}>
              {room?.facilities?.map((f) => (
                <Grid  key={f._id}>
                  <Chip label={f.name} color="primary" variant="outlined" />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

