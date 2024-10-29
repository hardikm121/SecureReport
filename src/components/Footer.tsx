import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-indigo-400" />
              <span className="font-bold text-xl text-white">SafeReport</span>
            </div>
            <p className="text-sm">
              Making our communities safer through secure and anonymous crime reporting.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/report" className="hover:text-indigo-400">Report Crime</Link></li>
              <li><Link to="/dashboard" className="hover:text-indigo-400">Dashboard</Link></li>
              <li><Link to="/resources" className="hover:text-indigo-400">Resources</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Emergency: 911</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@safereport.com</span>
              </li>
            </ul>
          </div>

          {/* Emergency */}
          <div>
            <h3 className="text-white font-semibold mb-4">24/7 Emergency</h3>
            <p className="text-sm">
              If you're in immediate danger, please call emergency services immediately:
              <span className="block text-xl font-bold text-indigo-400 mt-2">911</span>
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} SafeReport. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;