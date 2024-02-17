import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { getImageTypeFromBase64 } from "./helper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const SpaceCard = (props) => {
  const space = props?.space;
  console.log("🚀 ~ SpaceCard ~ space:", space);
  const [imageList, setImageList] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleIsFavourite = () => {
    //TO DO 
    //ADD space to favourite
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
          {space?.desription}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {space?.city}
          {", "}
          {space?.adress}
        </Typography>
        <span className="card-price">{space.price}$</span>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() =>{handleIsFavourite()}}>
          {" "}
          {!isFavourite ? (
            <FavoriteBorderIcon color="primary" />
          ) : (
            <FavoriteIcon color="primary" />
          )}
        </Button>
        <Button size="small">View Detalis</Button>
      </CardActions>
    </Card>
  );
};
