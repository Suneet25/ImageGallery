import Image from "next/image";
import React from "react";
import { unplashImage } from "@/models/unsplashImage";
import { Alert } from "@/components/bootstrap";
import Link from "next/link";
import { deflate } from "zlib";
type Props = {};

export const metadata = {
  title: "Dynamic Fetch-Image Gallery app",
};

export const revalidate = 0;
const DynamicPage = async (props: Props) => {
  let response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" + process.env.ACCESS_KEY,
    {
        // cache:"no-cache(or)no-store"
        // next:{revalidate:0}
    }
  );

  let image = await response.json();

  let width = Math.min(500, image.width);
  let height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This Page <strong>fetches and catches the data dynamically</strong>
        .Evreytime you refresh the page you will get a new response / image from
        the unsplash Api.
      </Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mw-100 h-100"
      />
      by
      <Link href={"/users/" + image.user.username}>{image.user.username}e</Link>
    </div>
  );
};

export default DynamicPage;
