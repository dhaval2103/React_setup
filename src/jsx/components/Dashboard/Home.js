import React, { useContext, useEffect, useState } from 'react';
import PageLoader from '../../pages/Common/PageLoader';
import { ThemeContext } from "../../../context/ThemeContext";
import { useDispatch } from 'react-redux';

const Home = () => {
	const dispatch = useDispatch();
	const [countData, setCountData] = useState();
	const [loading, setLoading] = useState(true);
	const { changeBackground } = useContext(ThemeContext);
	const [key, setKey] = useState('home');

	const items = [
		{
			key: '1D',
			label: `1D`,
			//   children: `Content of Tab Pane 1`,
		},
		{
			key: '7D',
			label: `7D`,
			//   children: `Content of Tab Pane 2`,
		},
		{
			key: '15D',
			label: `15D`,
			//   children: `Content of Tab Pane 3`,
		},
		{
			key: '30D',
			label: `30D`,
			//   children: `Content of Tab Pane 3`,
		},
		{
			key: '45D',
			label: `45D`,
			//   children: `Content of Tab Pane 3`,
		},
		{
			key: '60D',
			label: `60D`,
			//   children: `Content of Tab Pane 3`,
		},
		{
			key: '90D',
			label: `90D`,
			//   children: `Content of Tab Pane 3`,
		},
		{
			key: 'All',
			label: `All`,
			//   children: `Content of Tab Pane 3`,
		},
	];
	useEffect(() => {
		changeBackground({ value: "light", label: "Light" });
	}, []);

	return (
		<>
			{/* <PageLoader loading={loading} /> */}
				<h4><b>Users</b></h4>
		</>
	)
}
export default Home;