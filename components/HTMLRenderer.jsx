"use client"

import React, { useRef, useEffect, useState } from 'react';

/**
 * HTMLRenderer Component - Renders HTML document using iframe
 * Step-by-step modular implementation
 */
const HTMLRenderer = ({ 
  htmlDocument, 
  className = "", 
  style = {},
  onLoad = null,
  responsive = true 
}) => {
  const iframeRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeHeight, setIframeHeight] = useState('600px');

  // Step 1: Create blob URL from HTML document
  const createBlobURL = (htmlString) => {
    if (!htmlString) return null;
    
    try {
      const blob = new Blob([htmlString], { type: 'text/html' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error creating blob URL:', error);
      return null;
    }
  };

  // Step 2: Handle iframe load event
  const handleIframeLoad = () => {
    setIsLoaded(true);
    
    // Step 3: Auto-resize iframe to content height (if responsive)
    if (responsive && iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        
        if (iframeDoc) {
          // Wait for content to fully load (including images and icons)
          setTimeout(() => {
            const body = iframeDoc.body;
            const html = iframeDoc.documentElement;
            
            const height = Math.max(
              body.scrollHeight,
              body.offsetHeight,
              html.clientHeight,
              html.scrollHeight,
              html.offsetHeight
            );
            
            setIframeHeight(`${height}px`);
          }, 500); // Small delay to ensure Lucide icons are loaded
        }
      } catch (error) {
        console.error('Error accessing iframe content for resizing:', error);
      }
    }
    
    // Call custom onLoad callback
    if (onLoad) {
      onLoad(iframeRef.current);
    }
  };

  // Step 4: Create and cleanup blob URL
  const [blobURL, setBlobURL] = useState(null);
  
  useEffect(() => {
    if (htmlDocument) {
      const url = createBlobURL(htmlDocument);
      setBlobURL(url);
      setIsLoaded(false);
      
      // Cleanup previous URL
      return () => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      };
    }
  }, [htmlDocument]);

  // Step 5: Handle responsive resizing on window resize
  useEffect(() => {
    if (!responsive) return;

    const handleResize = () => {
      // Re-trigger height calculation on window resize
      if (isLoaded && iframeRef.current) {
        handleIframeLoad();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, responsive]);

  // Step 6: Default iframe styles (removed padding/margin)
  const defaultIframeStyle = {
    width: '100%',
    height: responsive ? iframeHeight : '600px',
    border: 'none',
    margin: 0,
    padding: 0,
    display: 'block',
    transition: 'height 0.3s ease',
    ...style
  };

  // Step 7: Loading state
  if (!htmlDocument) {
    return (
      <div className={`html-renderer-placeholder ${className}`} style={style}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '200px',
          backgroundColor: '#f5f5f5',
          color: '#666',
          borderRadius: '4px'
        }}>
          No HTML document provided
        </div>
      </div>
    );
  }

  if (!blobURL) {
    return (
      <div className={`html-renderer-loading ${className}`} style={style}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '200px',
          backgroundColor: '#f5f5f5',
          color: '#666',
          borderRadius: '4px'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  // Step 8: Render iframe (removed container padding/margin)
  return (
    <div className={`html-renderer ${className}`} style={{ margin: 0, padding: 0 }}>
      <iframe
        ref={iframeRef}
        src={blobURL}
        style={defaultIframeStyle}
        onLoad={handleIframeLoad}
        title="HTML Renderer"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        loading="lazy"
      />
      
      {/* Optional: Loading overlay */}
      {!isLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255,255,255,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 0,
          padding: 0
        }}>
          <div style={{ color: '#666' }}>Loading content...</div>
        </div>
      )}
    </div>
  );
};



export default HTMLRenderer;
