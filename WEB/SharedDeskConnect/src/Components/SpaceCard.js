import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BoyIcon from "@mui/icons-material/Boy";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { getImageTypeFromBase64 } from "./helper";

export const SpaceCard = (props) => {
  const { space, editMode, onDelete } = props;
  const [imageList, setImageList] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State to manage modal visibility
  const navigate = useNavigate();



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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };

  useEffect(() => {
    getImages(space?.spaceID);
  }, [space?.spaceID]);

  const imageType = getImageTypeFromBase64(imageList[0] || "");

  const handleViewDetails = () => {
    navigate(
      `/space-details/:${space?.spaceID}?editMode=${
        editMode !== undefined && editMode === true ? editMode : false
      }`
    );
  };

  const handleDeleteSpace = async () => {
    if (onDelete) {
      onDelete(space.spaceID); // Call the onDelete function passed from parent with spaceId
    }
    setShowDeleteModal(false); // Hide the modal after deletion
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

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
          <span style={{ paddingRight: 5 }}>
            <LocationOnIcon fontSize={"10px"} />
          </span>
          {space?.city}, {space?.address}
        </Typography>
        <span className="card-price">{space.price + "\u20AC"}</span>
        <div className="card-capacity">
          <div className="capacity-container">
            <span>
              <BoyIcon />
            </span>
            <span>
              {space.availableCapacity === 0
                ? "full"
                : `${space.maxCapacity - space.availableCapacity}/${
                    space.maxCapacity
                  }`}
            </span>
          </div>
        </div>
      </CardContent>
      <CardActions className="footer-container">
        <Button size="small" onClick={handleViewDetails}>
          {editMode === true ? (
            <EditIcon fontSize="small" sx={{ paddingRight: "5px" }} />
          ) : (
            <VisibilityIcon fontSize="small" sx={{ paddingRight: "5px" }} />
          )}

          {editMode === true ? "Edit space" : " View Details"}
        </Button>
        {editMode === true && (
          <Button size="small" onClick={toggleDeleteModal}>
            <DeleteIcon fontSize="small" sx={{ paddingRight: "5px" }} />
            Delete space
          </Button>
        )}
      </CardActions>

      {/* Confirmation Modal */}
      <Modal
        open={showDeleteModal}
        onClose={toggleDeleteModal}
        aria-labelledby="delete-space-modal"
        aria-describedby="delete-space-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center'
        }}>
          <Typography id="delete-space-modal-description" variant="h6" gutterBottom>
            Are you sure you want to delete this space?
          </Typography>
          <Button onClick={handleDeleteSpace} variant="contained" color="error" sx={{ mr: 2 }}>
            Delete
          </Button>
          <Button onClick={toggleDeleteModal} variant="contained">
            Cancel
          </Button>
        </Box>
      </Modal>
    </Card>
  );
};
