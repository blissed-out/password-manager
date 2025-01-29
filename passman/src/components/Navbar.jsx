import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-600 text-white'>
            <div className="mycontainer flex justify-between items-center px-4 py-4 h-14">
                <div className="logo font-bold text-2xl">
                    <span className='text-green-700'>&lt;</span>
                    <span className=''>Passman</span>
                    <span className='text-green-700'>/&gt;</span>
                </div>
                <ul>
                    <li className='flex gap-5'>
                        <a className='hover:font-bold' href='/Home'>Home</a>
                        <a className='hover:font-bold' href='/About'>About</a>
                        <a className='hover:font-bold' href='/Contact'>Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar 
