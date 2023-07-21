import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import { IconButton, TextField } from '@mui/material';
import { DeleteRounded } from '@mui/icons-material';
import { useEffect, useState } from 'react';


interface ConvMenuProps {
    onAdd: (text: string) => void;
    openValue: boolean;
    onClose: () => void;
}

const ConvMenu: React.FC<ConvMenuProps> = ({ onAdd, openValue, onClose}) => {

    return (
        <div>
            <Drawer anchor="right" open={openValue} variant="persistent">
                <Box
                sx={{ width: 350, top: 0, left: 0, height: '98vh'}}
                role="presentation"
                >
                <IconButton aria-label="Example" style={{left: '15vw'}} onClick={onClose}>
                    <DeleteRounded />
                </IconButton>    
                <List>
                    {['in_channels', 'out_channels', 'kernel_size', 'stride', 'padding', 'bias'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <TextField id={text} label="Outlined" variant="outlined" />
                        <ListItemButton onClick={() => onAdd(text)}>
                        <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                <Divider />
                </Box>
            </Drawer>
        </div>
    );
};

export default ConvMenu;