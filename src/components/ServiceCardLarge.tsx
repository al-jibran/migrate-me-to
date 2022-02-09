import { SVGProps } from 'react';
import { Checkbox } from './svgs';
import { serviceColors } from '../data/services';

const leftBox = () => 'w-1/12 px-2 py-4 mr-3 border-r-2 border-r-white';

interface LargeCard {
	name: string;
	LogoSvgComponent: (props: SVGProps<SVGSVGElement>) => JSX.Element;
	transferrableList: string[];
}

export const ServiceCardLarge: React.FC<LargeCard> = ({
	name,
	LogoSvgComponent,
	transferrableList,
}) => {
	return (
		<div className='my-6 shadow-sm' data-testid='service'>
			<div className={`flex max-h-24 ${serviceColors[name]}`}>
				{<LogoSvgComponent className={leftBox()} />}
				<h3 className='self-center text-white'>{name}</h3>
			</div>
			<ul>
				{transferrableList.map((item, index) => (
					<li className='flex py-2 shadow-sm' key={index}>
						<Checkbox className={leftBox()} />
						<div className='self-center text-xl'>{item}</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ServiceCardLarge;
