import UnsplashUser from "@/models/unsplashuser";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Alert } from "@/components/bootstrap";

interface PageProps {
  params: { username: string };
}

async function getUser(username: string): Promise<UnsplashUser> {
  let response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.ACCESS_KEY}`
  );

  if (response.status === 404) notFound();
  return await response.json();
}
//let getUserCached=cache(getUser) use cache if you are not using native fetch
export async function generateMetadata({
  params: { username },
}: PageProps): Promise<Metadata> {
  let user = await getUser(username);
  return {
    title:
      [user.first_name, user.last_name].filter(Boolean).join(" ") ||
      user.username + "- Next 13.4 Image Gallery",
  };
}

export default async function Page({ params: { username } }: PageProps) {
  let user = await getUser(username);
  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong> to set the{" "}
        <strong>page title</strong> dynamically from the API response.
      </Alert>
      <h1>User Name : {user.username}</h1>
      <p>First Name : {user.first_name}</p>
      <p>Last Name : {user.last_name}</p>
      <a color="blue" href={"https://unsplash.com?" + user.username}>
        Unsplash Profile
      </a>
    </div>
  );
}
