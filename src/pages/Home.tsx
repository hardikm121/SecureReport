import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to SecureReport</h1>
      <div className="flex justify-center mb-8">
        <ShieldCheck size={64} className="text-blue-600" />
      </div>
      <p className="text-xl mb-8">
        A secure and anonymous platform for reporting incidents confidentially.
      </p>
      <Link
        to="/report"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
      >
        Report an Incident
      </Link>
    </div>
  );
};

export default Home;