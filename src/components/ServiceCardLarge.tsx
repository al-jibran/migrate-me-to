import { SVGProps } from 'react';
import { Checkbox } from './svgs';

const leftBox = () => 'w-1/6 p-3 mr-3 border-r-2 border-r-white';

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
			<div className={`flex max-h-24 bg-${name.toLowerCase()}`}>
				{<LogoSvgComponent className={leftBox()} />}
				<h3 className='self-center text-2xl font-bold text-white'>{name}</h3>
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
