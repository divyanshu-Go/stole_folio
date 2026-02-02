// Container to Full HTML Document Converter
// Step-by-step modular implementation

/**
 * Main function to convert Container object to full HTML document
 * @param {Container} container - Root container object
 * @returns {string} - Complete HTML document string
 */
function containerToFullHTML(container) {
  // Step 1: Collect all containers for CSS generation
  const allContainers = collectAllContainers(container);
  
  // Step 2: Generate CSS stylesheet
  const cssStyles = generateCSS(allContainers);
  
  // Step 3: Generate HTML structure
  const htmlBody = generateHTML(container);
  
  // Step 4: Combine into complete HTML document
  return generateFullHTMLDocument(cssStyles, htmlBody);
}

/**
 * Step 1: Recursively collect all containers in the tree
 * @param {Container} container - Root container
 * @returns {Array} - Flat array of all containers
 */
function collectAllContainers(container) {
  const containers = [container];
  
  container.children.forEach(child => {
    if (child) {
      containers.push(...collectAllContainers(child));
    }
  });
  
  return containers;
}

/**
 * Step 2: Generate CSS for all containers
 * @param {Array} containers - Array of all containers
 * @returns {string} - CSS stylesheet string
 */
function generateCSS(containers) {
  let css = '';
  
  containers.forEach(container => {
    const className = `container-${container.container_Id}`;
    
    // Generate base styles
    css += generateBaseStyles(className, container);
    
    // Generate hover styles if they exist
    if (hasHoverStyles(container.hoverStyles)) {
      css += generateHoverStyles(className, container.hoverStyles);
    }
  });
  
  return css;
}

/**
 * Step 2a: Generate base CSS styles for a container
 * @param {string} className - CSS class name
 * @param {Container} container - Container object
 * @returns {string} - CSS rules string
 */
function generateBaseStyles(className, container) {
  const styles = container.styles;
  let css = `.${className} {\n`;
  
  // Convert all style properties
  Object.entries(styles).forEach(([property, value]) => {
    const cssProperty = camelToKebab(property);
    css += `  ${cssProperty}: ${value};\n`;
  });
  
  // Add background image styles if applicable
  if (container.imageMode === 'background' && container.imageUrl) {
    css += `  background-image: url('${container.imageUrl}');\n`;
    css += `  background-position: ${container.imagePosition};\n`;
    css += `  background-size: ${container.imageSize};\n`;
    css += `  background-repeat: ${container.imageRepeat};\n`;
  }
  
  // Add link-specific styling
  if (container.isClickable && container.linkUrl) {
    css += `  text-decoration: underline;\n`;
  }
  
  css += '}\n\n';
  return css;
}

/**
 * Step 2b: Generate hover CSS styles for a container
 * @param {string} className - CSS class name
 * @param {object} hoverStyles - Hover styles object
 * @returns {string} - CSS hover rules string
 */
function generateHoverStyles(className, hoverStyles) {
  let css = `.${className}:hover {\n`;
  
  if (hoverStyles.backgroundColor && hoverStyles.backgroundColor !== 'transparent') {
    css += `  background-color: ${hoverStyles.backgroundColor} !important;\n`;
  }
  
  if (hoverStyles.color && hoverStyles.color !== 'transparent') {
    css += `  color: ${hoverStyles.color} !important;\n`;
  }
  
  if (hoverStyles.borderColor && hoverStyles.borderColor !== 'transparent') {
    css += `  border-color: ${hoverStyles.borderColor} !important;\n`;
  }
  
  if (hoverStyles.opacity) {
    css += `  opacity: ${hoverStyles.opacity / 100} !important;\n`;
  }
  
  if (hoverStyles.scale) {
    css += `  transform: scale(${hoverStyles.scale / 100}) !important;\n`;
  }
  
  if (hoverStyles.boxShadow) {
    css += `  box-shadow: ${hoverStyles.boxShadow} !important;\n`;
  }
  
  css += '}\n\n';
  return css;
}

/**
 * Step 3: Generate HTML structure recursively
 * @param {Container} container - Container object
 * @returns {string} - HTML string
 */
