'use client'
import React, { useRef, createContext} from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useStoreProvider } from '@/store';
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
    const {isSideNavOpen} = useStoreProvider()
    const classes = [props?.className, 'overflow-hidden w-full custom-transition light-shadow bg-white py-10', isSideNavOpen? 'max-w-[300px]': 'max-w-[0]'].join(' ')
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
    const linkClasses = (arg: string) => ['inline-flex w-full group transition hover:text-red-400 py-5 items-center gap-3', pathname === arg? 'text-red-700': 'text-neutral-500'].join(' ')
  
    return (
        <aside className={classes}>
            <div className="px-5">

            <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-full border overflow-hidden border-gray-100">
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
                            <Link href={item.link} className={linkClasses(item.link)}>
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
    )
}