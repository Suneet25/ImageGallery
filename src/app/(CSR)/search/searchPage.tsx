"use client";

import { UnplashImage } from "@/models/unsplashImage";
import Image from "next/image";
import { useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css";

const SearchPage = () => {
  let [searchInput, setSearchInput] = useState("");
  let [searchResults, setSearchResults] = useState<UnplashImage[] | null>(null);
  let [searchLoading, setSearchLoading] = useState(false);
  let [searchError, setSearchError] = useState(false);
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (searchInput) {
      try {
        setSearchError(false);
        setSearchLoading(true);
        let response = await fetch("/api/search?query=" + searchInput);
        let images: UnplashImage[] = await response.json();
        setSearchResults(images);
        console.log(searchResults);
      } catch (error) {
        setSearchError(true);
        console.log(error);
      } finally {
        setSearchLoading(false);
      }
    }
  }

  return (
    <div>
      <Alert>
        This page fetches data <strong>client-side</strong>.In order to not leak
        the API credentals, the request is sent to Next JS{" "}
        <strong>route handler</strong> that returns on the server.This route
        handler than fetches the data from the Unsplsh API and returns it to the
        client.
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search Query</Form.Label>
          <Form.Control
            name="query"
            placeholder="e.g Dogs,Pizza..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          ></Form.Control>
          <Button type="submit" className="mt-3">
            Search
          </Button>
        </Form.Group>
      </Form>
      <div className="d-flex flex-column align-items-center">
        {searchLoading && <Spinner animation="border" />}
        {searchError && <p>Something went wrong , Please try again!</p>}
        {searchResults?.length === 0 && (
          <p>Nothing found , try a different query!</p>
        )}
      </div>
      {searchResults && (
        <>
          {searchResults &&
            searchResults?.map((image) => (
              <Image
                src={image.urls.raw}
                key={image.urls.raw}
                width={250}
                height={250}
                alt={image.description}
                className={styles.image}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default SearchPage;
