import { ImageList, ImageListItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getImageTypeFromBase64 } from "../../Components/helper";

export const SpaceDetailsPage = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const cleanedId = id.substring(1); // Remove ":" character from the ID
  const [imageList, setImageList] = useState([]);
console.log("images:",imageList)
  const [spaceDetails, setSpaceDetails] = useState(null);

  useEffect(() => {
    // Fetch space details based on the ID
    const fetchSpaceDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5100/api/Space/${cleanedId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch space details");
        }
        const data = await response.json();
        setSpaceDetails(data);
      } catch (error) {
        console.error("Error fetching space details:", error.message);
      }
    };

    fetchSpaceDetails();

    // Cleanup function
    return () => {
      // Any cleanup code if needed
    };
  }, [cleanedId]);

  const getImages = async (spaceId) => {
    try {
      const response = await fetch(
        `http://localhost:5100/api/Space/${cleanedId}/Images`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  console.log("data:",data)
      // Convert image content to URL format
      const formattedImages = data.map((imageContent, index) => ({
        img: `data:${getImageTypeFromBase64(imageContent || "")};base64,${imageContent}`, // Assuming JPEG format
        id: index, // Add a unique ID for each image
      }));
  
      setImageList(formattedImages);
    } catch (error) {
      console.error("Error fetching images:", error.message);
    }
  };
  

  useEffect(() => {
    getImages(cleanedId);
  }, [cleanedId]);

  if (!spaceDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ImageList
        sx={{ width: 500, height: 450 }}
        variant="woven"
        cols={3}
        gap={8}
      >
        {imageList.map((item) => (
          <ImageListItem key={item.id}>
            <img
              srcSet={`${item.img}`}
              src={`${item.img}`}
              alt={item.id}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <h2>{spaceDetails.name}</h2>
      <p>Description: {spaceDetails.description}</p>
      <p>City: {spaceDetails.city}</p>
      <p>Address: {spaceDetails.address}</p>
      <p>Price: {spaceDetails.price}</p>
      {/* Add more details as needed */}
    </div>
  );
};
