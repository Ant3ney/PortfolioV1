import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { motion } from 'framer-motion';
import './App.css';
import './App.scss';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Contact.scss';

function App() {
	return (
		<div className='App'>
			<Header />
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/contactme' element={<ContactContainer />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

function HomePage() {
	return (
		<>
			<LandingScreen />
			<ProjectDisplay />
			<ContactContainer />
		</>
	);
}

function ContactContainer() {
	const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
	const fetchJsFromCDN = (src: string, externals = []) => {
		new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.setAttribute('src', src);
			//@ts-ignore
			script.setAttribute('asyc', true);
			script.addEventListener('load', () => {
				resolve(
					externals.map(key => {
						const ext = window[key];
						typeof ext === 'undefined' && console.warn(`No external named '${key}' in window`);
						return ext;
					})
				);
			});
			script.addEventListener('error', reject);
			document.body.appendChild(script);
		});
	};
	useEffect(() => {
		(async () => {
			await fetchJsFromCDN('https://assets.calendly.com/assets/external/widget.js');
		})();
	}, [isMobile]);
	return (
		<div className='contact-container flex flex-col mt-16 mb-16'>
			<h1 className={`portfolio-container center ${isMobile ? 'w-full text-center' : ''}`}>Get In Touch</h1>
			<section className='info-container flex flex-wrap portfolio-container'>
				<div className={`info-kv-container flex mt-4 ${isMobile ? 'w-full' : 'mr-4'}`}>
					<label className={`${isMobile ? 'ml-auto' : ''} mr-2`}>Email:</label>
					<p className={`${isMobile ? 'mr-auto' : ''}`}>
						anthonycavuoti<span className='less'>@</span>gmail.com
					</p>
				</div>
				<div className={`info-kv-container flex mt-4 ${isMobile ? 'w-full' : 'mr-4'}`}>
					<label className={`${isMobile ? 'ml-auto' : ''} mr-2`}>Number:</label>
					<p className={`${isMobile ? 'mr-auto' : ''}`}>(424) 201-9017</p>
				</div>
				<div className={`info-kv-container flex mt-4 ${isMobile ? 'w-full' : 'mr-4'}`}>
					<label className={`${isMobile ? 'ml-auto' : ''} mr-2`}>Github:</label>
					<p className={`${isMobile ? 'mr-auto' : ''}`}>github.com/Ant3ney</p>
				</div>
				<div className={`info-kv-container flex mt-4 ${isMobile ? 'w-full flex-wrap' : 'mr-4'}`}>
					<label className={`${isMobile ? 'w-full' : ''} mr-2`}>Linkedin:</label>
					<p className={`${isMobile ? 'w-full mt-1' : ''}`}>linkedin.com/in/anthony-cavuoti-developer</p>
				</div>
			</section>
			<div
				className='calendy-container calendly-inline-widget mt-8'
				data-url={`https://calendly.com/anthonycavuoti/scheduleinterview`}
				style={{
					width: '100%',
					height: isMobile ? `920px` : `966px`,
				}}
			></div>
		</div>
	);
}

function ProjectDisplay() {
	const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
	const [extendProjects, setExtendProjects] = useState(false);
	const projectData = [
		{
			title: 'Singularity',
			description: 'Singularity is a Next app and is a digital home for my company called Singularity',
			thumbnail: 'thumbnails/singularity.png',
			skills: ['react', 'next', 'scss', 'sanity.io'],
			className: 'blue-styled-bg',
			link: 'https://www.singularityplanet.com',
		},
		{
			title: 'The BRUG Method',
			description: '   I built this site from top to bottom using React, Express, and Pay Pal.',
			thumbnail: 'thumbnails/brug.png',
			skills: ['react', 'payment processing', 'API Intigration', 'Communication'],
			className: 'green-styled-bg',
			link: 'https://thebrugmethod.com',
		},
		{
			title: 'Del Aire BC',
			description:
				'Fully built the site for this church from top to bottom using React, Material UI, and Sanity.io.',
			thumbnail: 'thumbnails/delairebc.png',
			skills: ['next', 'API Intigration', 'payment processing', 'Hooks'],
			className: 'blue-styled-bg',
			link: 'https://www.delairebc.org',
		},
		{
			title: '24/7 Sales',
			description: 'Browse hundreds of games with huge sales.',
			thumbnail: 'thumbnails/247.png',
			skills: ['react', 'API Intigration', 'email processing'],
			className: 'orange-styled-bg',
			link: 'https://247-sale.netlify.app',
		},
	];

	return (
		<div className={`project-display-container w-full flex-col ${isMobile ? '' : 'portfolio-container'}`}>
			<h1 className={`mt-16 ${isMobile ? 'mega-title' : ''}`}>Portfolio</h1>
			{projectData.map((project: any, i: number) => {
				if (i >= 3 && !extendProjects) {
					return <></>;
				}
				return <Project {...project} i={i} key={i} />;
			})}
			<button
				onClick={() => {
					setExtendProjects(!extendProjects);
				}}
				className='mt-8 w-fit mx-auto'
			>
				{extendProjects ? 'Show Less' : 'Show More'}
			</button>
		</div>
	);
}

