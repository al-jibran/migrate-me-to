import { IconProps } from '@iconify/react';
import React, { createContext, Suspense, useState } from 'react';
import Navigation from './components/Navigation';
import Homepage from './routes/Homepage';
import { normalizeClass } from './utility/normalizeClass';

type ToggleDarkModeType = () => void;

export const ThemeContext = createContext<ToggleDarkModeType | undefined>(
	undefined
);

/* Note the stars in dark property surrounding from and to.
	They are to exempt them from being prefixed with their screen size. 
 */
const footerStyles = {
	mobile:
		'mt-8 p-10 relative bottom-0 bg-gradient-to-r from-gradientLightStart to-gradientLightStop',
	dark: 'dark:bg-gradient-to-r dark:from-black dark:to-gray-400 dark:border dark:border-t-white',
};

export const App = () => {
	const [darkMode, setDarkMode] = useState('dark');

	const toggleDarkMode = (): void => {
		const setTo = darkMode === 'dark' ? '' : 'dark';
		setDarkMode(setTo);
	};
	return (
		<ThemeContext.Provider value={toggleDarkMode}>
			<div
				data-testid='container'
				className={`${darkMode} overflow-x-hidden h-full`}>
				<div className='dark:bg-gradient-to-r dark:from-black dark:to-gray-200 dark:text-white'>
					<Navigation />
					<Homepage />
					<Footer />
				</div>
			</div>
		</ThemeContext.Provider>
	);
};

const Footer = () => {
	const className = normalizeClass(footerStyles);

	const Icon = React.lazy(() =>
		import('@iconify/react').then(({ Icon }) => ({ default: Icon }))
	);

	return (
		<div className={className}>
			<h3>Created by Al Jibran</h3>

			<p className='my-5 tracking-wider'>
				While you&apos;re here check out my:
			</p>
			<ul>
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
					iconName='logos:github-icon'
					siteInfo={{ name: 'Github', url: 'https://www.github.com/al-jibran' }}
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
					<Icon icon={iconName} fontSize={30} />
				</Suspense>
				<a className='py-2 block w-full ml-5 text-lg' href={siteInfo.url}>
					{siteInfo.name}
				</a>
			</li>
		</div>
	);
};

export default App;
