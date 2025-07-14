
import {
  Avatar,
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
import React from "react";
import { UserCardProps } from "../../../../Interfaces/Users.interface";
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserDetails({ open, onClose, user }: UserCardProps) {
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
          bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'background.paper',
          boxShadow: theme.shadows[5],
        }
      }}
    >
      {/* Title with Close Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" px={2} pt={2}>
        <DialogTitle sx={{ p: 0, fontWeight: 'bold', fontSize: '1.25rem' }}>
          User Details
        </DialogTitle>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      </Box>

      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          p={2}
        >
          <Avatar
            src={user.profileImage}
            alt={user.userName}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="h6" fontWeight="bold">
            {user.userName}
          </Typography>
          <Typography>Email: <strong>{user.email}</strong></Typography>
          <Typography>Phone: <strong>{user.phoneNumber}</strong></Typography>
          <Typography>Country: <strong>{user.country}</strong></Typography>
          <Typography>Role: <strong>{user.role}</strong></Typography>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
            ID: {user._id}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}





