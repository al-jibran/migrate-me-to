import serviceImage from 'images/sign-in-with-twitter.png';

type StylesProps = {
	borderBottom: Record<string, string>;
	border: Record<string, string>;
};

const styles: StylesProps = {
	borderBottom: {
		Twitter: 'border-b-twitter',
		Reddit: 'border-b-reddit',
	},

	border: {
		Twitter: 'border-twitter',
		Reddit: 'border-reddit',
	},
};

interface ProcessProps {
	name: string;
	handleLogin: () => void;
	loading: boolean;
}

export const Process: React.FC<ProcessProps> = ({
	name,
	handleLogin,
	loading,
}) => {
	const headingBorderColor = styles.borderBottom[name];

	return (
		<div>
			<h3
				className={`uppercase border-b-4 ${headingBorderColor} w-fit mx-auto mt-14`}>
				1<sup className='lowercase'>st</sup> Account
			</h3>
			<div className='flex justify-center mt-14'>
				{loading ? (
					<span aria-label='loading'>Loading...</span>
				) : (
					<img
						id='login'
						className='cursor-pointer'
						src={serviceImage}
						role='link'
						alt={`Log in with ${name}`}
						onClick={handleLogin}
					/>
				)}
			</div>
		</div>
	);
};

export default Process;
