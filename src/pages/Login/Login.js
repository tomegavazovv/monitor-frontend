import { useState } from 'react'
import { useAuth } from '../../provider/authProvider'
import { useNavigate, useSearchParams } from 'react-router-dom'
import login from '../../client/login'
import '../../App.css'
import styles from './Login.module.css'
import register from '../../client/register'
import { Loader } from '../../components/Loader/Loader'
import dispatchEvent from '../../utils/dispatchEvent'
import { useDispatch } from 'react-redux'
import { fetchLists } from '../../store/features/lists/listsSlice'

const Login = () => {
	const dispatch = useDispatch()
	const [credentials, setCredentials] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	})
	const [isSignUp, setIsSignUp] = useState(false)
	const [errorMessages, setErrorMessages] = useState([])
	const [loading, setLoading] = useState(false)
	const { setToken } = useAuth()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const validate = () => {
		const errors = []
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!emailPattern.test(credentials.email)) {
			errors.push('Invalid email format.')
		}

		if (credentials.password.length < 8) {
			errors.push('Password must be at least 8 characters long.')
		}

		if (isSignUp && credentials.password !== credentials.confirmPassword) {
			errors.push('Passwords do not match.')
		}

		setErrorMessages(errors)
		return errors.length === 0
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		if (!validate()) {
			setLoading(false)
			return
		}

		let data
		if (isSignUp) {
			data = await register(
				credentials.email,
				credentials.password,
				credentials.confirmPassword
			)
		} else {
			data = await login(credentials.email, credentials.password)
		}

		if (data.token) {
			localStorage.setItem('token', data.token)
			dispatchEvent('userLoggedIn', { token: data.token })
			dispatch(fetchLists())
			// Check for the 'extension' search parameter and redirect immediately if present
			if (searchParams.get('extension') !== null) {
				window.location.href = 'https://linkedin.com'
			} else {
				setToken(data.token)
				if(isSignUp) localStorage.setItem('extensionInstalled', 'false')
				navigate('/home/lists')
			}
		} else {
			setLoading(false)

			if (!isSignUp) {
				setErrorMessages(['Invalid credentials. Try Again.'])
			} else {
				setErrorMessages(
					data['message'].split(':') || 'An error occurred. Please try again.'
				)
			}
		}
	}

	const handleChange = (e) => {
		setCredentials((prevCredentials) => ({
			...prevCredentials,
			[e.target.name]: e.target.value,
		}))
		// Clear error messages on any change to the input fields
		setErrorMessages([])
	}

	const toggleSignIn = () => {
		setIsSignUp((prev) => !prev)
		// Clear error message when toggling between modes
		setErrorMessages([])
	}

	return (
		<div className={styles.loginContainer}>
			<form onSubmit={handleSubmit} className={styles.loginForm}>
				<div>
					<p className={styles.sign_up_text}>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
				</div>
				<div className={styles.email_input}>
					<input
						name='email'
						type='text'
						placeholder='Email'
						className={`${styles.inputField} `}
						onChange={handleChange}
						value={credentials.email}
					/>
				</div>
				<div className={styles.password_input}>
					<input
						name='password'
						type='password'
						placeholder='Password'
						className={`${styles.inputField} `}
						onChange={handleChange}
						value={credentials.password}
					/>
				</div>
				{isSignUp && (
					<div className={styles.password_confirm_input}>
						<input
							name='confirmPassword'
							type='password'
							placeholder='Confirm Password'
							className={`${styles.inputField} `}
							onChange={handleChange}
							value={credentials.confirmPassword}
						/>
					</div>
				)}
				{errorMessages.length > 0 && (
					<div className={styles.error_message}>
						{errorMessages.map((msg, index) => (
							<span key={index}>
								{msg}
								<br />
							</span>
						))}
					</div>
				)}
				<button type='submit' className={styles.submitButton}>
					{isSignUp ? 'Sign Up' : 'Sign In'}
				</button>
				<div className={styles.account}>
					{!isSignUp ? (
						<p>
							Don't have an account?{' '}
							<span className={styles.sign_up_btn} onClick={toggleSignIn}>
								Sign up
							</span>
						</p>
					) : (
						<p>
							Already have an account?{' '}
							<span className={styles.sign_up_btn} onClick={toggleSignIn}>
								Sign in
							</span>
						</p>
					)}
				</div>
				{loading && <div className={styles.loader_container}>{<Loader />}</div>}
			</form>
		</div>
	)
}

export default Login
