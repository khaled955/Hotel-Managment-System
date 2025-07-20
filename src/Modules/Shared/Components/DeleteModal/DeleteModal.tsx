import { DeletModelProps } from '../../../../Interfaces/DeletModal.interface';
import delet from "../../../../assets/images/delete.png"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Avatar, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress'; // Added for loading state


export default function DeleteModal({ onClose, currentData, open, message, loading, onDelete }: DeletModelProps) {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      fullWidth  // Ensures dialog uses available width
      maxWidth="sm" // Controls maximum width (xs, sm, md, lg, xl)
    >
      <DialogTitle id="responsive-dialog-title">
        🗑️ Delete Confirmation
      </DialogTitle>
      
      <DialogContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar 
            sx={{ 
              height: { xs: 80, sm: 100 }, 
              width: { xs: 80, sm: 100 } 
            }} 
            src={delet} 
          />
        </Box>
        
        <DialogContentText textAlign="center">
          {message}
        </DialogContentText>
      </DialogContent>
      
      <DialogActions sx={{ padding: 3 }}>
        <Button 
          disabled={loading} 
          variant="outlined" 
          onClick={onClose}
          sx={{ flex: 1 }}
        >
          Cancel
        </Button>
        
        <Button
          variant="contained"
          color="error"
          disabled={loading}
          onClick={() => onDelete(currentData._id)}
          startIcon={loading ? <CircularProgress size={20} /> : <DeleteIcon />}
          sx={{ flex: 1 }}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}








