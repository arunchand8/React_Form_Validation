import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

export default function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const getInputClass = (field) => `form-control${errors[field] ? ' is-invalid' : ''}`

  const formSubmit = (e) => {
    e.preventDefault()
    validateForm()
  }

  const validateForm = () => {
    setIsSubmitted(false)
    const newErrors = {}
    if (name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
      newErrors.password = 'Password must contain at least 6 characters, one uppercase letter, and one special character'
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true)
    }
  }

  return (
    <>
      <form className='form-container' onSubmit={formSubmit}>
        <h3 className='form-heading'>Create Your Account</h3>
        <div className="form-floating mb-3">
          <input type="text" className={getInputClass('name')} id="nameInput" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} required />
          <label htmlFor="nameInput">Name</label>
        </div>
        {errors.name && <div className="text-danger">{errors.name}</div>}

        <div className="form-floating mb-3">
          <input type="email" className={getInputClass('email')} id="emailInput" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} required />
          <label htmlFor="emailInput">Email address</label>
        </div>
        {errors.email && <div className="text-danger">{errors.email}</div>}
        <div className="form-floating password-toggle">
          <input type={showPassword ? 'text' : 'password'} className={getInputClass('password')} id="passwordInput" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={Boolean(errors.password)} required />
          <label htmlFor="passwordInput">Password</label>
          <button type="button" className="password-toggle-btn" onClick={() => setShowPassword((prev) => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <div className="text-danger">{errors.password}</div>}
        <div className="form-floating password-toggle">
          <input type={showConfirmPassword ? 'text' : 'password'} className={getInputClass('confirmPassword')} id="confirmPasswordInput" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} aria-invalid={Boolean(errors.confirmPassword)} required />
          <label htmlFor="confirmPasswordInput">Confirm Password</label>
          <button type="button" className="password-toggle-btn" onClick={() => setShowConfirmPassword((prev) => !prev)} aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}>
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
        {isSubmitted && <div className="text-success">Form submitted successfully</div>}
      </form>
    </>
  )
}
