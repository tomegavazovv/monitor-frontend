import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../provider/authProvider'
import { ProtectedRoute } from './ProtectedRoute'
import Login from '../pages/Login/Login'
import Home from '../pages/Home/Home'
import MonitoredList from '../pages/Lists/MonitoredList/MonitoredList'
import Lists from '../pages/Lists/Lists'
import Billing from '../pages/Billing/Billing'
import Profile from '../pages/Profile/Profile'
import Settings from '../pages/Settings/Settings'
import EngagementList from '../pages/EngagementList/EngagementList'
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy'
import Landing from '../pages/Landing/Landing'

const routesForPublic = [
	{
		path: '/about',
		element: <div>about</div>,
	},
	{
		path: 'privacy-policy',
		element: <PrivacyPolicy />,
	},
	{
		path: '',
		element: <Landing />,
	},
]

const routesForAuthenticatedOnly = [
	{
		path: '/',
		element: <ProtectedRoute />,
		children: [
			{
				path: '/home',
				element: <Home />,
				children: [
					
					{
						path: 'lists/:listId',
						element: <MonitoredList />,
					},
					{
						path: 'lists',
						element: <Lists />,
					},
					{
						path: 'lists/:listId/engagementReport',
						element: <EngagementList />,
					},
					{
						path: 'billing',
						element: <Billing />,
					},
					{
						path: 'profile',
						element: <Profile />,
					},
					{
						path: 'settings',
						element: <Settings />,
					},
					{
						path: '*',
						element: <Navigate to={'/home/lists'} />,
					},
				],
			},
			{
				path: '*',
				element: <Navigate to={'/home/lists'} />,
			},
		],
	},
]

const routesForNotAuthenticatedOnly = [
	{
		path: '/login',
		element: <Login />,
	},
]

const Routes = () => {
	const { token } = useAuth()
	const router = createBrowserRouter([
		...routesForPublic,
		...(!token ? routesForNotAuthenticatedOnly : []),
		...routesForAuthenticatedOnly,
	])
	return <RouterProvider router={router} />
}

export default Routes
