'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/navigation';


const signupSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(true); 
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema), 
  });

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async () => {
    if (isSignup) {
      toast.success('Sign-up successful!');
    } else {
      toast.success('Login successful!');
    }
    router.push('/dashboard');
    reset();
  };

  const onError = () => {
    toast.error('Invalid input');
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="p-8 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">{isSignup ? 'Sign up' : 'Login'}</h2>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
          {isSignup && (
            <>
           
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">First name</label>
                <input
                  type="text"
                  id="firstName"
                  {...register('firstName')}
                  className={`w-full mt-1 px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">Last name</label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName')}
                  className={`w-full mt-1 px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email address</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`w-full mt-1 px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
          </div>

     
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              {...register('password')}
              className={`w-full mt-1 px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-[67%] transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>


          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-md"
          >
            {isSignup ? 'Signup' : 'Login'}
          </button>

    
          <div className="mt-4 text-center">
            <p className="text-sm">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-pink-500 hover:text-pink-600"
              >
                {isSignup ? 'Login' : 'Signup'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
