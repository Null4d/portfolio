import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center w-full h-full bg-primary-1 text-primary-2">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary-7 mb-4">404</h1>
          <h2 className="text-2xl mb-4">Page Not Found</h2>
          <p className="text-lg mb-8">
            <i className="icon-folder mr-2" />
            The page you are looking for does not exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-primary-3 text-primary-7 rounded-lg hover:bg-primary-4 transition-colors duration-200"
          >
            Go Home
          </Link>

          <div className="text-sm text-primary-2 mt-4">
            <p>Or try navigating to:</p>
            <ul className="mt-2 space-y-1">
              <li>
                <Link
                  to="/"
                  className="text-primary-6 hover:text-primary-7 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-primary-6 hover:text-primary-7 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-primary-6 hover:text-primary-7 transition-colors"
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
