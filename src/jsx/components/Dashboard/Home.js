import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
// import { Tabs } from 'antd';
import CommonService from '../../../services/common';
import { Card, Dropdown, Nav, Tab, Tabs } from 'react-bootstrap';
import PageLoader from '../../pages/Common/PageLoader';

///Images
import small from "./../../../images/profile/small/pic1.jpg";
import avt1 from "./../../../images/avatar/1.jpg";
import avt2 from "./../../../images/avatar/2.jpg";
import avt3 from "./../../../images/avatar/3.jpg";
import avt4 from "./../../../images/avatar/4.jpg";
import avt5 from "./../../../images/avatar/5.jpg";
import avt6 from "./../../../images/avatar/6.jpg";


//Import Components
import { ThemeContext } from "../../../context/ThemeContext";

import DonutChart from './Dashboard/DonutChart';
import WidgetChart3 from './Dashboard/WidgetChart3';
import PreviousTransactions from './Dashboard/PreviousTransactions';
import NouiRangeSlider from './Dashboard/NouiRangeSlider';
import { useDispatch } from 'react-redux';

const TotalInvoices = loadable(() =>
	pMinDelay(import("./Dashboard/TotalInvoices"), 1000)
);
const Paidinvoices = loadable(() =>
	pMinDelay(import("./Dashboard/Paidinvoices"), 1000)
);
const Unpaidinvoices = loadable(() =>
	pMinDelay(import("./Dashboard/Unpaidinvoices"), 1000)
);
const Totalinvoicessent = loadable(() =>
	pMinDelay(import("./Dashboard/Totalinvoicessent"), 1000)
);
const ChartBarApex = loadable(() =>
	pMinDelay(import("./Dashboard/ChartBarApex"), 1000)
);


const Home = () => {
	const dispatch = useDispatch();
	const [countData, setCountData] = useState();
	const [loading, setLoading] = useState(true);
	const { changeBackground } = useContext(ThemeContext);
	const [key, setKey] = useState('home');

	const dashboardCountData = (key) => {
		key = "All"
		dispatch(CommonService.dashboard(key))
			.then((res) => {
				setCountData(res.data)
				setLoading(false)
			})
			.catch((errors) => {
				console.log({ errors })
			})
	}
	const onChange = (key) => {
		dispatch(CommonService.dashboard(key))
			.then((res) => {
				setCountData(res.data)
			})
			.catch((errors) => {
				console.log({ errors })
			})
	};
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
		dashboardCountData();
	}, []);

	return (
		<>
			<PageLoader loading={loading} />
			<div className="row">
				<h4><b>Users</b></h4>
				<div className="col-xl-12">
					<div className="row">
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-2">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#717579" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#717579" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.user?.PendingBrokers ?? 0}</h4>
											<span>Pending Brokers</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalInvoices">
										<TotalInvoices />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#09BD3C" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.user?.ApprovedBrokers ?? 0}</h4>
											<span>Approved Brokers</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="paidinvoices">
										<Paidinvoices />
									</div>
								</div>

							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#FD5353" stroke="white" strokeWidth="4" />
											</svg>

										</span>
										<div className="invoices">
											<h4>{countData?.user?.Broker ?? 0}</h4>
											<span>Total Brokers</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="unpaidinvoices">
										<Unpaidinvoices />
									</div>
								</div>

							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.784 54.128 9.106 53.788C8.428 53.45 8 52.758 8 52V16C8 14.896 8.896 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#FFAA2B" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.user?.Carrier ?? 0}</h4>
											<span>carrier</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalinvoicessent">
										<Totalinvoicessent />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-2">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#717579" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#717579" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.user?.TotalUser ?? 0}</h4>
											<span>Total User</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalInvoices">
										<TotalInvoices />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<h4><b>carrier Request</b></h4>
				
				<Card style={{ backgroundColor: 'transparent', boxShadow: 'none' }} className='mt-1'>

					<Tab.Container onSelect={onChange} defaultActiveKey={'All'}>
						<Nav as="ul" className="nav-pills mb-4">
							{items.map(
								(data, i) =>
									
										<Nav.Item as="li" key={i}>
											<Nav.Link eventKey={data.key}>
												{data.label}
											</Nav.Link>
										</Nav.Item>
							)}
						</Nav>

					</Tab.Container>
				</Card>
				<div className="col-xl-12">
					<div className="row">
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-2">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#717579" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#717579" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.todayCarrier ?? 0}</h4>
											<span>Today Requests</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalInvoices">
										<TotalInvoices />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#09BD3C" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.carrier.pending ?? 0}</h4>
											<span>Pending Requests</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="paidinvoices">
										<Paidinvoices />
									</div>
								</div>

							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#FD5353" stroke="white" strokeWidth="4" />
											</svg>

										</span>
										<div className="invoices">
											<h4>{countData?.carrier.rejected ?? 0}</h4>
											<span>Rejected Requests</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="unpaidinvoices">
										<Unpaidinvoices />
									</div>
								</div>

							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.784 54.128 9.106 53.788C8.428 53.45 8 52.758 8 52V16C8 14.896 8.896 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#FFAA2B" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.carrier.incomplete ?? 0}</h4>
											<span>Incomplete Requests</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalinvoicessent">
										<Totalinvoicessent />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-2">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#717579" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#717579" stroke="white" strokeWidth="4" />
											</svg>
										</span>
										<div className="invoices">
											<h4>{countData?.carrier.completed ?? 0}</h4>
											<span>Completed Requests</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="totalInvoices">
										<TotalInvoices />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-sm-6">
							<div className="card overflow-hidden">
								<div className="card-header border-0">
									<div className="d-flex">
										<span className="mt-1">
											<svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M17.812 48.64L11.2 53.6C10.594 54.054 9.78401 54.128 9.10602 53.788C8.42802 53.45 8.00002 52.758 8.00002 52V16C8.00002 14.896 8.89602 14 10 14H38C39.104 14 40 14.896 40 16V52C40 52.758 39.572 53.45 38.894 53.788C38.216 54.128 37.406 54.054 36.8 53.6L30.188 48.64L25.414 53.414C24.634 54.196 23.366 54.196 22.586 53.414L17.812 48.64ZM36 48V18H12V48L16.8 44.4C17.596 43.802 18.71 43.882 19.414 44.586L24 49.172L28.586 44.586C29.29 43.882 30.404 43.802 31.2 44.4L36 48ZM22 34H26C27.104 34 28 33.104 28 32C28 30.896 27.104 30 26 30H22C20.896 30 20 30.896 20 32C20 33.104 20.896 34 22 34ZM18 26H30C31.104 26 32 25.104 32 24C32 22.896 31.104 22 30 22H18C16.896 22 16 22.896 16 24C16 25.104 16.896 26 18 26Z" fill="#44814E" />
												<circle cx="43.5" cy="14.5" r="12.5" fill="#FD5353" stroke="white" strokeWidth="4" />
											</svg>

										</span>
										<div className="invoices">
											<h4>{countData?.carrier.expired ?? 0}</h4>
											<span>Expired Requests</span>
										</div>
									</div>
								</div>
								<div className="card-body p-0">
									<div id="unpaidinvoices">
										<Unpaidinvoices />
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default Home;