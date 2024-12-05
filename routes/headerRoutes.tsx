import React from 'react';
import {
	dashboardPagesMenu,
} from '../menu';
import DashboardHeader from '../pages/_layout/_headers/DashboardHeader';
import DashboardBookingHeader from '../pages/_layout/_headers/DashboardBookingHeader';
import DefaultHeader from '../pages/_layout/_headers/DefaultHeader';

const headers = [
	{ path: dashboardPagesMenu.dashboard.path, element: <DashboardHeader /> },
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <DashboardBookingHeader />,
	},
	{
		path: `/*`,
		element: <DefaultHeader />,
	},
];

export default headers;
