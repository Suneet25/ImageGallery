import { UnplashImage } from "@/models/unsplashImage";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";
//export const revalidate=0   --This will act as dynamic fetching

//export const dynamicParams=false;  --This will only fetch the data we are passing into the array .

interface PageProps {
  params: { topic: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + "- Image Gallery App",
  };
}

export function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function page({ params: { topic } }: PageProps) {
  let response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.ACCESS_KEY}`
  );
  let images: UnplashImage[] = await response.json();

  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time,even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched and
        rendered on first access and then{" "}
        <strong>cached for subsequent requests</strong>(this can be disabled by
        proviing dynamicParams=false)
      </Alert>
      <h1>{topic}</h1>
      {images.map((image) => (
        <Image
          src={image.urls.raw}
          width={250}
          height={250}
          className={styles.image}
          alt={image.description}
          key={image.urls.raw}
        />
      ))}
    </div>
  );
}
