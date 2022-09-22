import React, { createContext, useContext, useMemo } from "react";
import useMedia from "use-media";

interface Props {
  children: React.ReactNode;
}

export const MediaQueryContext = createContext({
  isMobile: false,
  isPad: false,
  isPadXs: false
});

const mediaQueries = {
  mobile: "(max-width: 767px)",
  pad: "(min-width: 768px) and (max-width: 1500px)",
  padXs: "(min-width: 768px) and (max-width: 1200px)"
};

export default function MediaQueryProvider({ children }: Props): JSX.Element {
  const isMobile = useMedia(mediaQueries.mobile);
  const isPad = useMedia(mediaQueries.pad);
  const isPadXs = useMedia(mediaQueries.padXs);
  const value = useMemo(() => ({ isMobile, isPad, isPadXs }), [isMobile, isPad, isPadXs]);

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
}

export function useMediaQueryContext(): { isMobile: boolean; isPad: boolean, isPadXs: boolean } {
  return useContext(MediaQueryContext);
}
