// Function that reports web vitals performance metrics
const reportWebVitals = onPerfEntry => {
  // Checking if onPerfEntry is a function
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically importing the 'web-vitals' module
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Calling the provided onPerfEntry function with individual web vitals metrics
      getCLS(onPerfEntry); // Cumulative Layout Shift
      getFID(onPerfEntry); // First Input Delay
      getFCP(onPerfEntry); // First Contentful Paint
      getLCP(onPerfEntry); // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time to First Byte
    });
  }
};

// Exporting the reportWebVitals function as the default export
export default reportWebVitals;
