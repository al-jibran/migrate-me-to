import { TwitterLogo, RedditLogo } from '../components/svgs';
import { SVGProps } from 'react';

export type Service = {
	name: string;
	LogoSvgComponent: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	transferrableList: string[];
};

export const services: Service[] = [
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
