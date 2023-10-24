'use client'
import { createContext, useState, useContext, useEffect } from 'react';

type ContextType = {
    isSideNavOpen: boolean
    closeSideNav: () => void;
}

const defaultContext : ContextType = {
    closeSideNav: () => {},
    isSideNavOpen: true
}

export const StoreContext = createContext<ContextType>(defaultContext);

type Props = {
    children: React.ReactNode;
};

export function useStoreProvider() {
    return useContext(StoreContext);
}

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });
  
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: Number(window.innerWidth || 0),
          height: Number(window.innerHeight || 0),
        });
      }
      
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
      
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); 
    return windowSize;
  }

  export const isMobile = () =>{
    return window.innerWidth <=768
  }

export function Provider({ children }: Props) {

    const [isSideNavOpen, closeSideNav] = useState<boolean>(true);
  

    const value:ContextType = {
        isSideNavOpen,
        closeSideNav: () => closeSideNav(!isSideNavOpen)
    }
    return (
        <>
            <StoreContext.Provider value={value}>
                {children}
            </StoreContext.Provider>
        </>
    );
}