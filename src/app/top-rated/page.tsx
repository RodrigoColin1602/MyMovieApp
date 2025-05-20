import { Suspense } from "react";

import TopRatedClient from "./TopRatedClient";

export default function PopularPage() {
  return (
    <Suspense>
      <div>
    
        <TopRatedClient />
      </div>
      </Suspense>
  );
}