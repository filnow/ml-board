import List from '@mui/material/List';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { IconButton, TextField } from '@mui/material';
import { DeleteRounded } from '@mui/icons-material';


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
                <IconButton aria-label="Example" style={{left: '15vw', marginTop: '1vh'}} onClick={onClose}>
                    <DeleteRounded />
                </IconButton>    
                <List>
                    {['in_channels', 'out_channels', 'kernel_size', 'stride', 'padding', 'bias'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <TextField id={text} label={text} variant="outlined" style={{marginTop: '1vh', marginLeft: '1vw'}} />
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