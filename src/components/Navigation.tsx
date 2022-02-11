import React, { useContext, useState } from 'react';
import { ThemeContext } from '../App';
import { normalizeClass } from '../utility/normalizeClass';
import { CloseMenuX, OpenMenuHamburger, Logo, DarkModeToggle } from './svgs';

const styles = {
	nav: {
		mobile:
			'flex shadow-sm justify-between fixed px-10 py-4 w-full z-50 bg-gradient-to-r from-[#e1fad4] to-[#72b39f]',
		dark: 'dark:bg-gradient-to-r dark:from-[#000000] dark:to-[#434343]',
	},
};

const Navigation = () => {
	const className = normalizeClass(styles.nav);

	return (
		<nav className={className}>
			<a href='/'>
				<Logo
					className='stroke-black dark:stroke-white w-48 hover:cursor-pointer'
					aria-label='logo'
				/>
			</a>
			<Menu />
		</nav>
	);
};

const Menu = () => {
	const [showMenu, setShowMenu] = useState(false);
	const toggleTheme = useContext(ThemeContext);

	if (!toggleTheme) {
		throw new Error('No ThemeContext was found');
	}

	return (
		<MenuContainer
			showMenu={showMenu}
			setShowMenu={setShowMenu}
			toggleTheme={toggleTheme}
		/>
	);
};

interface MenuStateProps {
	showMenu: boolean;
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
	toggleTheme: () => void;
}

const navStyles = {
	darkMenuContainer: {
		mobile: 'flex w-24 justify-between lg:justify-end items-center',
	},

	darkModeToggle: {
		mobile: 'h-8 w-min hover:cursor-pointer stroke-black',
		dark: 'dark:stroke-white',
	},

	hamburgerMenu: {
		mobile: 'fill-black w-min h-8 hover:cursor-pointer block lg:hidden',
		dark: 'dark:fill-white',
	},

	menuContainer: {
		mobile:
			'fixed bg-gray-200 w-1/2 h-screen top-0 right-0 transition-transform duration-1000',
	},
	closeMenuX: {
		mobile:
			'float-right mt-4 mr-4 hover:cursor-pointer w-10 stroke-white fill-white',
	},
	menuItem: {
		mobile:
			'block text-white hover:text-gray-200 hover:bg-white px-8 py-6 text-xl',
	},
};

export const MenuContainer: React.FC<MenuStateProps> = ({
	showMenu,
	setShowMenu,
	toggleTheme,
}) => {
	const darkMenuClass = normalizeClass(navStyles.darkMenuContainer);
	const darkModeToggleClass = normalizeClass(navStyles.darkModeToggle);
	const hamburgerClass = normalizeClass(navStyles.hamburgerMenu);
	const menuContainer = normalizeClass(navStyles.menuContainer);
	const closeMenuX = normalizeClass(navStyles.closeMenuX);
	const menuItem = normalizeClass(navStyles.menuItem);
	const menuStyle = showMenu ? 'translate-x-0' : 'translate-x-full';

	return (
		<menu className='mt-4'>
			<div className={darkMenuClass}>
				<DarkModeToggle
					aria-label='dark mode toggle'
					className={darkModeToggleClass}
					onClick={toggleTheme}
				/>
				<OpenMenuHamburger
					className={hamburgerClass}
					aria-label='open-menu'
					onClick={() => setShowMenu(true)}
				/>
			</div>

			<div className={`${menuContainer} ${menuStyle}`} aria-label='menu'>
				<CloseMenuX
					className={closeMenuX}
					aria-label='close-menu'
					onClick={() => setShowMenu(false)}
				/>
				<ul className='mt-16 border-x'>
					<li>
						<a className={menuItem} href='#'>
							Home
						</a>
					</li>
					<li>
						<a onClick={() => setShowMenu(false)} className={menuItem} href='#'>
							Services
						</a>
					</li>
					<li>
						<a className={menuItem} href='#'>
							About
						</a>
					</li>
					<li>
						<a className={menuItem} href='#'>
							Code
						</a>
					</li>
				</ul>
			</div>
		</menu>
	);
};

export default Navigation;
