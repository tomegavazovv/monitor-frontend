import React, { useEffect, useState, useRef } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import img from '../../assets/reactions.png'
import likeImg from '../../assets/like.svg'
import likeAndSkipImg from '../../assets/likeAndSkip.svg'
import openImage from '../../assets/open.svg'
import styles from './Post.module.css'
import Comment from './Comment/Comment'
import getComments from '../../client/getComments'
import dispatchEvent from '../../utils/dispatchEvent'
import getVideo from '../../client/getVideo'
import TextWithHashtags from './TextWithHashtags/TextWithHashtags'
import Gallery from './Gallery/Gallery'
import getCarouselImages from '../../client/getCarouselImages'
import ImageCarousel from './ImageCarousel/ImageCarousel'
import Like from './Reactions/Like/Like'
import EmojiPicker from 'emoji-picker-react'
import emoji from '../../assets/emoji.svg'
import closeImage from '../../assets/close.svg'
import usePosts from '../../hooks/usePosts'
import playImage from '../../assets/playButton.svg'
import { Loader } from '../Loader/Loader'

const Post = ({
	date,
	text,
	profileImage,
	name,
	likeCount,
	commentCount,
	urn,
	postImages,
	videoPoster,
	carousel,
	headline,
}) => {
	const [comments, setComments] = useState([])
	const [carouselImages, setCarouselImages] = useState([])
	const [comment, setComment] = useState('')
	const [videoSrc, setVideoSrc] = useState('')
	const [skipped, setSkipped] = useState(false)
	const { skipPost } = usePosts()
	const [emojiPickerShow, setEmojiPickerShow] = useState(false)
	const textareaRef = useRef(null)
	const emojiPickerRef = useRef(null)
	const [myComment, setMyComment] = useState('')
	const [likedPost, setLikedPost] = useState(false)
	const [videoLoading, setVideoLoading] = useState(false)
	const [commentLoader, setCommentLoader] = useState(false)
	const disabled = comment !== ''

	useEffect(() => {
		if (carousel !== '') {
			getCarouselImages(carousel).then((images) => setCarouselImages(images))
		}
	}, [carousel])

	useEffect(() => {
		function handleClickOutside(event) {
			if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
				setEmojiPickerShow(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	const handleVideoClick = () => {
		setVideoLoading(true)
		if (videoPoster) {
			getVideo(urn).then((src) => {
				setVideoSrc(src)
				setVideoLoading(false)
			})
		}
	}

	const handleEmojiClick = (emojiObject) => {
		const cursorPosition = textareaRef.current.selectionStart
		setComment((prevComment) => {
			const newComment =
				prevComment.substring(0, cursorPosition) +
				emojiObject.emoji +
				prevComment.substring(cursorPosition)
			return newComment
		})

		setTimeout(() => {
			textareaRef.current.focus()
			textareaRef.current.selectionStart = cursorPosition + emojiObject.emoji.length
			textareaRef.current.selectionEnd = cursorPosition + emojiObject.emoji.length
		}, 0)
	}

	const toggleEmojiPicker = () => {
		setEmojiPickerShow(!emojiPickerShow)
	}

	const handleShowComments = async () => {
		setCommentLoader(true)
		const postComments = await getComments(urn)
		setCommentLoader(false)
		setComments(postComments)
	}

	const handleCommentSubmit = (e) => {
		e.preventDefault()

		if (comment !== '') {
			setMyComment(comment)
			setComment('')
		}

		// dispatchEvent('commentSubmitted', { urn, comment })
	}

	const handleInput = (e) => {
		const textarea = textareaRef.current
		textarea.style.height = 'auto'
		textarea.style.height = `${textarea.scrollHeight}px`
	}

	const handleCommentChange = (e) => {
		setComment(e.target.value)
	}

	const handleSkipPost = async () => {
		setSkipped(true)
		await skipPost(urn)
	}

	const handleLikeAndSkipPost = async () => {
		console.log(handleSkipPost)
		setSkipped(true)
	}

	const handleLikePost = async () => {
		setLikedPost(true)
	}

	return (
		<div
			className={`${!skipped ? styles.post_container : styles.skipped} ${
				styles.post_container
			} `}>
			<div className={styles.headline}>
				<LazyLoadImage
					alt=''
					src={profileImage}
					effect='blur'
					placeholderSrc={require('../../assets/placeholder.jpg')}
					className={styles.profile_image}
				/>
				<div className={styles.post_details}>
					<p className={styles.headline_name}>{name}</p>
					<p className={styles.headline_headline}>{headline}</p>
					<p className={styles.headline_date}>{date}</p>
				</div>
				<div className={styles.close_container}>
					<img src={closeImage} className={styles.close_image} onClick={handleSkipPost} />
				</div>
			</div>
			<div className={styles.content_container}>
				<TextWithHashtags text={text} />
				<div>
					<Gallery images={postImages} />
				</div>
				{videoPoster && (
					<div className={styles.video_container}>
						<video
							playsInline
							width='600'
							crossOrigin='anonymous'
							poster={videoPoster}
							src={videoSrc}
							controls></video>

						{!videoSrc && (
							<div className={styles.video_overlay} onClick={handleVideoClick}>
								{!videoLoading && <img src={playImage} />}
							</div>
						)}
						{videoLoading && <div className={styles.video_overlay}>Loading...</div>}
					</div>
				)}
				{carousel && carouselImages && (
					<div className={styles.carousel}>
						<ImageCarousel images={carouselImages} />
					</div>
				)}
			</div>
			<div className={styles.post_engagement}>
				<div className={styles.reactions}>
					<img alt='' src={img} className={styles.reactions_img} />
					<p className={styles.metrics}>{likeCount === '' ? 0 : likeCount}</p>
				</div>
				<div className={styles.comments_reposts}>
					<p onClick={handleShowComments} className={styles.metrics}>
						{commentCount} comments
					</p>
				</div>
			</div>
			<div className={styles.engage_container}>
				<div onClick={handleLikePost}>
					<Like image={likeImg} urn={urn} />
				</div>
				{!likedPost && (
					<div onClick={handleLikeAndSkipPost}>
						<Like image={likeAndSkipImg} urn={urn} />
					</div>
				)}

				<div className={styles.open}>
					<a
						href={`https://linkedin.com/feed/update/${urn}`}
						rel='noreferrer'
						target='_blank'>
						<img src={openImage} alt='' className={styles.open_image} />
					</a>
				</div>
			</div>
			{myComment === '' && (
				<div className={styles.comment_container}>
					<img
						alt='profilePhoto'
						className={styles.me_profile_image}
						src='https://media.licdn.com/dms/image/D4D03AQEA65McwtaECg/profile-displayphoto-shrink_100_100/0/1696699660367?e=1720051200&v=beta&t=FHkgl9IPbbbTTEQZAaOGxyqCYCWTqNlOBbOQ_FOtWmg'
					/>
					<form
						style={{ width: '100%', position: 'relative' }}
						onSubmit={handleCommentSubmit}
						className={styles.textarea_button_container}>
						<textarea
							ref={textareaRef}
							className={styles.comment_input}
							name='comment'
							value={comment}
							placeholder='Add a comment...'
							onInput={handleInput}
							rows='1'
							onChange={handleCommentChange}
						/>
						<button
							type='submit'
							className={`${styles.submit_comment_btn} ${
								comment === '' ? styles.disabled : ''
							}`}>
							Submit
						</button>
						<img
							src={emoji}
							onClick={toggleEmojiPicker}
							className={styles.emoji_button}
							alt=''
						/>

						<div className={styles.picker} ref={emojiPickerRef}>
							{emojiPickerShow && <EmojiPicker onEmojiClick={handleEmojiClick} />}
						</div>
					</form>
				</div>
			)}

			{myComment !== '' && (
				<Comment
					headline={'Startup enthusiast'}
					date={'1m'}
					elements={[myComment]}
					photoSrc={
						'https://media.licdn.com/dms/image/D4D03AQEA65McwtaECg/profile-displayphoto-shrink_100_100/0/1696699660367?e=1720051200&v=beta&t=FHkgl9IPbbbTTEQZAaOGxyqCYCWTqNlOBbOQ_FOtWmg'
					}
					name={'Krste Simeonov'}
				/>
			)}
			{!commentLoader ? (
				<div className={styles.comments_container}>
					{comments.map((comment, index) => (
						<div key={index}>
							<Comment {...comment} />
						</div>
					))}
				</div>
			) : (
				<div className={styles.comment_loader_container}>
					<Loader />
				</div>
			)}
		</div>
	)
}

export default Post
