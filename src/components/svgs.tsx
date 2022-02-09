import { SVGProps } from 'react';

export const CloseMenuX = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox='0 0 30 29'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<path d='M15.034 2.104c-6.92 0-12.532 5.606-12.532 12.52s5.611 12.52 12.532 12.52c6.92 0 12.531-5.606 12.531-12.52s-5.61-12.52-12.531-12.52Zm4.626 17.277-1.846-.009-2.78-3.311-2.778 3.308-1.849.009a.223.223 0 0 1-.224-.224c0-.053.02-.103.053-.145l3.64-4.332-3.64-4.329a.224.224 0 0 1 .17-.369l1.85.009 2.778 3.312 2.777-3.31 1.847-.008c.123 0 .223.098.223.224 0 .053-.02.103-.053.145l-3.633 4.33 3.636 4.33a.224.224 0 0 1-.17.369Z' />
	</svg>
);

export const OpenMenuHamburger = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox='0 0 26 26'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<path d='M3.047 4.063h19.906c.112 0 .203.09.203.203V5.89a.204.204 0 0 1-.203.203H3.047a.204.204 0 0 1-.203-.203V4.266c0-.112.091-.204.203-.204Zm0 15.843h19.906c.112 0 .203.092.203.203v1.625a.204.204 0 0 1-.203.203H3.047a.204.204 0 0 1-.203-.203V20.11c0-.111.091-.203.203-.203Zm0-7.922h19.906c.112 0 .203.092.203.204v1.624a.204.204 0 0 1-.203.204H3.047a.204.204 0 0 1-.203-.204v-1.624c0-.112.091-.204.203-.204Z' />
	</svg>
);

export const DarkModeToggle = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox='0 0 31 31'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<rect x='2' y='1.71094' width='27' height='27' rx='13.5' fill='#040404' />
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
);

