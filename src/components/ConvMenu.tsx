import { DeleteRounded } from '@mui/icons-material';
import { useState } from 'react';
import {IconButton, 
        TextField, 
        Drawer, 
        ListItem, 
        List, 
        Box,
        Button} from '@mui/material';


enum ConvParameter {
    IN_CHANNELS = 'in_channels',
    OUT_CHANNELS = 'out_channels',
    KERNEL_SIZE = 'kernel_size',
    STRIDE = 'stride',
    PADDING = 'padding',
    BIAS = 'bias',
    }

interface ConvMenuProps {
    openValue: boolean;
    onClose: () => void;
}

interface ParamState {
    [ConvParameter.IN_CHANNELS]: number;
    [ConvParameter.OUT_CHANNELS]: number;
    [ConvParameter.KERNEL_SIZE]: number;
    [ConvParameter.STRIDE]: number;
    [ConvParameter.PADDING]: number;
    [ConvParameter.BIAS]: boolean;
  }
  
  const initialParamState: ParamState = {
    [ConvParameter.IN_CHANNELS]: 32,
    [ConvParameter.OUT_CHANNELS]: 64,
    [ConvParameter.KERNEL_SIZE]: 3,
    [ConvParameter.STRIDE]: 0,
    [ConvParameter.PADDING]: 0,
    [ConvParameter.BIAS]: true,
  };

const ConvMenu: React.FC<ConvMenuProps> = ({openValue, onClose}) => {
    const [paramState, setParamState] = useState<ParamState>(initialParamState);

    const onParmChange = () => {
        // You can access each parameter's value independently here
        console.log('in_channels:', paramState[ConvParameter.IN_CHANNELS]);
        console.log('out_channels:', paramState[ConvParameter.OUT_CHANNELS]);
        console.log('kernel_size:', paramState[ConvParameter.KERNEL_SIZE]);
        console.log('stride:', paramState[ConvParameter.STRIDE]);
        console.log('padding:', paramState[ConvParameter.PADDING]);
        console.log('bias:', paramState[ConvParameter.BIAS]);
      };
    

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
                    {Object.values(ConvParameter).map((param) => (
                    <ListItem key={param} disablePadding>
                        <TextField 
                            id={param} 
                            label={param} 
                            variant="outlined" 
                            onChange={(e) => setParamState((prevState) => ({ ...prevState, [param]: e.target.value }))} 
                            style={{marginTop: '1vh', marginLeft: '1vw'}} 
                        />
                    </ListItem>
                    ))}
                </List>
                <Button variant="contained" component="label" onClick={onParmChange} style={{left: '6vw', top: '3vh'}}>
                    Save
                </Button>
                </Box>
            </Drawer>
        </div>
    );
};

export default ConvMenu;