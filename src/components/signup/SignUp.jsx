import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import img1 from '../../assets/img/2.png'; // Left character
import img2 from '../../assets/img/1.png'; // Right character

function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    contact: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Track window size
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate responsive positions based on window size
  const getResponsivePositions = () => {
    const isSmallScreen = windowSize.width < 1280;
    const isMediumScreen = windowSize.width >= 1280 && windowSize.width < 1600;
    const isLargeScreen = windowSize.width >= 1600;

    return {
      leftInitial: {
        x: isSmallScreen ? '-43vw' : isMediumScreen ? '-42vw' : '-40vw',
        y: isSmallScreen ? '-40.3vh' : isMediumScreen ? '-36vh' : '-32vh',
        scale: isSmallScreen ? 0.6 : isMediumScreen ? 0.65 : 0.7,
      },
      leftSubmitted: {
        x: isSmallScreen ? '-6vw' : isMediumScreen ? '-2vw' : '0vw',
        y: isSmallScreen ? '-20vh' : isMediumScreen ? '-21vh' : '-20vh',
        scale: isSmallScreen ? 1.9 : isMediumScreen ? 1.5 : 1.4,
      },
      rightInitial: {
        x: isSmallScreen ? '43vw' : isMediumScreen ? '42vw' : '40vw',
        y: isSmallScreen ? '40vh' : isMediumScreen ? '36vh' : '32vh',
        scale: isSmallScreen ? 0.6 : isMediumScreen ? 0.65 : 0.7,
      },
      rightSubmitted: {
        x: isSmallScreen ? '2vw' : isMediumScreen ? '4vw' : '6vw',
        y: isSmallScreen ? '24vh' : isMediumScreen ? '24vh' : '24vh',
        scale: isSmallScreen ? 1.7 : isMediumScreen ? 1.3 : 1.2,
      }
    };
  };

  const responsivePositions = getResponsivePositions();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.contact) newErrors.contact = 'Contact number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
      console.log('Form submitted:', formData);
    }
  };

  // Form animation variants
  const formVariants = {
    initial: { opacity: 1, y: 0, zIndex: 10 },
    submitted: { opacity: 0, y: '-100vh', zIndex: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  // Character animation variants - meeting in the center
  const leftCharacterVariants = {
    initial: { 
      x: responsivePositions.leftInitial.x, 
      y: responsivePositions.leftInitial.y, 
      scale: responsivePositions.leftInitial.scale,
      rotate: 0,
    },
    submitted: { 
      x: responsivePositions.leftSubmitted.x, 
      y: responsivePositions.leftSubmitted.y, 
      scale: responsivePositions.leftSubmitted.scale,
      rotate: 1,
      transition: { duration: 1.2, ease: 'easeOut' }
    },
  };

  const rightCharacterVariants = {
    initial: { 
      x: responsivePositions.rightInitial.x, 
      y: responsivePositions.rightInitial.y, 
      scale: responsivePositions.rightInitial.scale,
      rotate: 0,
    },
    submitted: { 
      x: responsivePositions.rightSubmitted.x, 
      y: responsivePositions.rightSubmitted.y, 
      scale: responsivePositions.rightSubmitted.scale,
      rotate: -1,
      transition: { duration: 1.2, ease: 'easeOut' }
    },
  };

  return (
    <div className="w-full h-screen flex overflow-hidden relative">
      {/* Split Background */}
      <div className="w-1/2 h-full" style={{ backgroundColor: '#FFFEF9' }} />
      <div className="w-1/2 h-full" style={{ backgroundColor: '#CCEAEC' }} />

      {/* Main Content */}
      <div className="absolute w-full h-full flex items-center justify-center">
        {/* Form Card */}
        <motion.div
          className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6 md:p-8 z-10"
          variants={formVariants}
          initial="initial"
          animate={isSubmitted ? 'submitted' : 'initial'}
        >
          {/* <div className="flex flex-col items-center mb-2">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">PROMANAGE</h1>
              <span className="text-xs ml-1 text-gray-600">IT SOLUTION</span>
            </div>
          </div> */}

          <h2 className="text-base md:text-lg font-medium text-gray-700 mb-1 text-center">Welcome to CRM</h2>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">Sign Up</h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                Enter your username or email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Username or email address"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="username" className="block text-sm text-gray-600 mb-1">
                  User name
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="User name"
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="contact" className="block text-sm text-gray-600 mb-1">
                  Contact Number
                </label>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                    errors.contact ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
                Enter your Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <motion.button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-md hover:bg-teal-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign Up
            </motion.button>
          </form>

          <div className="text-right mt-4">
            <span className="text-sm text-gray-600">Have an Account?</span>
            <a href="#" className="text-sm text-teal-500 ml-1 font-medium hover:underline">
              Sign In
            </a>
          </div>
        </motion.div>

        {/* Container for characters that ensures they meet in the center */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden ${isSubmitted ? 'z-20' : 'z-0'}`}>
          {/* Left Character - coming from top left */}
          <motion.div
            className="absolute"
            variants={leftCharacterVariants}
            initial="initial"
            animate={isSubmitted ? 'submitted' : 'initial'}
          >
            <motion.img
              src={img1}
              alt="Left character"
              className="w-auto h-auto max-w-[400px] min-w-[200px]"
              style={{ width: 'clamp(200px, 25vw, 400px)' }}
            />
          </motion.div>

          {/* Right Character - coming from bottom right */}
          <motion.div
            className="absolute"
            variants={rightCharacterVariants}
            initial="initial"
            animate={isSubmitted ? 'submitted' : 'initial'}
          >
            <motion.img
              src={img2}
              alt="Right character"
              className="w-auto h-auto max-w-[400px] min-w-[200px]"
              style={{ width: 'clamp(200px, 25vw, 400px)' }}
            />
          </motion.div>
        </div>

        {/* Success message (optional, shows after submission) */}
        {/* {isSubmitted && (
          <motion.div 
            className="absolute z-30 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-teal-600 mb-2">Sign Up Successful!</h2>
            <p className="text-gray-700">Thank you for joining PROMANAGE</p>
          </motion.div>
        )} */}
      </div>
    </div>
  );
}

export default SignUp;
