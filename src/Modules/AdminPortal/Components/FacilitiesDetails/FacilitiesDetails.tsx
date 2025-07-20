
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Slide,
} from "@mui/material";
import { Close, Info, Person, CalendarToday } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import { FacilitieDetailsProps } from "../../../../Interfaces/Facilities.interface";



const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FacilitiesDetails: React.FC<FacilitieDetailsProps> = ({ open, onClose, facility }) => {

  if (!facility) return null;

  const displayCreator =
    typeof facility.createdBy === "string"
      ? facility.createdBy
      : facility.createdBy?.userName;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography fontWeight={600}>
          Facility Details
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Info color="primary" />
            <Typography><strong>Name:</strong> {facility.name}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Person color="primary" />
            <Typography><strong>Created By:</strong> {displayCreator}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <CalendarToday color="primary" />
            <Typography><strong>Created At:</strong> {new Date(facility.createdAt).toLocaleDateString()}</Typography>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default FacilitiesDetails;
