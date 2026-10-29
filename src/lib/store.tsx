import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type Prefill = {
  stage?: string;
  support?: string[];
  message?: string;
  source?: string;
};

type StoreValue = {
  prefill: Prefill;
  setPrefill: (p: Prefill) => void;
  clearPrefill: () => void;
  bookingOpen: boolean;
  openBooking: (context?: string) => void;
  closeBooking: () => void;
  bookingContext: string | null;
};

const StoreContext = createContext<StoreValue | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefillState] = useState<Prefill>({});
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingContext, setBookingContext] = useState<string | null>(null);

  const setPrefill = useCallback((p: Prefill) => setPrefillState(p), []);
  const clearPrefill = useCallback(() => setPrefillState({}), []);

  const openBooking = useCallback((context?: string) => {
    setBookingContext(context ?? null);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => setBookingOpen(false), []);

  const value = useMemo(
    () => ({ prefill, setPrefill, clearPrefill, bookingOpen, openBooking, closeBooking, bookingContext }),
    [prefill, setPrefill, clearPrefill, bookingOpen, openBooking, closeBooking, bookingContext]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside AppStoreProvider");
  return ctx;
}