function Project(project: any) {
	const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
	return (
		<div className={`project-container flex mt-10 ${isMobile ? '' : 'h-screen'} flex-wrap`}>
			{project.i % 2 === 0 ? <ImageSection /> : isMobile ? <ImageSection /> : <TextSection />}
			{project.i % 2 === 0 ? <TextSection /> : isMobile ? <TextSection /> : <ImageSection />}
		</div>
	);

	function ImageSection() {
		return (
			<section className={`flex flex-col ${isMobile ? 'w-full' : 'w-1/2'}`}>
				<div className={`m-auto w-full ${isMobile ? '' : 'p-4'}`}>
					{!isMobile ? <Title /> : <></>}
					<Thumbnail />
					{!isMobile ? <ActionButton /> : <></>}
				</div>
			</section>
		);
	}

	function TextSection() {
		return (
			<section className={`flex flex-col ${isMobile ? 'w-full mt-8' : 'w-1/2'}`}>
				<div className={`m-auto p-4 w-full flex flex-col ${isMobile ? `${project.className} big-border` : ''}`}>
					{isMobile ? <Title /> : <></>}
					{isMobile ? <h2 className={`${isMobile ? 'mt-4' : ''}`}>Description</h2> : <h1>Description</h1>}
					<p className={`mt-2 project-description`}>{project.description}</p>
					<h2 className='mt-4'>Key Skills</h2>
					<div className='flex flex-wrap mx-auto w-fit'>
						{project.skills.map((skill: string, i: number) => {
							const commaSpot = i === 0 || i == project.skills?.length - 1 ? '' : ',';
							console.log();
							return (
								<p
									key={i}
									className={`mt-2 ${i !== project.skills.length - 1 ? 'mr-2' : ''} skill-tiem`}
								>
									{skill + commaSpot}
								</p>
							);
						})}
					</div>
					{isMobile ? <ActionButton /> : <></>}
				</div>
			</section>
		);
	}

	function Title({ className, ...rest }: any) {
		const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
		return (
			<h1 className={`${className}`} {...rest}>
				{project.title}
			</h1>
		);
	}

	function Thumbnail() {
		const isMobile = useMediaQuery({ query: '(max-width: 680px)' });
		return (
			<div className='project-thumbnail-container mt-4' style={{}}>
				<img src={project.thumbnail} />
			</div>
		);
	}

	function ActionButton() {
		return (
			<button
				onClick={() => {
					window.open(project.link, '_blank');
				}}
				className='mt-4 w-fit mx-auto'
			>
				Visit
			</button>
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
				<Link to='/contactme' className={`${isMobile ? 'mt-4' : 'mt-2'} mb-auto ml-auto mr-auto`}>
					<button>Get in Touch</button>
				</Link>
			</section>
		);
	}
}

function Header() {
	return (
		<header className='flex flex-row w-screen max-w-full z-40'>
			<nav className='flex w-full portfolio-container'>
				<ul className='mr-auto flex'>
					<li className='h-full w-auto p-6 pl-0'>
						<a className='util-text z-40' href='/'>
							Home
						</a>
					</li>
					<li className='h-full w-auto p-6'>
						<a className='util-text z-40' href='https://anthony-cavuoti-portfolio.herokuapp.com/download'>
							Resume
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default App;
