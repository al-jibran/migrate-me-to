import React, { useState } from 'react';
import { CloseMenuX, OpenMenuHamburger, Logo, DarkModeToggle } from './svgs';

const Navigation = () => {
	return (
		<nav className='flex justify-between fixed mt-4 px-6 w-full'>
			<Logo
				className='stroke-black w-48 hover:cursor-pointer'
				aria-label='logo'
			/>
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
					<li className='hover'>
						<a
							className='block text-white hover:text-gray-200 hover:bg-white px-8 py-4 hover:ring-gray-200'
							href='#'>
							Home
						</a>
					</li>
					<li className=''>
						<a
							className='block text-white hover:text-gray-200 hover:bg-white px-8 py-4 hover:ring-gray-200'
							href='#'>
							Services
						</a>
					</li>
					<li className=''>
						<a
							className='block text-white hover:text-gray-200 hover:bg-white px-8 py-4 hover:ring-gray-200'
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
