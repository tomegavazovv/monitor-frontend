import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import left from '../../../assets/right.svg'
import right from '../../../assets/left.svg'
import './ImageCarousel.css'

// Custom Arrow components with added style
function NextArrow(props) {
	const { className, style, onClick } = props
	return (
		<img
			className={className}
			src={right}
			onClick={onClick}
			style={{ width: '50px', height: '50px', cursor: 'pointer', marginRight: '-20px' }}
			alt=''
		/>
	)
}

function PrevArrow(props) {
	const { className, style, onClick } = props
	return (
		<img
			className={className}
			src={left}
			alt=''
			onClick={onClick}
			style={{
				width: '50px',
				height: '50px',
				cursor: 'pointer',
				zIndex: '100',
				marginLeft: '-20px',
			}}
		/>
	)
}

const ImageCarousel = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0) // Initialize state to track active slide index

	const settings = {
		dots: true,
		infinite: false,
		speed: 400,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		beforeChange: (current, next) => setActiveIndex(next), // Update active slide index on slide change
		appendDots: (dots) => (
			<ul
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'end',
					paddingTop: '30px',
					paddingBottom: '30px',
					width: '100%',
					overflowX: 'scroll',
					overflowY: 'hidden',
				}}>
				{dots}
			</ul>
		),
		customPaging: (i) => (
			<div
				style={{
					width: '15px',
					height: '15px',
					color: 'black',
					fontSize: '12px',
					borderRadius: '50%',
					marginTop: '30px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					background: i === activeIndex ? 'rgba(0,0,0,0.5)' : 'transparent', // Highlight the active dot
					transition: 'background 0.3s',
					cursor: 'pointer',
				}}
				onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
				onMouseOut={(e) =>
					(e.currentTarget.style.background =
						i === activeIndex ? 'rgba(0,0,0,0.5)' : 'transparent')
				}>
				{i + 1}
			</div>
		),
	}

	return (
		<div style={{ width: '80%', margin: 'auto', marginBottom: '50px' }}>
			<Slider {...settings}>
				{images.map((image, index) => (
					<div key={index}>
						<img
							src={image}
							alt={`Slide ${index}`}
							style={{ width: '100%', height: 'auto' }}
						/>
					</div>
				))}
			</Slider>
		</div>
	)
}

export default ImageCarousel
