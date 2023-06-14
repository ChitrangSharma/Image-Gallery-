import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import "./Main.css";

import Form from "react-bootstrap/Form";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function Main() {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("nature");

  useEffect(() => {
    fetch(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=636e1481b4f3c446d26b8eb6ebfe7127&tags=${searchTerm}&per_page=10&format=json&nojsoncallback=1`
    )
      .then((response) => response.json())
      .then((data) => {
        const photos = data.photos.photo;
        const fetchedImages = photos.map((photo) => ({
          original: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`,
          thumbnail: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_t.jpg`,
          description: photo.title,
        }));
        setImages(fetchedImages);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [searchTerm]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchTerm(inputValue);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <Container className="main__container">
        <Card>
          <Card.Header>
            <span className="brand__name text-secondary">PicSum</span>
          </Card.Header>
          <Card.Body>
            <Form.Control
              className="text-center mb-4"
              type="text"
              aria-describedby="searchImage"
              id="inputSearch"
              placeholder="Search for some image..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <Card.Title></Card.Title>
            <h6 className="text-secondary text-center">
              Pics of {searchTerm}{" "}
            </h6>
            <div>
              <ImageGallery items={images} />
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Main;
