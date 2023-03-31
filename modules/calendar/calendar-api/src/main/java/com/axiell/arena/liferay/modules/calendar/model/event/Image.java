package com.axiell.arena.liferay.modules.calendar.model.event;

import java.util.Objects;

public class Image {

    private String imageId;
    private String imageUrl;
    private String imageCaption;
    private String mimeType;
    private boolean primaryImage;

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageCaption() {
        return imageCaption;
    }

    public void setImageCaption(String imageCaption) {
        this.imageCaption = imageCaption;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public boolean isPrimaryImage() {
        return primaryImage;
    }

    public void setPrimaryImage(boolean primaryImage) {
        this.primaryImage = primaryImage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Image image = (Image) o;
        return primaryImage == image.primaryImage &&
                imageId.equals(image.imageId) &&
                imageUrl.equals(image.imageUrl) &&
                Objects.equals(imageCaption, image.imageCaption) &&
                Objects.equals(mimeType, image.mimeType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(imageId, imageUrl, imageCaption, mimeType, primaryImage);
    }
}
