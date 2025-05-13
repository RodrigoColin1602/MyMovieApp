
'use client';

import React from "react";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


const link = [
    {href: '/popular',label: 'Popular'},
    {href: '/now-playing',label: 'Now-playing'},
    {href: '/top-rated',label: 'Top-rated'},
    {href: '/my-favourites',label: 'My-favourites'},
];

const Header = () => {
    const pathname = usePathname();
    return (
        <header className ="w-full border-b shadow sm">
            <div className ="container mx-auto felx items-center justify-between px-4 py-3">
                <Link href= "/" className = "text-xl front-bold text-gray-800 hover:text-blue-600 transition-colors">
                Movies DB 
                </Link>
                <nav className = "flex gap-6">
                    {link.map(({href,label}) => (
                        <Link key={href} 
                        href={href} 
                        className= {clsx(
                        " text sm front-medium transition-colors hover:text-blue-600",
                        pathname === href ? 'text-blue-600 underline' : 'text-gray-800',)}>
                        
                        {label}
                        </Link>
                    
                    ))}
                    </nav>
                </div>

        </header>
    );
};

export default Header;