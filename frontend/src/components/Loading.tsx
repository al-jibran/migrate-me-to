interface LoadingProps {
	color: string;
}
const Loading: React.FC<LoadingProps> = ({ color }) => {
	color;
	return (
		<div
			aria-label='loading'
			className={`${color} border-l-transparent border-r-transparent animate-spin border-4 rounded-full w-8 h-8`}></div>
	);
};

export default Loading;
