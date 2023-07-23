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

type OnAddFunction = (key: string) => void;

interface MainMenuProps {
  onAdd: OnAddFunction;
}

const MainMenu: React.FC<MainMenuProps> = ({ onAdd }) => {
 
  return (
    <div>
      <Drawer anchor="left" open={true} variant="persistent">
        <Box
        sx={{ width: 250, top: 0, left: 0, height: '98vh'}}
        role="presentation"
      >
        <List>
          {['Conv', 'Linear', 'Activation', 'Pool'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => onAdd(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Input', 'Output'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => onAdd(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
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
}

export default MainMenu;
