import Image from "next/image";
import React from "react";

import { Alert } from "@/components/bootstrap";
import Link from "next/link";
type Props = {};

export const metadata = {
  title: "Static Fetch-Image Gallery app",
};

const StaticPage = async (props: Props) => {
  let response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" + process.env.ACCESS_KEY
  );
  

  let image = await response.json();

console.log("STATIC_IMAGE",image);

  let width = Math.min(500, image.width);
  let height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This Page <strong>fetches and catches the data at build time</strong>
        .Even though Unsplash Api return a new image .We see the same image after
        refreshing the page until we compile the project again.
      </Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mw-100 h-100"
      />
      by{" "}
      <Link href={"/users/" + image.user.username}>{image.user.username}e</Link>
    </div>
  );
};

export default StaticPage;
