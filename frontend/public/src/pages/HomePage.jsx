import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { buttonClasses } from '../tailwind';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-gray-900 mb-6">
          🍬 Welcome to Sweet Shop
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your one-stop destination for all things sweet!
        </p>
        
        {!user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/register" 
              className={`${buttonClasses.primary} text-lg px-8 py-3`}
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className={`${buttonClasses.outline} text-lg px-8 py-3`}
            >
              Login
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/dashboard" 
              className={`${buttonClasses.primary} text-lg px-8 py-3`}
            >
              Go to Dashboard
            </Link>
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                className={`${buttonClasses.outline} text-lg px-8 py-3`}
              >
                Admin Panel
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-gray-900 mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sweet p-6 hover:shadow-sweet-lg transition-shadow text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Shopping</h3>
            <p className="text-gray-600">Browse and purchase your favorite sweets with ease</p>
          </div>
          <div className="bg-white rounded-lg shadow-sweet p-6 hover:shadow-sweet-lg transition-shadow text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Search</h3>
            <p className="text-gray-600">Find sweets by name, category, or price range</p>
          </div>
          <div className="bg-white rounded-lg shadow-sweet p-6 hover:shadow-sweet-lg transition-shadow text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Inventory</h3>
            <p className="text-gray-600">Always know what's in stock</p>
          </div>
          <div className="bg-white rounded-lg shadow-sweet p-6 hover:shadow-sweet-lg transition-shadow text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Updates</h3>
            <p className="text-gray-600">Get instant confirmation of your purchases</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold mb-4">
              1
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Account</h3>
            <p className="text-gray-600">Sign up to start shopping</p>
          </div>
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold mb-4">
              2
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Browse Sweets</h3>
            <p className="text-gray-600">Explore our wide selection</p>
          </div>
          <div className="text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold mb-4">
              3
            </span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Make Purchase</h3>
            <p className="text-gray-600">Buy your favorites instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
