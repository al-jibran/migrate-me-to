import React, { useState } from 'react';
import { CloseMenuX, OpenMenuHamburger, Logo, DarkModeToggle } from './svgs';

const Navigation = () => {
	return (
		<nav className='flex shadow-sm justify-between fixed px-10 py-4 w-full z-50 bg-gradient-to-r from-[#e1fad4] to-[#72b39f]'>
			<a href='/'>
				<Logo
					className='stroke-black w-48 hover:cursor-pointer'
					aria-label='logo'
				/>
			</a>
			<Menu />
		</nav>
	);
};

const Menu = () => {
	const [showMenu, setShowMenu] = useState(false);

	return <MenuContainer showMenu={showMenu} setShowMenu={setShowMenu} />;
};

interface MenuStateProps {
	showMenu: boolean;
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MenuContainer: React.FC<MenuStateProps> = ({
	showMenu,
	setShowMenu,
}) => {
	const menuStyle = showMenu ? 'translate-x-0' : 'translate-x-full';

	return (
		<menu className='mt-4'>
			<div className='flex w-24 justify-between lg:justify-end items-center'>
				<DarkModeToggle className='h-8 w-min hover:cursor-pointer' />
				<OpenMenuHamburger
					className='fill-black w-min h-8 hover:cursor-pointer block lg:hidden'
					aria-label='open-menu'
					onClick={() => setShowMenu(true)}
				/>
			</div>

			<div
				className={`fixed bg-gray-200 w-1/2 h-screen top-0 right-0 ${menuStyle} transition-transform duration-1000`}
				aria-label='menu'>
				<CloseMenuX
					className='float-right mt-4 mr-4 hover:cursor-pointer w-10 stroke-white fill-white'
					aria-label='close-menu'
					onClick={() => setShowMenu(false)}
				/>
				<ul className='mt-16 border-x'>
					<li>
						<a
							className='block text-white hover:text-gray-200 hover:bg-white px-8 py-6 text-xl'
							href='#'>
							Home
						</a>
					</li>
					<li>
						<a
							className='block text-white hover:text-gray-200 hover:bg-white px-8 py-6 text-xl'
							href='#'>
							Services
						</a>
					</li>
					<li>
						<a
							className='block text-white hover:text-gray-200 hover:bg-white px-8 py-6 text-xl'
							href='#'>
							About
						</a>
					</li>
					<li>
						<a
							className='block text-white hover:text-gray-200 hover:bg-white px-8 py-6 text-xl'
							href='#'>
							Code
						</a>
					</li>
				</ul>
			</div>
		</menu>
	);
};

export default Navigation;
