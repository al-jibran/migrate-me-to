import { TwitterLogo, RedditLogo } from '../components/svgs';

export default [
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