function generateHTML(container) {
  const className = `container-${container.container_Id}`;
  const tagName = container.isClickable && container.linkUrl ? 'a' : 'div';
  
  // Build opening tag with attributes
  let html = `<${tagName} class="${className}"`;
  
  // Add section ID if exists
  if (container.sectionId) {
    html += ` id="${container.sectionId}"`;
  }
  
  // Add link attributes if clickable
  if (container.isClickable && container.linkUrl) {
    html += ` href="${container.linkUrl}"`;
    html += ` target="${container.linkTarget}"`;
    if (container.linkTitle) {
      html += ` title="${container.linkTitle}"`;
    }
    if (container.linkTarget === '_blank') {
      html += ` rel="noopener noreferrer"`;
    }
  }
  
  html += '>';
  
  // Generate content
  html += generateContentHTML(container);
  
  // Close tag
  html += `</${tagName}>`;
  
  return html;
}

/**
 * Step 3a: Generate content HTML for a container
 * @param {Container} container - Container object
 * @returns {string} - Content HTML string
 */
function generateContentHTML(container) {
  let content = '';
  
  // Handle icon (if icon exists, don't render text)
  if (container.hasIcon && container.iconName) {
    const iconColor = container.iconColor === 'transparent' ? 'currentColor' : container.iconColor;
    content += `<i data-lucide="${container.iconName.toLowerCase()}" style="width: ${container.iconSize}px; height: ${container.iconSize}px; color: ${iconColor}; flex-shrink: 0;"></i>`;
    
    // Handle children even when icon exists
    container.children.forEach(child => {
      if (child) {
        content += generateHTML(child);
      }
    });
    
    return content;
  }
  
  // Handle image (img mode - if image exists, don't render text)
  if (container.imageMode === 'img' && container.imageUrl) {
    const imgStyle = {
      'max-width': '100%',
      'max-height': '100%',
      'object-fit': container.imageSize === 'cover' ? 'cover' : 'contain'
    };
    const styleStr = Object.entries(imgStyle).map(([k, v]) => `${k}: ${v}`).join('; ');
    content += `<img src="${container.imageUrl}" alt="${container.imageAlt}" style="${styleStr}" />`;
    
    // Handle children even when image exists
    container.children.forEach(child => {
      if (child) {
        content += generateHTML(child);
      }
    });
    
    return content;
  }
  
  // Handle text (only if no children have content AND no icon AND no image)
  const hasChildContent = container.children.some(child => child !== null);
  if (container.text && !hasChildContent) {
    content += `<span style="font-size: ${container.styles.fontSize}">${escapeHTMLSimple(container.text)}</span>`;
  }
  
  // Handle children
  container.children.forEach(child => {
    if (child) {
      content += generateHTML(child);
    }
  });
  
  return content;
}

/**
 * Step 4: Generate complete HTML document
 * @param {string} css - CSS stylesheet
 * @param {string} bodyHTML - Body HTML content
 * @returns {string} - Complete HTML document
 */
function generateFullHTMLDocument(css, bodyHTML) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <style>
        ${css}
    </style>
</head>
<body>
    ${bodyHTML}
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>`;
}

/**
 * Utility Functions
 */

// Convert camelCase to kebab-case
function camelToKebab(str) {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

// Check if container has meaningful hover styles
function hasHoverStyles(hoverStyles) {
  return hoverStyles && Object.values(hoverStyles).some(value => 
    value !== 'transparent' && value !== 'none' && value !== '100'
  );
}

// Escape HTML characters in text content (Server-safe version)
function escapeHTMLSimple(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Example Usage:
 * 
 * const container = new Container();
 * // ... configure container with styles, children, etc.
 * 
 * const fullHTML = containerToFullHTML(container);
 * console.log(fullHTML);
 *
 * // To download as HTML file:
 * const blob = new Blob([fullHTML], { type: 'text/html' });
 * const url = URL.createObjectURL(blob);
 * const a = document.createElement('a');
 * a.href = url;
 * a.download = 'portfolio.html';
 * a.click();
 */

export { containerToFullHTML };