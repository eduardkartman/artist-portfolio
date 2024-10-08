import React, { useState, useEffect } from "react";
import Artwork from "../components/Artwork";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap"; // Import Spinner and Alert from react-bootstrap
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import apiClient from "../apiClient";
import "../assets/Home.css";

function Home() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await apiClient.get('/artworks');
        const sortedArtworks = response.data.sort((a, b) => b.status - a.status);
        setArtworks(sortedArtworks);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          setError("You should verify if the server is open."); // Set error message for 500 status
        } else {
          setError("An unexpected error occurred. Please try again later.");
        }
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchArtworks();
  }, []);

  const handleDeleteArtwork = async (id) => {
    try {
      await apiClient.delete(`/artworks/${id}`);
      setArtworks(artworks.filter((artwork) => artwork.id !== id));
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  const handleEditArtwork = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <Container>
        <h2 className="page-title">My Portfolio</h2>
        {loading ? ( // Display the spinner while loading
          <div className="loading-spinner">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? ( // Display error message if there's an error
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : artworks.length === 0 ? (
          <div className="no-artworks-message">
            <p>You have no artworks yet.</p>
            <Link to="/add" className="button-add-artwork">
              Add New Artwork
            </Link>
          </div>
        ) : (
          <>
            <Link to="/add" className="button-add-artwork">
              Add New Artwork
            </Link>
            <Row>
              {artworks.map((artwork) => (
                <Col key={artwork.id} md={4} sm={6} className="mb-4">
                  <Artwork
                    artwork={artwork}
                    onDelete={handleDeleteArtwork}
                    onEdit={handleEditArtwork}
                  />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Home;
