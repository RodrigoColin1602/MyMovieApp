"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getGuestSession } from "../services/auth/getGuestSession";

const GuestSessionContext = createContext<{
  guestSessionId: string | null;
  setGuestSessionId: (id: string) => void;
}>({
  guestSessionId: null,
  setGuestSessionId: () => {},
});

export const GuestSessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [guestSessionId, setGuestSessionIdState] = useState<string | null>(null);

  const setGuestSessionId = (id: string) => {
    localStorage.setItem("guestSessionId", id);
    setGuestSessionIdState(id);
  };

  // Use useCallback to memoize fetchGuestSession
  const fetchGuestSession = useCallback(async () => {
    const data = await getGuestSession();
    if (data.guest_session_id) {
      setGuestSessionId(data.guest_session_id);
    }
  }, []); // No dependencies here since fetchGuestSession doesn't rely on any external values

  useEffect(() => {
    const existingId = localStorage.getItem("guestSessionId");
    if (existingId) {
      setGuestSessionIdState(existingId);
    } else {
      fetchGuestSession(); // Call the memoized function
    }
  }, [fetchGuestSession]); // Now fetchGuestSession is included in the dependency array

  return (
    <GuestSessionContext.Provider value={{ guestSessionId, setGuestSessionId }}>
      {children}
    </GuestSessionContext.Provider>
  );
};

export const useGuestSession = () => useContext(GuestSessionContext);
