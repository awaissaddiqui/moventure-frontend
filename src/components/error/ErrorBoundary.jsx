import React, { useState, useEffect } from 'react';

function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (error) => {
    setHasError(true);
    setError(error);
  };

  useEffect(() => {
    const prevError = window.onerror; // Store previous error handler
    window.onerror = handleError;  // Set new error handler

    // Cleanup function to restore previous error handler
    return () => {
      window.onerror = prevError;
    };
  }, []);  // Run effect only once on component mount

  if (hasError) {
    // Return fallback UI when error occurs
    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>Error details: {error && error.toString()}</p>
      </div>
    );
  }

  return children;
}

export default ErrorBoundary;
