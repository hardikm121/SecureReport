import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, UserCheck, Bell } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <h1 className="text-5xl font-bold text-gray-900">
          Report Crime Safely & Anonymously
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your voice matters in making our community safer. Report incidents securely
          and track their progress while maintaining your privacy.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/report"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
          >
            Report Now
          </Link>
          <Link
            to="/register"
            className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors text-lg font-semibold"
          >
            Sign Up
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Shield className="h-8 w-8 text-indigo-600" />}
          title="Anonymous Reporting"
          description="Submit reports without revealing your identity. Your privacy is our top priority."
        />
        <FeatureCard
          icon={<Lock className="h-8 w-8 text-indigo-600" />}
          title="End-to-End Encryption"
          description="All communications are encrypted to ensure maximum security of your data."
        />
        <FeatureCard
          icon={<UserCheck className="h-8 w-8 text-indigo-600" />}
          title="Verified Authorities"
          description="Reports are handled by verified law enforcement officials only."
        />
        <FeatureCard
          icon={<Bell className="h-8 w-8 text-indigo-600" />}
          title="Real-time Updates"
          description="Stay informed with instant notifications about your report's progress."
        />
      </section>

      {/* Trust Banner */}
      <section className="bg-indigo-50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Trusted by Communities Nationwide
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of citizens who have helped make their communities safer
          through anonymous reporting. Your safety and privacy are guaranteed.
        </p>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;