export const Logo = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox='0 0 212 71'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<g filter='url(#filter0_d_8_222)'>
			<path
				className='fill-black dark:fill-white'
				d='M35.3462 20.316V39H32.8892V25.068L26.6792 39H24.9512L18.7142 25.041V39H16.2572V20.316H18.9032L25.8152 35.76L32.7272 20.316H35.3462ZM40.7821 21.801C40.3141 21.801 39.9181 21.639 39.5941 21.315C39.2701 20.991 39.1081 20.595 39.1081 20.127C39.1081 19.659 39.2701 19.263 39.5941 18.939C39.9181 18.615 40.3141 18.453 40.7821 18.453C41.2321 18.453 41.6101 18.615 41.9161 18.939C42.2401 19.263 42.4021 19.659 42.4021 20.127C42.4021 20.595 42.2401 20.991 41.9161 21.315C41.6101 21.639 41.2321 21.801 40.7821 21.801ZM41.9701 24.204V39H39.5131V24.204H41.9701ZM52.2596 23.961C53.5376 23.961 54.6536 24.24 55.6076 24.798C56.5796 25.356 57.2996 26.058 57.7676 26.904V24.204H60.2516V39.324C60.2516 40.674 59.9636 41.871 59.3876 42.915C58.8116 43.977 57.9836 44.805 56.9036 45.399C55.8416 45.993 54.5996 46.29 53.1776 46.29C51.2336 46.29 49.6136 45.831 48.3176 44.913C47.0216 43.995 46.2566 42.744 46.0226 41.16H48.4526C48.7226 42.06 49.2806 42.78 50.1266 43.32C50.9726 43.878 51.9896 44.157 53.1776 44.157C54.5276 44.157 55.6256 43.734 56.4716 42.888C57.3356 42.042 57.7676 40.854 57.7676 39.324V36.219C57.2816 37.083 56.5616 37.803 55.6076 38.379C54.6536 38.955 53.5376 39.243 52.2596 39.243C50.9456 39.243 49.7486 38.919 48.6686 38.271C47.6066 37.623 46.7696 36.714 46.1576 35.544C45.5456 34.374 45.2396 33.042 45.2396 31.548C45.2396 30.036 45.5456 28.713 46.1576 27.579C46.7696 26.427 47.6066 25.536 48.6686 24.906C49.7486 24.276 50.9456 23.961 52.2596 23.961ZM57.7676 31.575C57.7676 30.459 57.5426 29.487 57.0926 28.659C56.6426 27.831 56.0306 27.201 55.2566 26.769C54.5006 26.319 53.6636 26.094 52.7456 26.094C51.8276 26.094 50.9906 26.31 50.2346 26.742C49.4786 27.174 48.8756 27.804 48.4256 28.632C47.9756 29.46 47.7506 30.432 47.7506 31.548C47.7506 32.682 47.9756 33.672 48.4256 34.518C48.8756 35.346 49.4786 35.985 50.2346 36.435C50.9906 36.867 51.8276 37.083 52.7456 37.083C53.6636 37.083 54.5006 36.867 55.2566 36.435C56.0306 35.985 56.6426 35.346 57.0926 34.518C57.5426 33.672 57.7676 32.691 57.7676 31.575ZM66.8607 26.607C67.2927 25.761 67.9047 25.104 68.6967 24.636C69.5067 24.168 70.4877 23.934 71.6397 23.934V26.472H70.9917C68.2377 26.472 66.8607 27.966 66.8607 30.954V39H64.4037V24.204H66.8607V26.607ZM73.558 31.548C73.558 30.036 73.864 28.713 74.476 27.579C75.088 26.427 75.925 25.536 76.987 24.906C78.067 24.276 79.264 23.961 80.578 23.961C81.874 23.961 82.999 24.24 83.953 24.798C84.907 25.356 85.618 26.058 86.086 26.904V24.204H88.57V39H86.086V36.246C85.6 37.11 84.871 37.83 83.899 38.406C82.945 38.964 81.829 39.243 80.551 39.243C79.237 39.243 78.049 38.919 76.987 38.271C75.925 37.623 75.088 36.714 74.476 35.544C73.864 34.374 73.558 33.042 73.558 31.548ZM86.086 31.575C86.086 30.459 85.861 29.487 85.411 28.659C84.961 27.831 84.349 27.201 83.575 26.769C82.819 26.319 81.982 26.094 81.064 26.094C80.146 26.094 79.309 26.31 78.553 26.742C77.797 27.174 77.194 27.804 76.744 28.632C76.294 29.46 76.069 30.432 76.069 31.548C76.069 32.682 76.294 33.672 76.744 34.518C77.194 35.346 77.797 35.985 78.553 36.435C79.309 36.867 80.146 37.083 81.064 37.083C81.982 37.083 82.819 36.867 83.575 36.435C84.349 35.985 84.961 35.346 85.411 34.518C85.861 33.672 86.086 32.691 86.086 31.575ZM95.7191 26.229V34.95C95.7191 35.67 95.8721 36.183 96.1781 36.489C96.4841 36.777 97.0151 36.921 97.7711 36.921H99.5801V39H97.3661C95.9981 39 94.9721 38.685 94.2881 38.055C93.6041 37.425 93.2621 36.39 93.2621 34.95V26.229H91.3451V24.204H93.2621V20.478H95.7191V24.204H99.5801V26.229H95.7191ZM116.057 31.035C116.057 31.503 116.03 31.998 115.976 32.52H104.15C104.24 33.978 104.735 35.121 105.635 35.949C106.553 36.759 107.66 37.164 108.956 37.164C110.018 37.164 110.9 36.921 111.602 36.435C112.322 35.931 112.826 35.265 113.114 34.437H115.76C115.364 35.859 114.572 37.02 113.384 37.92C112.196 38.802 110.72 39.243 108.956 39.243C107.552 39.243 106.292 38.928 105.176 38.298C104.078 37.668 103.214 36.777 102.584 35.625C101.954 34.455 101.639 33.105 101.639 31.575C101.639 30.045 101.945 28.704 102.557 27.552C103.169 26.4 104.024 25.518 105.122 24.906C106.238 24.276 107.516 23.961 108.956 23.961C110.36 23.961 111.602 24.267 112.682 24.879C113.762 25.491 114.59 26.337 115.166 27.417C115.76 28.479 116.057 29.685 116.057 31.035ZM113.519 30.522C113.519 29.586 113.312 28.785 112.898 28.119C112.484 27.435 111.917 26.922 111.197 26.58C110.495 26.22 109.712 26.04 108.848 26.04C107.606 26.04 106.544 26.436 105.662 27.228C104.798 28.02 104.303 29.118 104.177 30.522H113.519ZM138.389 20.316V39H135.932V25.068L129.722 39H127.994L121.757 25.041V39H119.3V20.316H121.946L128.858 35.76L135.77 20.316H138.389ZM156.056 31.035C156.056 31.503 156.029 31.998 155.975 32.52H144.149C144.239 33.978 144.734 35.121 145.634 35.949C146.552 36.759 147.659 37.164 148.955 37.164C150.017 37.164 150.899 36.921 151.601 36.435C152.321 35.931 152.825 35.265 153.113 34.437H155.759C155.363 35.859 154.571 37.02 153.383 37.92C152.195 38.802 150.719 39.243 148.955 39.243C147.551 39.243 146.291 38.928 145.175 38.298C144.077 37.668 143.213 36.777 142.583 35.625C141.953 34.455 141.638 33.105 141.638 31.575C141.638 30.045 141.944 28.704 142.556 27.552C143.168 26.4 144.023 25.518 145.121 24.906C146.237 24.276 147.515 23.961 148.955 23.961C150.359 23.961 151.601 24.267 152.681 24.879C153.761 25.491 154.589 26.337 155.165 27.417C155.759 28.479 156.056 29.685 156.056 31.035ZM153.518 30.522C153.518 29.586 153.311 28.785 152.897 28.119C152.483 27.435 151.916 26.922 151.196 26.58C150.494 26.22 149.711 26.04 148.847 26.04C147.605 26.04 146.543 26.436 145.661 27.228C144.797 28.02 144.302 29.118 144.176 30.522H153.518ZM170.882 20.181V22.179H165.752V39H163.295V22.179H158.138V20.181H170.882ZM180.36 39.243C178.974 39.243 177.714 38.928 176.58 38.298C175.464 37.668 174.582 36.777 173.934 35.625C173.304 34.455 172.989 33.105 172.989 31.575C172.989 30.063 173.313 28.731 173.961 27.579C174.627 26.409 175.527 25.518 176.661 24.906C177.795 24.276 179.064 23.961 180.468 23.961C181.872 23.961 183.141 24.276 184.275 24.906C185.409 25.518 186.3 26.4 186.948 27.552C187.614 28.704 187.947 30.045 187.947 31.575C187.947 33.105 187.605 34.455 186.921 35.625C186.255 36.777 185.346 37.668 184.194 38.298C183.042 38.928 181.764 39.243 180.36 39.243ZM180.36 37.083C181.242 37.083 182.07 36.876 182.844 36.462C183.618 36.048 184.239 35.427 184.707 34.599C185.193 33.771 185.436 32.763 185.436 31.575C185.436 30.387 185.202 29.379 184.734 28.551C184.266 27.723 183.654 27.111 182.898 26.715C182.142 26.301 181.323 26.094 180.441 26.094C179.541 26.094 178.713 26.301 177.957 26.715C177.219 27.111 176.625 27.723 176.175 28.551C175.725 29.379 175.5 30.387 175.5 31.575C175.5 32.781 175.716 33.798 176.148 34.626C176.598 35.454 177.192 36.075 177.93 36.489C178.668 36.885 179.478 37.083 180.36 37.083Z'
			/>
			<path
				className='fill-black dark:fill-white'
				d='M207.061 52.0607C207.647 51.4749 207.647 50.5251 207.061 49.9394L197.515 40.3934C196.929 39.8076 195.979 39.8076 195.394 40.3934C194.808 40.9792 194.808 41.9289 195.394 42.5147L203.879 51L195.394 59.4853C194.808 60.0711 194.808 61.0208 195.394 61.6066C195.979 62.1924 196.929 62.1924 197.515 61.6066L207.061 52.0607ZM98.937 52.5L206 52.5L206 49.5L98.937 49.5L98.937 52.5Z'
			/>
			<path
				d='M4.93958 10.8359C4.35378 11.4217 4.35377 12.3714 4.93958 12.9572L14.4855 22.5032C15.0713 23.0889 16.021 23.0889 16.6068 22.5032C17.1926 21.9174 17.1926 20.9676 16.6068 20.3818L8.12155 11.8966L16.6068 3.41128C17.1926 2.82549 17.1926 1.87575 16.6068 1.28996C16.021 0.704172 15.0713 0.704172 14.4855 1.28996L4.93958 10.8359ZM147.264 10.3966L6.00023 10.3966L6.00023 13.3966L147.264 13.3966L147.264 10.3966Z'
				className='fill-black dark:fill-white'
			/>
		</g>
		<defs>
			<filter
				id='filter0_d_8_222'
				x='0.5'
				y='0.850616'
				width='211'
				height='69.1953'
				filterUnits='userSpaceOnUse'
				colorInterpolationFilters='sRGB'>
				<feFlood floodOpacity='0' result='BackgroundImageFix' />
				<feColorMatrix
					in='SourceAlpha'
					type='matrix'
					values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
					result='hardAlpha'
				/>
				<feOffset dy='4' />
				<feGaussianBlur stdDeviation='2' />
				<feComposite in2='hardAlpha' operator='out' />
				<feColorMatrix
					type='matrix'
					values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
				/>
				<feBlend
					mode='normal'
					in2='BackgroundImageFix'
					result='effect1_dropShadow_8_222'
				/>
				<feBlend
					mode='normal'
					in='SourceGraphic'
					in2='effect1_dropShadow_8_222'
					result='shape'
				/>
			</filter>
		</defs>
	</svg>
);

