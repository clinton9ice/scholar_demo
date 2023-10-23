'use client'
import { createContext, useState, useContext } from 'react';

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