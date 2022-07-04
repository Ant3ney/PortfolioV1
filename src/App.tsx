import React, { useEffect } from 'react';
import logo from './logo.svg';
import { motion } from 'framer-motion';
import './App.css';
import './App.scss';
import { useMediaQuery } from 'react-responsive';

function App() {
	return (
		<div className='App'>
			<Header />
			<LandingScreen />
		</div>
	);
}

function LandingScreen() {
	const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
	useEffect(() => {
		const heroImgEle = document.querySelector('.hero-image');
		if (!heroImgEle) {
			console.error('failed to find hero img');
			return;
		}
		setTimeout(() => {
			heroImgEle.classList.add('dab-stage');
			heroImgEle.setAttribute('src', '/spongeman/dab.png');
		}, 2000);
		setTimeout(() => {
			heroImgEle.setAttribute('src', '/spongeman/normal.png');
			heroImgEle.classList.remove('dab-stage');
		}, 2250);
		setTimeout(() => {
			heroImgEle.setAttribute('src', '/spongeman/catch.png');
			heroImgEle.classList.add('catch-stage');
			heroImgEle.classList.remove('dab-stage');
		}, 4000);
	}, []);

	return (
		<div
			className={`${
				isMobile ? '' : 'h-screen'
			} landing-screen-container w-full flex portfolio-container overflow-hidden flex-wrap`}
		>
			{isMobile ? <HeroSection /> : <InfoSection />}
			{isMobile ? <InfoSection /> : <HeroSection />}
		</div>
	);

	function HeroSection() {
		const animateObjLaptop = isMobile ? { x: [-3000, -3000, -3000, 0] } : { y: [-3000, -3000, -3000, 0] };
		const animateObjSponge = isMobile ? { x: [300, 0] } : { y: [300, 0] };
		return (
			<section className={`${isMobile ? 'w-full h-1/2 flex' : 'w-1/2 h-full flex flex-col p-2'}`}>
				<motion.div
					className='mt-auto mb-auto relative mx-auto flex'
					animate={animateObjSponge}
					transition={{ duration: 2, times: [0, 1] }}
				>
					<div className='laptop-guide-rail-holder'>
						<div className='laptop-guide-rail'>
							<motion.div
								className='mt-auto mb-auto relative'
								animate={animateObjLaptop}
								transition={{ duration: 4, times: [0, 0, 0, 1] }}
							>
								<img src='/laptop.png' className='w-full h-auto laptop-img' />
							</motion.div>
						</div>
					</div>
					<img src='/spongeman/normal.png' className='hero-image h-auto mr-auto ml-auto' alt='hero' />
				</motion.div>
			</section>
		);
	}

	function InfoSection() {
		return (
			<section
				className={`${isMobile ? 'w-full h-1/2 flex flex-col' : 'w-1/2 h-full flex flex-col'} info-contaienr`}
			>
				<h1 className={`${isMobile ? 'mt-auto' : 'mt-auto'} ml-auto mr-auto mb-0`}>
					Hello, I’m an Expert Jr. React JS Developer
				</h1>
				<button className={`${isMobile ? 'mt-4' : 'mt-2'} mb-auto ml-auto mr-auto mb-0`}>Get in Touch</button>
			</section>
		);
	}
}

function Header() {
	return (
		<header className='flex flex-row w-screen fixed'>
			<nav className='flex w-full portfolio-container'>
				<ul className='mr-auto flex'>
					<li className='h-full w-auto p-6 pl-0'>
						<a className='util-text' href='#'>
							Home
						</a>
					</li>
					<li className='h-full w-auto p-6'>
						<a className='util-text' href='#'>
							Resume
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default App;