export const DownArrow = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			viewBox='0 0 24 451'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			{...props}>
			<path
				d='M10.9393 450.061C11.5251 450.646 12.4749 450.646 13.0606 450.061L22.6066 440.515C23.1924 439.929 23.1924 438.979 22.6066 438.393C22.0208 437.808 21.071 437.808 20.4853 438.393L12 446.879L3.5147 438.393C2.92891 437.808 1.97917 437.808 1.39338 438.393C0.807593 438.979 0.807593 439.929 1.39338 440.515L10.9393 450.061ZM10.5 -6.55671e-08L10.5 449L13.5 449L13.5 6.55671e-08L10.5 -6.55671e-08Z'
				fill='black'
			/>
		</svg>
	);
};

export const TwitterLogo = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox='0 0 34 32'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<path
			d='M10.5297 32C23.1795 32 30.0994 19.6856 30.0994 9.02522C30.0994 8.68063 30.0994 8.33111 30.0868 7.98651C31.4341 6.84069 32.5968 5.4221 33.5206 3.7972C32.2621 4.4491 30.9285 4.87875 29.5631 5.0722C31.0014 4.06214 32.0786 2.47288 32.5946 0.599828C31.2433 1.54039 29.7642 2.20066 28.2222 2.55172C27.1856 1.25462 25.8138 0.395329 24.3194 0.10695C22.8249 -0.181429 21.2913 0.117199 19.9559 0.956578C18.6206 1.79596 17.5581 3.12924 16.933 4.74991C16.308 6.37058 16.1552 8.18818 16.4984 9.92118C13.7639 9.76008 11.0886 8.92546 8.64631 7.47144C6.20397 6.01743 4.04905 3.97649 2.3213 1.48101C1.44419 3.26081 1.17652 5.3661 1.57263 7.36935C1.96875 9.37261 2.99895 11.1236 4.45405 12.2669C3.36367 12.2234 2.29725 11.8794 1.34082 11.2626V11.3734C1.3427 13.2379 1.89246 15.0444 2.89717 16.4876C3.90188 17.9308 5.29992 18.9222 6.85496 19.2942C6.26471 19.4853 5.65499 19.5805 5.04275 19.5773C4.61114 19.5788 4.1804 19.5318 3.7564 19.437C4.19591 21.042 5.05171 22.4452 6.20392 23.4502C7.35614 24.4553 8.74706 25.0117 10.1819 25.0416C7.74442 27.2908 4.73353 28.5107 1.63413 28.5048C1.088 28.5075 0.542244 28.4705 0 28.394C3.14573 30.7503 6.79902 32.0014 10.5297 32Z'
			fill='white'
		/>
	</svg>
);

