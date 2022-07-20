import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

interface Props {
    onDelete: () => (void | Promise<void>);
    onClose: () => void;
    open: boolean;
    title: string;
    description: string;
}

export default function DeleteAlertDialog({ open, onDelete, onClose, title, description }: Props) {
    return (
        <Dialog open={open} maxWidth="sm" fullWidth onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>Cancel</Button>
                <Button
                    color="warning"
                    autoFocus
                    onClick={() => { onDelete(); onClose() }}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    )
}