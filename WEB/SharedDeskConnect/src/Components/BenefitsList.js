import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WifiIcon from "@mui/icons-material/Wifi";
import HearingIcon from '@mui/icons-material/Hearing';
import PrintIcon from '@mui/icons-material/Print';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';


export default function BenefitsList({ items }) {
  const getIconByLabel = (label) => {
    switch (label) {
      case "Free Wifi":
        return <WifiIcon />;
      case "24/7 access":
        return <AccessTimeIcon />;
      case "Quiet workspace environment":
        return <HearingIcon />;
      case "Access to printing facilities":
        return <PrintIcon />;
      case "Accessible parking":
        return <DirectionsCarFilledIcon />;
      case "Free coffee/drinks":
        return <CoffeeMakerIcon />;
      case "Game room":
        return <SportsEsportsIcon />;
      default:
        return <AddIcon/>;
    }
  };

  const itemObjects = items.map((item) => {
    const currentObject = { label: item, icon: getIconByLabel(item) };
    return currentObject;
  });
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {itemObjects.map((item, index) => (
        <ListItem key={index} disablePadding>
          {item.icon && (
            <ListItemIcon>
              <IconButton edge="start">{item.icon}</IconButton>
            </ListItemIcon>
          )}
          <ListItemText primary={item.label} />
          <CheckCircleIcon />
        </ListItem>
      ))}
    </List>
  );
}
