'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getRouteConfig, RouteConfig } from '@/lib/get-route-config';

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
  const pathname = usePathname();
  const [routeConfig, setRouteConfig] = useState<RouteConfig | null>(null);

  useEffect(() => {
    // Update nav config whenever pathname changes
    async function updateNav() {
      const config = await getRouteConfig(pathname);
      setRouteConfig(config);
    }

    // noinspection JSIgnoredPromiseFromCall
    updateNav();
  }, [pathname]);

  return (
    <NavContext.Provider value={{ routeConfig, setRouteConfig }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
