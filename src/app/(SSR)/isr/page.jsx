import Image from "next/image";
import React from "react";
import { unplashImage } from "@/models/unsplashImage";
import { Alert } from "@/components/bootstrap";
import Link from "next/link";



export const metadata = {
  title: "Incrementsl Static Regeneration Fetch-Image Gallery app",
};

// export const revalidate = 15;
const ISR = async (props) => {
  let response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.ACCESS_KEY,
    {
       next:{revalidate:15}
    }
  );

  let image = await response.json();

  let width = Math.min(500, image.width);
  let height = (width / image.width) * image.height;
  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This Page uses<strong>Incremental Static Regeneration</strong>
        .A new image is fethed in evrey 15 seconds(after refreshing the page)
        and serves from the cache for that duration.
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

export default ISR;
