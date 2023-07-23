import { DeleteRounded } from '@mui/icons-material';
import {IconButton, 
        Divider, 
        ListItem, 
        Drawer, 
        Box, 
        Button,  
        List} from '@mui/material';


interface OutputMenuProps {
    openValue: boolean;
    onClose: () => void;
}

const OutputMenu: React.FC<OutputMenuProps> = ({ openValue, onClose}) => {
    
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
                <Divider />    
                <List>
                    <ListItem key='abc'>
                        <Button variant="contained" component="label" style={{left: '6vw'}}>
                            Run
                        </Button>
                    </ListItem>
                </List>
                <Divider />
                </Box>
            </Drawer>
        </div>
    );
};

export default OutputMenu;