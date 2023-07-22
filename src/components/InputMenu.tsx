import {IconButton, 
        Divider, 
        ListItem, 
        Drawer, 
        Box, 
        Button, 
        ImageList, 
        ImageListItem, 
        List} from '@mui/material';
import { DeleteRounded } from '@mui/icons-material';
import { useState } from 'react';


interface InputMenuProps {
    onAdd: (text: string) => void;
    openValue: boolean;
    onClose: () => void;
}

const InputMenu: React.FC<InputMenuProps> = ({ onAdd, openValue, onClose}) => {
    const [selectedImage, setSelectedImage] = useState<Blob | MediaSource | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target?.files;
        if (files && files.length > 0) {
          setSelectedImage(files[0]);
        }
      };
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
                            Upload
                            <input hidden accept="image/*" multiple type="file" onChange={handleFileChange}/>
                        </Button>
                    </ListItem>
                </List>
                <Divider />
                {selectedImage && (
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    <ImageListItem style={{left: '5vw'}}>
                    <img
                        src={URL.createObjectURL(selectedImage)}
                        loading="lazy"
                    />
                    </ImageListItem>
                </ImageList>
                )}
                </Box>
            </Drawer>
        </div>
    );
};

export default InputMenu;