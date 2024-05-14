import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";

export default function CheckboxList({ items, selectedItems, onItemToggle }) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {items.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            role={undefined}
            onClick={() => onItemToggle(index)}
            dense
          >
            {item.icon && (
              <ListItemIcon>
                <IconButton edge="start">{item.icon}</IconButton>
              </ListItemIcon>
            )}

            <ListItemText primary={item.label} />
            <Checkbox
              edge="start"
              checked={selectedItems[index]}
              tabIndex={-1}
              disableRipple
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
