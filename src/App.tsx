import { IconProps } from '@iconify/react';
import React, { Suspense } from 'react';
import Navigation from './components/Navigation';
import Homepage from './routes/Homepage';

// For dark mode: linear-gradient(to right, #000000, #434343); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

const footerStyles = {
	mobile:
		'mt-8 h-80 relative bottom-0 bg-gradient-to-r from-[#e1fad4] to-[#72b39f] p-10',
	sm: 'sm:text-black',
};

export const App = () => {
	return (
		<>
			<div className='overflow-x-hidden h-full'>
				<Navigation />
				<Homepage />
				<Footer />
			</div>
		</>
	);
};

const Footer = () => {
	const styles: string[] = Object.values(footerStyles);
	const className = styles.join(' ');
	const Icon = React.lazy(() =>
		import('@iconify/react').then(({ Icon }) => ({ default: Icon }))
	);

	return (
		<div className={className}>
			<h3>Created by Al Jibran</h3>

			<p className='underline my-5'>While you&apos;re here check out my:</p>
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
