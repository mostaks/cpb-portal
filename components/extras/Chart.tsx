import React, { FC, HTMLAttributes, memo } from 'react';
import classNames from 'classnames';
import { ApexOptions } from 'apexcharts';

import dynamic from 'next/dynamic';
import Mounted from '../Mounted';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

interface IChartProps extends HTMLAttributes<HTMLDivElement> {
	series: ApexOptions['series'];
	options: ApexOptions;
	type?: ApexChart['type'];
	width?: string | number;
	height?: string | number;
	className?: string;
}
const Chart: FC<IChartProps> = ({
	series,
	options,
	type = 'line',
	width = '100%',
	height = 'auto',
	className,
	...props
}) => {
	return (
		<div className={classNames('apex-chart', className)} {...props}>
			<Mounted>
				<ReactApexChart
					options={{
						colors: [
							String(process.env.NEXT_PUBLIC_PRIMARY_COLOR),
							String(process.env.NEXT_PUBLIC_SECONDARY_COLOR),
							String(process.env.NEXT_PUBLIC_SUCCESS_COLOR),
							String(process.env.NEXT_PUBLIC_INFO_COLOR),
							String(process.env.NEXT_PUBLIC_WARNING_COLOR),
							String(process.env.NEXT_PUBLIC_DANGER_COLOR),
						],
						plotOptions: {
							candlestick: {
								colors: {
									upward: String(process.env.NEXT_PUBLIC_SUCCESS_COLOR),
									downward: String(process.env.NEXT_PUBLIC_DANGER_COLOR),
								},
							},
							boxPlot: {
								colors: {
									upper: String(process.env.NEXT_PUBLIC_SUCCESS_COLOR),
									lower: String(process.env.NEXT_PUBLIC_DANGER_COLOR),
								},
							},
						},
						...options,
					}}
					series={series}
					// @ts-ignore
					type={type}
					width={width}
					height={height}
				/>
			</Mounted>
		</div>
	);
};

/**
 * For use useState
 */
export interface IChartOptions extends Record<string, any> {
	series: ApexOptions['series'];
	options: ApexOptions;
}

export default memo(Chart);
