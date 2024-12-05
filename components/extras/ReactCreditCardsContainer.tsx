import React, { FC, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import { createUseStyles } from 'react-jss';
import useMounted from '../../hooks/useMounted';

const useStyles = createUseStyles(
	{
		// stylelint-disable-next-line selector-type-no-unknown
		scale: {
			// stylelint-disable-next-line scss/selector-no-redundant-nesting-selector
			'& .rccs': {
				// @ts-ignore
				zoom: (data) => (data.width / 290) * data.scale,
			},
		},
		// stylelint-disable-next-line selector-type-no-unknown
		fluid: {
			// stylelint-disable-next-line scss/selector-no-redundant-nesting-selector
			'& .rccs': {
				// @ts-ignore
				zoom: (data) => data.width / 290,
			},
		},
	},
	{ link: true },
);

interface IReactCreditCardsContainerProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children: ReactNode;
	is3dShadow?: boolean;
	issuer?: string;
	scale?: number;
}
const ReactCreditCardsContainer: FC<IReactCreditCardsContainerProps> = ({
	className,
	is3dShadow = true,
	issuer,
	scale = 0,
	children,
	...props
}) => {
	const { mounted } = useMounted();

	const [ref, { width }] = useMeasure<HTMLDivElement>();
	// @ts-ignore
	const classes = useStyles({ width, scale });
	return (
		<div
			ref={ref}
			className={classNames(
				{
					[`rccs-shadow-3d-${
						(issuer === 'visa' && 'info') ||
						(issuer === 'mastercard' && 'warning') ||
						(issuer === 'amex' && 'success') ||
						(issuer === 'hipercard' && 'danger') ||
						'dark'
					}`]: is3dShadow,
				},
				{ [classes.scale]: mounted && !!scale, [classes.fluid]: mounted && width < 290 },
				className,
			)}
			{...props}>
			{children}
		</div>
	);
};

export default ReactCreditCardsContainer;
