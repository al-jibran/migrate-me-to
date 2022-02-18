import { TwitterLogo, RedditLogo } from '../components/svgs';
import { SVGProps } from 'react';

export type ServiceType = {
	name: string;
	LogoSvgComponent: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	transferrableList: string[];
};

export const services: ServiceType[] = [
	{
		name: 'Twitter',
		LogoSvgComponent: TwitterLogo,
		transferrableList: ['Following', 'Friends', 'Liked'],
	},
	{
		name: 'Reddit',
		LogoSvgComponent: RedditLogo,
		transferrableList: ['Subreddits', 'Saved', 'Upvoted'],
	},
];

export const serviceColors: Record<string, string> = {
	Twitter: 'bg-twitter',
	Reddit: 'bg-reddit',
};
