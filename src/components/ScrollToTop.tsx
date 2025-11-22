import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      // Scroll window
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // Scroll root element (likely the actual scroll container due to CSS height: 100% + overflow)
      const root = document.getElementById('root');
      if (root) {
        root.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        root.scrollTop = 0;
      }

      // Scroll body and html just in case
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    scrollToTop();

    // Ensure scroll happens after layout updates
    const timer = setTimeout(scrollToTop, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <Outlet />;
};

export default ScrollToTop;
