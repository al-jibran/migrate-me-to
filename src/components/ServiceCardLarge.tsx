import { SVGProps } from 'react';
import { Checkbox } from './svgs';
import { serviceColors } from '../data/services';

const box = {
	left: 'w-16 p-3 mr-4',
};

interface LargeCard {
	name: string;
	LogoSvgComponent: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	transferrableList: string[];
	handleOnClick: () => void;
}

export const ServiceCardLarge: React.FC<LargeCard> = ({
	name,
	LogoSvgComponent,
	transferrableList,
	handleOnClick,
}) => {
	return (
		<div
			className='my-6 shadow-sm shadow-gradientLightStart'
			data-testid='service'
			onClick={handleOnClick}>
			<div className={`flex max-h-24 ${serviceColors[name]}`}>
				{<LogoSvgComponent className={box.left} />}
				<h3 className='self-center text-white w-full'>{name}</h3>
			</div>
			<ul>
				{transferrableList.map((item, index) => (
					<li
						className='flex items-center py-2 shadow-sm dark:border-green-400'
						key={index}>
						<Checkbox className={box.left} />
						<div className='text-xl w-full align-middle'>{item}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ServiceCardLarge;
