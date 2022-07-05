import React, { useEffect, useState } from 'react';
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
			<ProjectDisplay />
		</div>
	);
}

function ProjectDisplay() {
	const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
	const projectData = [
		{
			title: 'Singularity',
			description: 'Singularity is a Next app and is a home for my unofficial company called Singularity',
			thumbnail: 'thumbnails/singularity.png',
		},
		{
			title: 'The BRUG Method',
			description: '   I built this site from top to bottom using React, Express, and Pay Pal.',
			thumbnail: 'thumbnails/brug.png',
		},
		{
			title: '24/7 Sales',
			description: 'Browse hundreds of games with huge sales.',
			thumbnail: 'thumbnails/247.png',
		},
	];

	return (
		<div className='project-display-container w-full portfolio-container flex-col'>
			<h1 className='mt-40 mb-32'>Portfolio</h1>
			{projectData.map((project: any, i: number) => {
				return <Project {...project} key={i} />;
			})}
		</div>
	);
}

function Project(project: any) {
	const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
	return (
		<div className='project-container flex mt-8 h-screen'>
			<section className='flex flex-col w-1/2'>
				<div className='m-auto p-4 w-full'>
					<Title />
					<div
						className='project-thumbnail-container mt-4'
						style={{
							backgroundImage: `url(${project.thumbnail})`,
						}}
					>
						<img src={project.thumbnail} />
					</div>
					<button className='mt-4'>Visit</button>
				</div>
			</section>
			<section className='flex flex-col w-1/2'>
				<div className='m-auto p-4 w-full'>
					<h1>Description</h1>
					<p>{project.description}</p>
					<h1>Key Skills</h1>
					<span></span>
				</div>
			</section>
		</div>
	);

	function Title({ className, ...rest }: any) {
		const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
		return (
			<h1 className={`${className}`} {...rest}>
				{project.title}
			</h1>
		);
	}
}

function LandingScreen() {
	const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
	const [normalImageLoaded, setNormalImageLoaded] = useState(false);
	const [dabImageLoaded, setDabImageLoaded] = useState(false);
	const [catchImageLoaded, setCatchImageLoaded] = useState(false);
	const [allImagesLoaded, setAllImagesLoaded] = useState(false);

	useEffect(() => {
		console.log(
			'normalImageLoaded, dabImageLoaded, catchImageLoaded',
			normalImageLoaded,
			dabImageLoaded,
			catchImageLoaded
		);
		if (normalImageLoaded && dabImageLoaded && catchImageLoaded) {
			setAllImagesLoaded(true);
		}
	}, [normalImageLoaded, dabImageLoaded, catchImageLoaded]);

	useEffect(() => {
		if (!allImagesLoaded) return;
		const normalImgEle = document.querySelector('.hero-image');
		const debImgEle = document.querySelector('.dab-stage');
		const catchImgEle = document.querySelector('.catch-stage');
		if (!normalImgEle || !debImgEle || !catchImgEle) {
			console.error('failed to find all images');
			return;
		}
		setTimeout(() => {
			normalImgEle.classList.add('hidden');
			debImgEle.classList.remove('hidden');
		}, 2000);
		setTimeout(() => {
			normalImgEle.classList.remove('hidden');
			debImgEle.classList.add('hidden');
		}, 2250);
		setTimeout(() => {
			normalImgEle.classList.add('hidden');
			catchImgEle.classList.remove('hidden');
		}, 4000);
	}, [allImagesLoaded]);

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
					className={`mt-auto mb-auto relative mx-auto flex ${allImagesLoaded ? '' : 'hidden'}`}
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
					<img
						src='/spongeman/normal.webp'
						onLoad={() => {
							setNormalImageLoaded(true);
						}}
						className='hero-image h-auto mr-auto ml-auto'
						alt='hero'
					/>
					<img
						src='/spongeman/dab.webp'
						onLoad={() => {
							setDabImageLoaded(true);
						}}
						className={`hero-image h-auto mr-auto ml-auto dab-stage hidden`}
						alt='hero'
					/>
					<img
						src='/spongeman/catch.webp'
						onLoad={() => {
							setCatchImageLoaded(true);
						}}
						className='hero-image h-auto mr-auto ml-auto catch-stage hidden'
						alt='hero'
					/>
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
				<button className={`${isMobile ? 'mt-4' : 'mt-2'} mb-auto ml-auto mr-auto`}>Get in Touch</button>
			</section>
		);
	}
}

function Header() {
	return (
		<header className='flex flex-row w-screen max-w-full'>
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
