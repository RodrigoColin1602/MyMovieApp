import { Suspense } from "react";
import PopularClient from "./PopularClient";

export default function PopularPage() {
  return (
    <Suspense>
      <div>
    
        <PopularClient />
      </div>
      </Suspense>
  );
}