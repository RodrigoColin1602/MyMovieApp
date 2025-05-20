import { Suspense } from "react";
import NowPlayingPageClient from "./Now_PlayingClient";

export default function NowPlayingPage() {
  return (
    <Suspense>
      <div>
    
        <NowPlayingPageClient />
      </div>
      </Suspense>
  );
}