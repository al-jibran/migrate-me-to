import { ServiceType } from '../data/services';
import { normalizeClass } from '../utility/normalizeClass';

interface DividerProps {
	service: ServiceType;
}

interface DividerStylesProps {
	borderColor: Record<string, string>;
	fillColor: Record<string, string>;
	beforeDivider: Record<string, string>;
	afterDivider: Record<string, string>;
}

const styles = {
	divider: {
		mobile:
			'flex justify-center items-center w-16 h-16 border-4 mx-auto rounded-full relative top-10 animate-pulse',
		after:
			'after:absolute after:w-screen after:border after:border-t-4 after:top-6 after:left-14',
		before:
			'before:absolute before:w-screen before:border before:border-t-4 before:top-6 before:right-14',
	},
};

const DividerStyles: DividerStylesProps = {
	borderColor: {
		Twitter: 'border-twitter',
		Reddit: 'border-reddit',
	},

	fillColor: {
		Twitter: 'fill-twitter',
		Reddit: 'fill-reddit',
	},

	beforeDivider: {
		Twitter: 'before:border-twitter',
		Reddit: 'before:border-reddit',
	},

	afterDivider: {
		Twitter: 'after:border-twitter',
		Reddit: 'after:border-reddit',
	},
};
const Divider: React.FC<DividerProps> = ({ service }) => {
	const dividerStyle = normalizeClass(styles.divider);
	const name = service.name;
	return (
		<div
			className={` ${dividerStyle} ${DividerStyles.borderColor[name]} ${DividerStyles.beforeDivider[name]} ${DividerStyles.afterDivider[name]}`}>
			<service.LogoSvgComponent
				className={`w-8 h-8 ${DividerStyles.fillColor[name]}`}
			/>
		</div>
	);
};

export default Divider;