export const Checkbox = (props: SVGProps<SVGSVGElement>) => (
	<svg
		viewBox='0 0 68 68'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		{...props}>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M17.3332 0.666687C12.9129 0.666687 8.67367 2.42263 5.54806 5.54824C2.42245 8.67385 0.666504 12.9131 0.666504 17.3333V50.6667C0.666504 55.0869 2.42245 59.3262 5.54806 62.4518C8.67367 65.5774 12.9129 67.3333 17.3332 67.3333H50.6665C55.0868 67.3333 59.326 65.5774 62.4516 62.4518C65.5772 59.3262 67.3332 55.0869 67.3332 50.6667V17.3333C67.3332 12.9131 65.5772 8.67385 62.4516 5.54824C59.326 2.42263 55.0868 0.666687 50.6665 0.666687H17.3332ZM46.4332 29.6133C46.7326 29.2938 46.9661 28.9184 47.1205 28.5086C47.2748 28.0988 47.3469 27.6626 47.3327 27.2249C47.3184 26.7873 47.2181 26.3567 47.0375 25.9578C46.8568 25.5588 46.5994 25.1994 46.2799 24.9C45.9603 24.6006 45.5849 24.3671 45.1751 24.2127C44.7653 24.0584 44.3291 23.9863 43.8914 24.0005C43.4538 24.0148 43.0232 24.1151 42.6243 24.2957C42.2254 24.4764 41.8659 24.7338 41.5665 25.0533L31.2899 36.02L26.2132 31.51C25.548 30.9571 24.694 30.6843 23.8315 30.7494C22.969 30.8145 22.1656 31.2123 21.5909 31.8587C21.0163 32.5052 20.7154 33.3498 20.7519 34.2139C20.7884 35.0781 21.1594 35.8943 21.7865 36.49L29.2865 43.1567C29.9355 43.7331 30.7837 44.0337 31.6508 43.9945C32.518 43.9553 33.3356 43.5794 33.9299 42.9467L46.4299 29.6133H46.4332Z'
			fill='#4ECB71'
		/>
	</svg>
);
