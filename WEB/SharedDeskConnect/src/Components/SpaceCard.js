import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getImageTypeFromBase64 } from "./helper";
import { useNavigate } from "react-router-dom";
import BoyIcon from "@mui/icons-material/Boy";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const SpaceCard = (props) => {
  const space = props?.space;
  const editMode = props?.editMode;
  const [imageList, setImageList] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();

  const handleIsFavourite = () => {
    setIsFavourite(!isFavourite);
  };

  const getImages = async (spaceId) => {
    try {
      const response = await fetch(
        `http://localhost:5100/api/Space/${spaceId}/Images`
      )
        .then((response) => response.json())
        .then((data) => {
          setImageList(data);
        });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response}`);
      }
    } catch (error) {
      console.error("Error adding reservation:", error.message);
    }
  };

  useEffect(() => {
    getImages(space?.spaceID);
  }, [space?.spaceID]);

  const imageType = getImageTypeFromBase64(imageList[0] || "");

  const handleViewDetails = () => {
    // Navigate to the details page for the selected space
    navigate(`/space-details/:${space?.spaceID}?editMode=${editMode}`);
  };
  console.log("spce", space);
  return (
    <Card
      sx={{
        maxWidth: 345,
        position: "relative",
        flexBasis: "calc(51% - 15px)",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={`data:${imageType};base64,${imageList[0]}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {space?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {space?.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {space?.city}, {space?.address}
        </Typography>
        <span className="card-price">{space.price}$</span>
        <div className="card-capacity">
          <div className="capacity-container">
          <span>
            <BoyIcon />
          </span>
          <span>
            {space.maxCapacity -space.availableCapacity}/{space.maxCapacity}
          </span>
          </div>
        </div>
      </CardContent>
      <CardActions className="footer-container">
        <Button size="small" onClick={handleIsFavourite}>
          {!isFavourite ? (
            <FavoriteBorderIcon color="primary" />
          ) : (
            <FavoriteIcon color="primary" />
          )}
        </Button>
        <Button size="small" onClick={handleViewDetails}>
          {editMode ? "Edit space" : " View Details"}
        </Button>
      </CardActions>
    </Card>
  );
};
