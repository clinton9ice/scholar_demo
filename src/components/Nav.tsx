'use client'
import React, { useRef, createContext, useEffect} from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useStoreProvider, useWindowSize } from '@/store';
import {NavIcon,  Menu, DashboardLinkIcon, TeacherLinkIcon, StudentLinkIcon} from '@/components'

export const NavContext = createContext({
    isSideNavOpen: false
});

export const  TopNav = () => {
    const {closeSideNav} = useStoreProvider()

    return (
        <header>
            <nav className="flex px-5 items-center bg-white light-shadow min-h-[60px] justify-between">
                <button type='button' className='btn' onClick={closeSideNav}>
                    <Menu />
                </button>

                <NavIcon />
            </nav>
        </header>
    );
}

export const SideNav = (props?:{ className?: string }) =>{
    const {isSideNavOpen, closeSideNav} = useStoreProvider()
    const {width} = useWindowSize()
    const isMobile = width < 768
    
    const classes = [props?.className, 'overflow-hidden w-full  md:h-[unset] md:static  custom-transition light-shadow bg-white py-10 z-20', isSideNavOpen? 'md:max-w-[300px]': 'md:max-w-[0]', isMobile && isSideNavOpen ? 'max-w-[0]': 'max-w-[300px] fixed left-0 h-full top-0' ].join(' ')
    const pathname = usePathname()
    const lists = useRef([
        {
            label:'Dashboard',
            icon: <DashboardLinkIcon />,
            link: '/'
        },
        {
            label:'Teacher',
            icon: <TeacherLinkIcon />,
            link:'/manage-teachers'
        },
        {
            label:'Student',
            icon: <StudentLinkIcon />,
            link: '/manage-students'
        },
    ])
    const linkClasses = (arg: string) => ['inline-flex w-full group transition hover:text-red-400 py-5 items-center gap-3  ', pathname === arg? 'text-red-700': 'text-neutral-500'].join(' ')
  
 
    return (
        <React.Fragment>
            <div className={`fixed top-0 h-full transition from-transparent to-gray-700 z-10 w-full md:hidden bg-gradient-to-br ${!isSideNavOpen? 'opacity-80': 'opacity-0 -z-20'}`} onClick={closeSideNav} />
        <aside className={classes}>
            <div className="px-5">

            <div className="flex items-center gap-5">
                <div className="h-14 w-14 flex-none rounded-full border overflow-hidden border-gray-100">
                    <Image src={'https://placehold.co/120x120.png'} height={60} width={60} alt='placeholder' />
                </div>
                <div className="">
                    <div className=" text-slate-800 text-sm font-medium">
                        Ufere Emmanuel
                    </div>
                    <div className="text-neutral-500 text-[11px] font-medium tracking-tight">
                        UIUX_CO31
                    </div>
                </div>
            </div>

            <ul className="mt-16 flex flex-col !stroke-red-700">
                {
                    lists.current.map((item) =>{
                    return (
                    <li key={item.label}>
                            <Link href={item.link} className={linkClasses(item.link)} onClick={() => isMobile && closeSideNav()}>
                                {item.icon}
                                <div className="text-[13px] font-medium tracking-tight">
                                    {item.label}
                                </div>
                            </Link>
                    </li>
                        )
                    })
                }
            </ul>
            </div>
        </aside>
        </React.Fragment>
    )
}