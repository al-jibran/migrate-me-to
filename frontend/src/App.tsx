import { IconProps } from '@iconify/react';
import React, { createContext, Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import { normalizeClass } from './utility/normalizeClass';

type ToggleDarkModeType = () => void;

export const ThemeContext = createContext<ToggleDarkModeType | undefined>(
	undefined
);

/* Note the stars in dark property surrounding from and to.
	They are to exempt them from being prefixed with their screen size. 
 */
const styles = {
	app: {
		sm: 'overflow-x-hidden h-full',
		dark: 'dark:bg-gradient-to-r dark:from-black dark:to-gray-200 dark:text-white',
	},
	footer: {
		mobile: 'bg-gradient-to-r from-gradientLightStart to-gradientLightStop',
		dark: 'dark:bg-gradient-to-r dark:from-black dark:to-gray-400 dark:border dark:border-t-white',
	},
	footerContainer: {
		mobile: 'mt-8 p-10 relative bottom-0',
		sm: 'sm:px-14',
		md: 'md:px-16',
		lg: 'lg:px-24',
		xl: 'xl:max-w-5xl xl:mx-auto',
	},
};

export const App = () => {
	const [darkMode, setDarkMode] = useState('dark');
	const className = normalizeClass(styles.app);

	useEffect(() => {
		const theme: string | null = window.localStorage.getItem('theme');

		if (!theme && !(typeof theme === 'string')) {
			window.localStorage.setItem('theme', 'dark');
			return;
		}

		setDarkMode(theme);
	});

	const toggleDarkMode = (): void => {
		const setTo = darkMode === 'dark' ? '' : 'dark';
		setDarkMode(setTo);
		window.localStorage.setItem('theme', setTo);
	};
	return (
		<ThemeContext.Provider value={toggleDarkMode}>
			<div data-testid='container' className={darkMode}>
				<div className={className}>
					<Navigation />
					<Outlet />
					<Footer />
				</div>
			</div>
		</ThemeContext.Provider>
	);
};

const Footer = () => {
	const className = normalizeClass(styles.footer);
	const containerStyle = normalizeClass(styles.footerContainer);

	const Icon = React.lazy(() =>
		import('@iconify/react').then(({ Icon }) => ({ default: Icon }))
	);

	return (
		<footer className={className}>
			<div className={containerStyle}>
				<h3>Created by Al Jibran</h3>

				<p className='my-5 tracking-wider'>
					While you&apos;re here check out my:
				</p>
				<ul className='sm:grid sm:grid-cols-2 md:grid-cols-4'>
					<SocialItem
						Icon={Icon}
						iconName='carbon:document-sentiment'
						siteInfo={{ name: 'Portfolio', url: '#' }}
					/>
					<SocialItem
						Icon={Icon}
						iconName='logos:linkedin-icon'
						siteInfo={{ name: 'LinkedIn', url: '#' }}
					/>
					<SocialItem
						Icon={Icon}
						iconName='cib:github'
						siteInfo={{
							name: 'Github',
							url: 'https://www.github.com/al-jibran',
						}}
					/>
					<SocialItem
						Icon={Icon}
						iconName='logos:twitter'
						siteInfo={{
							name: 'Twitter',
							url: 'https://www.twitter.com/Hi-Flexive',
						}}
					/>
				</ul>
			</div>
		</footer>
	);
};

interface SocialItem {
	Icon: React.LazyExoticComponent<
		(
			props: IconProps
		) => React.ReactElement<
			IconProps,
			string | React.JSXElementConstructor<unknown>
		>
	>;
	siteInfo: { name: string; url: string };
	iconName: string;
}

const SocialItem: React.FC<SocialItem> = ({ Icon, siteInfo, iconName }) => {
	return (
		<div>
			<li className='flex items-center'>
				<Suspense fallback={<div>Loading...</div>}>
					<Icon icon={iconName} fontSize={30} className='dark:text-white' />
				</Suspense>
				<a className='py-2 block w-full ml-5 text-lg' href={siteInfo.url}>
					{siteInfo.name}
				</a>
			</li>
		</div>
	);
};

export default App;
