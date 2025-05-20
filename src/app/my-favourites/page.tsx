import { Suspense } from "react";
import NowPlayingPageClient from "./MyFavouritesClient";

export default function MyFavoritesClient() {
  return (
    <Suspense>
      <div>
    
        <NowPlayingPageClient />
      </div>
      </Suspense>
  );
}