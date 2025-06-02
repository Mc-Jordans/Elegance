import React from 'react';
import { FileText, Image, Link as LinkIcon, Calendar } from 'lucide-react';

export default function ContentManagement() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Content Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pages Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Pages</h2>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-700">Home</span>
              <button className="text-primary-600 hover:text-primary-700">Edit</button>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-700">Menu</span>
              <button className="text-primary-600 hover:text-primary-700">Edit</button>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-700">About</span>
              <button className="text-primary-600 hover:text-primary-700">Edit</button>
            </li>
          </ul>
        </div>

        {/* Media Library */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Media Library</h2>
            <Image className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square bg-gray-100 rounded-md"></div>
            <div className="aspect-square bg-gray-100 rounded-md"></div>
            <div className="aspect-square bg-gray-100 rounded-md"></div>
            <div className="aspect-square bg-gray-100 rounded-md"></div>
            <div className="aspect-square bg-gray-100 rounded-md"></div>
            <div className="aspect-square bg-gray-100 rounded-md"></div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Upload New
          </button>
        </div>

        {/* Navigation */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Navigation</h2>
            <LinkIcon className="h-5 w-5 text-gray-400" />
          </div>
          <ul className="space-y-3">
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-700">Main Menu</span>
              <button className="text-primary-600 hover:text-primary-700">Edit</button>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-700">Footer Links</span>
              <button className="text-primary-600 hover:text-primary-700">Edit</button>
            </li>
            <li className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-gray-700">Social Media</span>
              <button className="text-primary-600 hover:text-primary-700">Edit</button>
            </li>
          </ul>
        </div>

        {/* Scheduled Content */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Scheduled Content</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Summer Menu Launch</span>
                <span className="text-sm text-gray-500">Jun 1, 2025</span>
              </div>
              <p className="text-sm text-gray-600">Update menu items and hero section</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Holiday Specials</span>
                <span className="text-sm text-gray-500">Dec 1, 2025</span>
              </div>
              <p className="text-sm text-gray-600">Seasonal promotions and decorations</p>
            </div>
          </div>
          <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Schedule New
          </button>
        </div>
      </div>
    </div>
  );
}