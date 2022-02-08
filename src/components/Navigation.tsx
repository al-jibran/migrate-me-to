import React, { useEffect } from 'react';
import { CloseMenuX, OpenMenuHamburger, Logo } from './svgs';

const Navigation = () => {
	let menu: Element | null;

	useEffect(() => {
		menu = document.getElementById('menu');
	});

	const handleCloseMenu = () => {
		menu?.classList.remove('translate-x-0');
	};

	const handleOpenMenu = () => {
		console.log(menu);
		menu?.classList.add(
			'translate-x-0',
			'transition-transform',
			'duration-1000'
		);
	};
	return (
		<header className='px-6 py-4'>
			<nav className='flex justify-between'>
				<Logo className='stroke-black w-48 hover:cursor-pointer'
				/>
				<Menu
					handleCloseMenu={handleCloseMenu}
					handleOpenMenu={handleOpenMenu}
				/>
			</nav>
		</header>
	);
};

export interface MenuProps {
	handleCloseMenu: () => void;
	handleOpenMenu: () => void;
}

export const Menu: React.FC<MenuProps> = ({
	handleCloseMenu,
	handleOpenMenu,
}) => {
	return (
		<div>
			<div className='flex w-24 justify-between items-center'>
				<svg
					className='h-8 w-min hover:cursor-pointer'
					viewBox='0 0 31 31'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<rect
						x='2'
						y='1.71094'
						width='27'
						height='27'
						rx='13.5'
						fill='#040404'
					/>
					<path
						d='M15.5 6.21094C13.72 6.21094 11.9799 6.73878 10.4999 7.72771C9.01983 8.71664 7.86628 10.1223 7.18509 11.7668C6.5039 13.4113 6.32567 15.2209 6.67294 16.9668C7.0202 18.7126 7.87737 20.3162 9.13604 21.5749C10.3947 22.8336 11.9984 23.6907 13.7442 24.038C15.49 24.3853 17.2996 24.207 18.9442 23.5259C20.5887 22.8447 21.9943 21.6911 22.9832 20.2111C23.9722 18.731 24.5 16.991 24.5 15.2109C24.5 14.7509 24.46 14.2909 24.4 13.8509C23.9003 14.5516 23.2401 15.1224 22.4746 15.5156C21.7091 15.9088 20.8606 16.1129 20 16.1109C18.8552 16.111 17.74 15.7474 16.8152 15.0726C15.8904 14.3978 15.2038 13.4467 14.8545 12.3565C14.5052 11.2663 14.5112 10.0934 14.8717 9.00679C15.2321 7.92022 15.9284 6.97622 16.86 6.31094C16.42 6.25094 15.96 6.21094 15.5 6.21094Z'
						fill='white'
					/>
					<rect
						x='2'
						y='1.71094'
						width='27'
						height='27'
						rx='13.5'
						stroke='black'
						strokeWidth='3'
						strokeLinejoin='round'
					/>
				</svg>
				<button id='open-menu' onClick={handleOpenMenu} data-testid='open-menu'>
					<OpenMenuHamburger className='fill-black w-min h-8 hover:cursor-pointer' />
				</button>
			</div>

			<menu
				className='fixed bg-gray-200 w-1/2 h-screen top-0 right-0 translate-x-full'
				id='menu'>
				<button
					id='close-menu'
					onClick={handleCloseMenu}
					data-testid='close-menu'
					className='float-right mt-4 mr-4 hover:cursor-pointer'>
					<CloseMenuX className='w-10 stroke-white fill-white' />
				</button>
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
			</menu>
		</div>
	);
};

export default Navigation;
