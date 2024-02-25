import React from "react";
import ImageUploading from "react-images-uploading";
import "./styles/UploadComponent.css";
import Button from "@mui/material/Button";

export const UploadComponent = (props) => {
  const { setImages, images } = props;
  const maxNumber = 69;
  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);
  };

  return (
    <div>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
        acceptType={["jpg", "png"]}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemove,
          dragProps,
          isDragging,
        }) => (
          // write your building UI
          <div className="images-wrapers">
            <Button variant="contained" onClick={onImageUpload} {...dragProps}  sx={{ ...(isDragging && { color: "red" }) }}

>
              Click or Drop here
            </Button>
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <Button
                  size="small"
                    variant="contained"
                    onClick={() => onImageRemove(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};
