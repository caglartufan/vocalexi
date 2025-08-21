'use client';
import React, { createContext, useContext, useState } from 'react';

interface RouteConfig {
  title: string;
  className: string;
}

interface NavContextType {
  routeConfig: RouteConfig | null;
  setRouteConfig: (config: RouteConfig | null) => void;
}

const NavContext = createContext<NavContextType>({
  routeConfig: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setRouteConfig: (_: RouteConfig | null) => {},
});

export function NavProvider({
  children,
}: Readonly<{ children: React.ReactElement }>) {
  const [routeConfig, setRouteConfig] = useState<RouteConfig | null>(null);

  return (
    <NavContext.Provider value={{ routeConfig, setRouteConfig }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
