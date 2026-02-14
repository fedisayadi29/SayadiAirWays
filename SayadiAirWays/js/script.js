// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    nav.style.padding = '0.3rem 0.5rem';
  } else {
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    nav.style.padding = '0.5rem';
  }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      navbarCollapse.classList.toggle('show');
    });
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form validation for booking form
document.addEventListener('DOMContentLoaded', function() {
  const bookingForm = document.getElementById('bookingForm');
  const flightBookingForm = document.getElementById('flightBookingForm');
  
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const from = this.querySelector('[name="from"]').value;
      const to = this.querySelector('[name="to"]').value;
      const departure = this.querySelector('[name="departure"]').value;
      
      if (!from || !to || !departure) {
        alert('Please fill in all required fields');
        return;
      }
      
      if (from === to) {
        alert('Departure and destination cities cannot be the same');
        return;
      }
      
      // Redirect to booking page with parameters
      const params = new URLSearchParams({
        from: from,
        to: to,
        departure: departure,
        passengers: this.querySelector('[name="passengers"]').value
      });
      
      window.location.href = `Book-Complete.html?${params.toString()}`;
    });
  }
  
  if (flightBookingForm) {
    flightBookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const bookingData = {};
      
      for (let [key, value] of formData.entries()) {
        if (key === 'extras') {
          if (!bookingData.extras) bookingData.extras = [];
          bookingData.extras.push(value);
        } else {
          bookingData[key] = value;
        }
      }
      
      console.log('Booking Data:', bookingData);
      alert('Flight search initiated! (This is a demo)');
    });
  }
});

// Statistics counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.stat__number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const suffix = counter.getAttribute('data-suffix') || '';
    let current = 0;
    const increment = target / 100;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + suffix;
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target + suffix;
      }
    };
    
    updateCounter();
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Trigger counter animation for stats section
      if (entry.target.classList.contains('stats__container')) {
        animateCounters();
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.stats__container, .popular__card, .client__card');
  animatedElements.forEach(el => observer.observe(el));
});

// Extras selection handling
document.addEventListener('change', function(e) {
  if (e.target.name === 'extras') {
    const extraOption = e.target.closest('.extra-option');
    const extraContent = extraOption.querySelector('.extra-content');
    
    if (e.target.checked) {
      extraContent.style.borderColor = '#63A7FF';
      extraContent.style.background = 'rgba(99, 167, 255, 0.05)';
    } else {
      extraContent.style.borderColor = '#f3f4f6';
      extraContent.style.background = '#ffffff';
    }
  }
});

// Date validation for booking forms
document.addEventListener('DOMContentLoaded', function() {
  const departureInput = document.querySelector('input[name="departure"]');
  const returnInput = document.querySelector('input[name="return"]');
  
  if (departureInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    departureInput.min = today;
    
    departureInput.addEventListener('change', function() {
      if (returnInput) {
        returnInput.min = this.value;
        if (returnInput.value && returnInput.value < this.value) {
          returnInput.value = '';
        }
      }
    });
  }
  
  if (returnInput) {
    returnInput.addEventListener('change', function() {
      if (departureInput && this.value < departureInput.value) {
        alert('Return date cannot be before departure date');
        this.value = '';
      }
    });
  }
});

// Loading animation for buttons
document.addEventListener('click', function(e) {
  if (e.target.matches('.btn-primary, .search__btn')) {
    const btn = e.target;
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<i class="ri-loader-4-line"></i> Loading...';
    btn.disabled = true;
    
    // Reset button after 2 seconds (for demo purposes)
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }, 2000);
  }
});

// Dropdown menu handling
document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('open');
      });
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
      });
    }
  });
});

// Plane animation for world map
document.addEventListener('DOMContentLoaded', function() {
  const planeContainer = document.querySelector('.plane-container');
  if (planeContainer) {
    // Add CSS animation class
    planeContainer.style.animation = 'flyAcross 8s ease-in-out infinite';
  }
});

// Form auto-fill from URL parameters
document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  
  // Auto-fill form fields from URL parameters
  urlParams.forEach((value, key) => {
    const input = document.querySelector(`[name="${key}"]`);
    if (input) {
      input.value = value;
    }
  });
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
  // Add keyboard navigation for custom elements
  const customButtons = document.querySelectorAll('.extra-option, .popular__card__btn');
  
  customButtons.forEach(button => {
    button.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  // Add focus indicators
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
  
  focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
      this.style.outline = '3px solid rgba(99, 167, 255, 0.3)';
      this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
      this.style.outline = '';
      this.style.outlineOffset = '';
    });
  });
});

console.log('SayadiAirways JavaScript loaded successfully!');

// Interactive SVG World Map - Using EXACT SVG file with real boundaries
function initializeWorldMap() {
  const mapContainer = document.getElementById('worldMap');
  if (!mapContainer) {
    console.log('No world map container found');
    return;
  }

  console.log('Loading your exact SVG world map...');

  // Method 1: Try XMLHttpRequest first (works better with local files)
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../Icons/worldmap.svg', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200 || xhr.status === 0) { // 0 for local files
        console.log('SVG loaded successfully via XMLHttpRequest');
        processSVGContent(xhr.responseText, mapContainer);
      } else {
        console.error('XMLHttpRequest failed, status:', xhr.status);
        tryAlternativeMethods(mapContainer);
      }
    }
  };
  xhr.onerror = function() {
    console.error('XMLHttpRequest error, trying alternative methods...');
    tryAlternativeMethods(mapContainer);
  };
  xhr.send();
}

function processSVGContent(svgText, mapContainer) {
  // Hide loading message
  const loadingDiv = document.getElementById('mapLoading');
  if (loadingDiv) loadingDiv.style.display = 'none';
  
  // Insert your exact SVG content
  mapContainer.innerHTML = svgText;
  
  // Get the SVG element
  const svgElement = mapContainer.querySelector('svg');
  if (!svgElement) {
    console.error('SVG element not found');
    mapContainer.innerHTML = '<div style="color: white; text-align: center; padding: 2rem;">Map loading failed - SVG not found</div>';
    return;
  }
  
  // Style the SVG to fit container
  svgElement.style.width = '100%';
  svgElement.style.height = '100%';
  svgElement.style.borderRadius = '10px';
  
  console.log('Setting up interactivity...');
  setupInteractivity(svgElement);
}

function tryAlternativeMethods(mapContainer) {
  console.log('Trying alternative loading methods...');
  
  // Method 2: Try fetch as backup
  fetch('../Icons/worldmap.svg')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(svgText => {
      console.log('SVG loaded successfully via fetch');
      processSVGContent(svgText, mapContainer);
    })
    .catch(err => {
      console.error('Fetch also failed:', err);
      tryObjectMethod(mapContainer);
    });
}

function tryObjectMethod(mapContainer) {
  console.log('Using object tag method as final fallback...');
  
  const loadingDiv = document.getElementById('mapLoading');
  if (loadingDiv) loadingDiv.style.display = 'none';
  
  mapContainer.innerHTML = `
    <object data="../Icons/worldmap.svg" type="image/svg+xml" style="width: 100%; height: 100%; border-radius: 10px;" id="svgObject">
      <embed src="../Icons/worldmap.svg" type="image/svg+xml" style="width: 100%; height: 100%; border-radius: 10px;" />
      <div style="color: white; text-align: center; padding: 2rem;">
        <i class="ri-error-warning-line" style="margin-right: 0.5rem;"></i>
        Unable to load the world map.<br>
        <small>This might be due to browser security restrictions when opening files locally.<br>
        Try opening the page through a local web server (e.g., Live Server extension).</small>
      </div>
    </object>
  `;
  
  // Try to access the object after it loads
  setTimeout(() => {
    const svgObject = document.getElementById('svgObject');
    if (svgObject) {
      try {
        const svgDoc = svgObject.contentDocument || svgObject.getSVGDocument();
        if (svgDoc) {
          const svgElement = svgDoc.documentElement || svgDoc.querySelector('svg');
          if (svgElement) {
            console.log('SVG accessed via object tag');
            setupInteractivity(svgElement);
          } else {
            console.log('Could not access SVG content via object tag');
          }
        } else {
          console.log('Could not access SVG document via object tag - this is normal for local files');
        }
      } catch (e) {
        console.log('Could not access SVG via object tag (security restriction):', e.message);
      }
    }
  }, 3000); // Wait longer for object to load
}

function setupZoomAndPan(svgElement) {
  console.log('Setting up zoom and pan functionality...');
  
  let currentZoom = 1;
  let currentX = 0;
  let currentY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;
  
  const minZoom = 0.5;
  const maxZoom = 5;
  const zoomStep = 0.2;
  
  // Create a group element to contain all map elements for transformation
  const mapGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  mapGroup.id = 'mapGroup';
  
  // Move all existing SVG content into the group
  while (svgElement.firstChild) {
    mapGroup.appendChild(svgElement.firstChild);
  }
  svgElement.appendChild(mapGroup);
  
  // Add zoom controls to the map container
  const mapContainer = svgElement.parentElement;
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'map-controls';
  controlsDiv.innerHTML = `
    <div class="zoom-controls">
      <button class="zoom-btn zoom-in" title="Zoom In">
        <i class="ri-add-line"></i>
      </button>
      <button class="zoom-btn zoom-out" title="Zoom Out">
        <i class="ri-subtract-line"></i>
      </button>
      <button class="zoom-btn zoom-reset" title="Reset View">
        <i class="ri-home-line"></i>
      </button>
    </div>
    <div class="map-info">
      <small>Use mouse wheel to zoom, drag to pan</small>
    </div>
  `;
  mapContainer.appendChild(controlsDiv);
  
  // Apply transformation
  function updateTransform() {
    mapGroup.setAttribute('transform', `translate(${currentX}, ${currentY}) scale(${currentZoom})`);
  }
  
  // Zoom functions
  function zoomIn() {
    if (currentZoom < maxZoom) {
      currentZoom = Math.min(maxZoom, currentZoom + zoomStep);
      updateTransform();
    }
  }
  
  function zoomOut() {
    if (currentZoom > minZoom) {
      currentZoom = Math.max(minZoom, currentZoom - zoomStep);
      updateTransform();
    }
  }
  
  function resetView() {
    currentZoom = 1;
    currentX = 0;
    currentY = 0;
    updateTransform();
  }
  
  // Mouse wheel zoom
  svgElement.addEventListener('wheel', function(e) {
    e.preventDefault();
    
    const rect = svgElement.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate zoom center
    const zoomCenterX = (mouseX - currentX) / currentZoom;
    const zoomCenterY = (mouseY - currentY) / currentZoom;
    
    const oldZoom = currentZoom;
    
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
    
    // Adjust position to zoom towards mouse cursor
    if (currentZoom !== oldZoom) {
      currentX = mouseX - zoomCenterX * currentZoom;
      currentY = mouseY - zoomCenterY * currentZoom;
      updateTransform();
    }
  });
  
  // Mouse drag pan
  svgElement.addEventListener('mousedown', function(e) {
    if (e.button === 0) { // Left mouse button
      isDragging = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      svgElement.style.cursor = 'grabbing';
      e.preventDefault();
    }
  });
  
  svgElement.addEventListener('mousemove', function(e) {
    if (isDragging) {
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;
      updateTransform();
      e.preventDefault();
    }
  });
  
  svgElement.addEventListener('mouseup', function(e) {
    if (isDragging) {
      isDragging = false;
      svgElement.style.cursor = 'grab';
    }
  });
  
  svgElement.addEventListener('mouseleave', function() {
    if (isDragging) {
      isDragging = false;
      svgElement.style.cursor = 'grab';
    }
  });
  
  // Touch events for mobile
  let lastTouchDistance = 0;
  let lastTouchCenter = { x: 0, y: 0 };
  
  svgElement.addEventListener('touchstart', function(e) {
    if (e.touches.length === 1) {
      // Single touch - start panning
      isDragging = true;
      const touch = e.touches[0];
      startX = touch.clientX - currentX;
      startY = touch.clientY - currentY;
    } else if (e.touches.length === 2) {
      // Two touches - prepare for pinch zoom
      isDragging = false;
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      lastTouchDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      lastTouchCenter = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
      };
    }
    e.preventDefault();
  });
  
  svgElement.addEventListener('touchmove', function(e) {
    if (e.touches.length === 1 && isDragging) {
      // Single touch - pan
      const touch = e.touches[0];
      currentX = touch.clientX - startX;
      currentY = touch.clientY - startY;
      updateTransform();
    } else if (e.touches.length === 2) {
      // Two touches - pinch zoom
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      
      const currentDistance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const currentCenter = {
        x: (touch1.clientX + touch2.clientX) / 2,
        y: (touch1.clientY + touch2.clientY) / 2
      };
      
      if (lastTouchDistance > 0) {
        const zoomFactor = currentDistance / lastTouchDistance;
        const newZoom = Math.max(minZoom, Math.min(maxZoom, currentZoom * zoomFactor));
        
        if (newZoom !== currentZoom) {
          const rect = svgElement.getBoundingClientRect();
          const zoomCenterX = (currentCenter.x - rect.left - currentX) / currentZoom;
          const zoomCenterY = (currentCenter.y - rect.top - currentY) / currentZoom;
          
          currentZoom = newZoom;
          currentX = (currentCenter.x - rect.left) - zoomCenterX * currentZoom;
          currentY = (currentCenter.y - rect.top) - zoomCenterY * currentZoom;
          updateTransform();
        }
      }
      
      lastTouchDistance = currentDistance;
      lastTouchCenter = currentCenter;
    }
    e.preventDefault();
  });
  
  svgElement.addEventListener('touchend', function(e) {
    if (e.touches.length === 0) {
      isDragging = false;
      lastTouchDistance = 0;
    } else if (e.touches.length === 1) {
      // Switch back to panning mode
      isDragging = true;
      const touch = e.touches[0];
      startX = touch.clientX - currentX;
      startY = touch.clientY - currentY;
      lastTouchDistance = 0;
    }
    e.preventDefault();
  });
  
  // Button event listeners
  controlsDiv.querySelector('.zoom-in').addEventListener('click', zoomIn);
  controlsDiv.querySelector('.zoom-out').addEventListener('click', zoomOut);
  controlsDiv.querySelector('.zoom-reset').addEventListener('click', resetView);
  
  // Set initial cursor
  svgElement.style.cursor = 'grab';
  
  console.log('Zoom and pan functionality setup complete');
}

function setupInteractivity(svgElement) {
  if (!svgElement) {
    console.error('No SVG element provided');
    return;
  }
  
  console.log('Setting up map interactivity with zoom and pan...');
  
  // Add zoom and pan functionality
  setupZoomAndPan(svgElement);
  
  // Country names mapping (using the exact IDs from your SVG)
  const countryNames = {
    'AD': 'Andorra', 'AE': 'United Arab Emirates', 'AF': 'Afghanistan', 'AG': 'Antigua and Barbuda',
    'AI': 'Anguilla', 'AL': 'Albania', 'AM': 'Armenia', 'AO': 'Angola', 'AR': 'Argentina',
    'AU': 'Australia', 'AT': 'Austria', 'AZ': 'Azerbaijan', 'BA': 'Bosnia and Herzegovina',
    'BB': 'Barbados', 'BD': 'Bangladesh', 'BE': 'Belgium', 'BF': 'Burkina Faso', 'BG': 'Bulgaria',
    'BH': 'Bahrain', 'BI': 'Burundi', 'BJ': 'Benin', 'BN': 'Brunei', 'BO': 'Bolivia',
    'BR': 'Brazil', 'BS': 'Bahamas', 'BT': 'Bhutan', 'BW': 'Botswana', 'BY': 'Belarus',
    'BZ': 'Belize', 'CA': 'Canada', 'CD': 'Democratic Republic of the Congo', 'CF': 'Central African Republic',
    'CG': 'Republic of the Congo', 'CH': 'Switzerland', 'CI': 'Côte d\'Ivoire', 'CL': 'Chile',
    'CM': 'Cameroon', 'CN': 'China', 'CO': 'Colombia', 'CR': 'Costa Rica', 'CU': 'Cuba',
    'CV': 'Cape Verde', 'CY': 'Cyprus', 'CZ': 'Czech Republic', 'DE': 'Germany', 'DJ': 'Djibouti',
    'DK': 'Denmark', 'DM': 'Dominica', 'DO': 'Dominican Republic', 'DZ': 'Algeria', 'EC': 'Ecuador',
    'EE': 'Estonia', 'EG': 'Egypt', 'ER': 'Eritrea', 'ES': 'Spain', 'ET': 'Ethiopia',
    'FI': 'Finland', 'FJ': 'Fiji', 'FR': 'France', 'GA': 'Gabon', 'GB': 'United Kingdom',
    'GD': 'Grenada', 'GE': 'Georgia', 'GH': 'Ghana', 'GM': 'Gambia', 'GN': 'Guinea',
    'GQ': 'Equatorial Guinea', 'GR': 'Greece', 'GT': 'Guatemala', 'GW': 'Guinea-Bissau',
    'GY': 'Guyana', 'HN': 'Honduras', 'HR': 'Croatia', 'HT': 'Haiti', 'HU': 'Hungary',
    'ID': 'Indonesia', 'IE': 'Ireland', 'IL': 'Israel', 'IN': 'India', 'IQ': 'Iraq',
    'IR': 'Iran', 'IS': 'Iceland', 'IT': 'Italy', 'JM': 'Jamaica', 'JO': 'Jordan',
    'JP': 'Japan', 'KE': 'Kenya', 'KG': 'Kyrgyzstan', 'KH': 'Cambodia', 'KI': 'Kiribati',
    'KM': 'Comoros', 'KN': 'Saint Kitts and Nevis', 'KP': 'North Korea', 'KR': 'South Korea',
    'KW': 'Kuwait', 'KZ': 'Kazakhstan', 'LA': 'Laos', 'LB': 'Lebanon', 'LC': 'Saint Lucia',
    'LI': 'Liechtenstein', 'LK': 'Sri Lanka', 'LR': 'Liberia', 'LS': 'Lesotho', 'LT': 'Lithuania',
    'LU': 'Luxembourg', 'LV': 'Latvia', 'LY': 'Libya', 'MA': 'Morocco', 'MC': 'Monaco',
    'MD': 'Moldova', 'ME': 'Montenegro', 'MG': 'Madagascar', 'MK': 'North Macedonia', 'ML': 'Mali',
    'MM': 'Myanmar', 'MN': 'Mongolia', 'MR': 'Mauritania', 'MT': 'Malta', 'MU': 'Mauritius',
    'MV': 'Maldives', 'MW': 'Malawi', 'MX': 'Mexico', 'MY': 'Malaysia', 'MZ': 'Mozambique',
    'NA': 'Namibia', 'NE': 'Niger', 'NG': 'Nigeria', 'NI': 'Nicaragua', 'NL': 'Netherlands',
    'NO': 'Norway', 'NP': 'Nepal', 'NZ': 'New Zealand', 'OM': 'Oman', 'PA': 'Panama',
    'PE': 'Peru', 'PG': 'Papua New Guinea', 'PH': 'Philippines', 'PK': 'Pakistan', 'PL': 'Poland',
    'PT': 'Portugal', 'PY': 'Paraguay', 'QA': 'Qatar', 'RO': 'Romania', 'RS': 'Serbia',
    'RU': 'Russia', 'RW': 'Rwanda', 'SA': 'Saudi Arabia', 'SB': 'Solomon Islands', 'SC': 'Seychelles',
    'SD': 'Sudan', 'SE': 'Sweden', 'SG': 'Singapore', 'SI': 'Slovenia', 'SK': 'Slovakia',
    'SL': 'Sierra Leone', 'SM': 'San Marino', 'SN': 'Senegal', 'SO': 'Somalia', 'SR': 'Suriname',
    'SS': 'South Sudan', 'ST': 'São Tomé and Príncipe', 'SV': 'El Salvador', 'SY': 'Syria',
    'SZ': 'Eswatini', 'TD': 'Chad', 'TG': 'Togo', 'TH': 'Thailand', 'TJ': 'Tajikistan',
    'TL': 'Timor-Leste', 'TM': 'Turkmenistan', 'TN': 'Tunisia', 'TO': 'Tonga', 'TR': 'Turkey',
    'TT': 'Trinidad and Tobago', 'TV': 'Tuvalu', 'TZ': 'Tanzania', 'UA': 'Ukraine', 'UG': 'Uganda',
    'US': 'United States', 'UY': 'Uruguay', 'UZ': 'Uzbekistan', 'VA': 'Vatican City',
    'VC': 'Saint Vincent and the Grenadines', 'VE': 'Venezuela', 'VN': 'Vietnam', 'VU': 'Vanuatu',
    'WS': 'Samoa', 'YE': 'Yemen', 'ZA': 'South Africa', 'ZM': 'Zambia', 'ZW': 'Zimbabwe'
  };

  // Destinations with flights
  const destinations = {
    // Europe
    'FR': { name: 'Paris, France', price: 'From 750DT', code: 'CDG', description: 'The City of Light awaits with its iconic landmarks, world-class cuisine, and romantic atmosphere.' },
    'IT': { name: 'Rome, Italy', price: 'From 720DT', code: 'FCO', description: 'Eternal City with ancient history, stunning architecture, and incredible cuisine.' },
    'ES': { name: 'Barcelona, Spain', price: 'From 650DT', code: 'BCN', description: 'Vibrant city with unique architecture, beautiful beaches, and rich culture.' },
    'DE': { name: 'Berlin, Germany', price: 'From 680DT', code: 'BER', description: 'Historic capital with rich culture, museums, and vibrant nightlife.' },
    'GB': { name: 'London, UK', price: 'From 890DT', code: 'LHR', description: 'Explore the historic capital with royal palaces, world-class museums, and vibrant culture.' },
    'NL': { name: 'Amsterdam, Netherlands', price: 'From 780DT', code: 'AMS', description: 'Charming canals, world-class museums, and vibrant cultural scene.' },
    'BE': { name: 'Brussels, Belgium', price: 'From 720DT', code: 'BRU', description: 'European capital with stunning architecture and famous chocolates.' },
    'CH': { name: 'Zurich, Switzerland', price: 'From 850DT', code: 'ZUR', description: 'Alpine beauty meets cosmopolitan elegance in this Swiss gem.' },
    'AT': { name: 'Vienna, Austria', price: 'From 790DT', code: 'VIE', description: 'Imperial grandeur and classical music in the heart of Europe.' },
    'PT': { name: 'Lisbon, Portugal', price: 'From 680DT', code: 'LIS', description: 'Coastal charm with historic neighborhoods and vibrant culture.' },
    'GR': { name: 'Athens, Greece', price: 'From 620DT', code: 'ATH', description: 'Ancient history meets modern Mediterranean lifestyle.' },
    'NO': { name: 'Oslo, Norway', price: 'From 950DT', code: 'OSL', description: 'Scandinavian beauty with fjords and modern Nordic culture.' },
    'SE': { name: 'Stockholm, Sweden', price: 'From 920DT', code: 'ARN', description: 'Archipelago capital with stunning design and rich history.' },
    'DK': { name: 'Copenhagen, Denmark', price: 'From 880DT', code: 'CPH', description: 'Danish hygge and innovative design in this charming capital.' },
    'FI': { name: 'Helsinki, Finland', price: 'From 940DT', code: 'HEL', description: 'Nordic elegance with saunas, design, and northern lights.' },
    'PL': { name: 'Warsaw, Poland', price: 'From 750DT', code: 'WAW', description: 'Resilient capital with rich history and vibrant culture.' },
    'CZ': { name: 'Prague, Czech Republic', price: 'From 720DT', code: 'PRG', description: 'Fairy-tale architecture and famous Czech beer culture.' },
    'HU': { name: 'Budapest, Hungary', price: 'From 690DT', code: 'BUD', description: 'Thermal baths and stunning Danube River views.' },
    'RO': { name: 'Bucharest, Romania', price: 'From 650DT', code: 'OTP', description: 'Eastern European charm with rich cultural heritage.' },
    'BG': { name: 'Sofia, Bulgaria', price: 'From 620DT', code: 'SOF', description: 'Ancient history and mountain landscapes in the Balkans.' },
    'HR': { name: 'Zagreb, Croatia', price: 'From 680DT', code: 'ZAG', description: 'Adriatic gateway with stunning coastline and medieval towns.' },
    'RS': { name: 'Belgrade, Serbia', price: 'From 640DT', code: 'BEG', description: 'Vibrant nightlife and rich Balkan culture.' },
    'SI': { name: 'Ljubljana, Slovenia', price: 'From 720DT', code: 'LJU', description: 'Alpine beauty and charming medieval architecture.' },
    'SK': { name: 'Bratislava, Slovakia', price: 'From 710DT', code: 'BTS', description: 'Danube River charm and castle-topped hills.' },
    'IE': { name: 'Dublin, Ireland', price: 'From 820DT', code: 'DUB', description: 'Emerald Isle charm with friendly locals and rich literary heritage.' },
    'IS': { name: 'Reykjavik, Iceland', price: 'From 1150DT', code: 'KEF', description: 'Land of fire and ice with geysers and northern lights.' },
    'MT': { name: 'Valletta, Malta', price: 'From 480DT', code: 'MLA', description: 'Mediterranean jewel with ancient temples and crystal waters.' },
    'CY': { name: 'Nicosia, Cyprus', price: 'From 520DT', code: 'LCA', description: 'Island paradise with rich history and beautiful beaches.' },

    // Middle East & North Africa
    'AE': { name: 'Dubai, UAE', price: 'From 980DT', code: 'DXB', description: 'Experience luxury shopping, modern architecture, and desert adventures.' },
    'QA': { name: 'Doha, Qatar', price: 'From 1250DT', code: 'DOH', description: 'Modern Middle Eastern hub with luxury shopping, stunning architecture, and rich culture.' },
    'SA': { name: 'Riyadh, Saudi Arabia', price: 'From 1180DT', code: 'RUH', description: 'Kingdom\'s capital with modern developments and ancient heritage.' },
    'KW': { name: 'Kuwait City, Kuwait', price: 'From 1120DT', code: 'KWI', description: 'Gulf state with modern architecture and rich cultural traditions.' },
    'BH': { name: 'Manama, Bahrain', price: 'From 1090DT', code: 'BAH', description: 'Pearl of the Gulf with ancient history and modern finance.' },
    'OM': { name: 'Muscat, Oman', price: 'From 1200DT', code: 'MCT', description: 'Arabian Peninsula beauty with mountains, deserts, and coastline.' },
    'JO': { name: 'Amman, Jordan', price: 'From 680DT', code: 'AMM', description: 'Gateway to Petra and ancient Middle Eastern civilizations.' },
    'LB': { name: 'Beirut, Lebanon', price: 'From 620DT', code: 'BEY', description: 'Paris of the Middle East with rich culture and cuisine.' },
    'IL': { name: 'Tel Aviv, Israel', price: 'From 750DT', code: 'TLV', description: 'Mediterranean coast meets ancient history and modern innovation.' },
    'TR': { name: 'Istanbul, Turkey', price: 'From 580DT', code: 'IST', description: 'Bridge between Europe and Asia with rich history, culture, and cuisine.' },
    'IR': { name: 'Tehran, Iran', price: 'From 890DT', code: 'IKA', description: 'Persian heritage with stunning architecture and mountain landscapes.' },
    'EG': { name: 'Cairo, Egypt', price: 'From 520DT', code: 'CAI', description: 'Discover ancient pyramids, the Sphinx, and the mysteries of the pharaohs.' },
    'MA': { name: 'Marrakech, Morocco', price: 'From 450DT', code: 'RAK', description: 'Explore exotic markets, stunning palaces, and the gateway to the Sahara.' },
    'DZ': { name: 'Algiers, Algeria', price: 'From 380DT', code: 'ALG', description: 'North African charm with Mediterranean coastline and rich history.' },
    'LY': { name: 'Tripoli, Libya', price: 'From 320DT', code: 'TIP', description: 'Ancient Roman ruins and Mediterranean heritage.' },

    // Asia
    'JP': { name: 'Tokyo, Japan', price: 'From 1478DT', code: 'NRT', description: 'Discover Japan\'s capital with modern technology and ancient traditions perfectly blended.' },
    'KR': { name: 'Seoul, South Korea', price: 'From 1650DT', code: 'ICN', description: 'Experience K-culture, technology, and traditional Korean heritage in one amazing city.' },
    'CN': { name: 'Beijing, China', price: 'From 1350DT', code: 'PEK', description: 'Ancient capital with the Great Wall, Forbidden City, and modern marvels.' },
    'TH': { name: 'Bangkok, Thailand', price: 'From 1890DT', code: 'BKK', description: 'Experience Thailand\'s bustling capital with temples, street food, and vibrant nightlife.' },
    'MY': { name: 'Kuala Lumpur, Malaysia', price: 'From 2309DT', code: 'KUL', description: 'Experience the perfect blend of modern and traditional in Malaysia\'s vibrant capital.' },
    'ID': { name: 'Jakarta, Indonesia', price: 'From 1970DT', code: 'CGK', description: 'Immerse yourself in vibrant culture and delicious cuisine in Indonesia\'s capital.' },
    'IN': { name: 'Mumbai, India', price: 'From 3129DT', code: 'BOM', description: 'Experience the vibrant culture and Bollywood magic of India\'s financial capital.' },
    'SG': { name: 'Singapore', price: 'From 2180DT', code: 'SIN', description: 'Garden city with incredible food, shopping, and multicultural experiences.' },
    'PH': { name: 'Manila, Philippines', price: 'From 2450DT', code: 'MNL', description: 'Tropical archipelago with beautiful islands and warm hospitality.' },
    'VN': { name: 'Ho Chi Minh City, Vietnam', price: 'From 2120DT', code: 'SGN', description: 'Vibrant street life, delicious cuisine, and rich history.' },
    'KH': { name: 'Phnom Penh, Cambodia', price: 'From 2280DT', code: 'PNH', description: 'Ancient Khmer temples and Mekong River culture.' },
    'LA': { name: 'Vientiane, Laos', price: 'From 2350DT', code: 'VTE', description: 'Peaceful Buddhist temples and Mekong River charm.' },
    'MM': { name: 'Yangon, Myanmar', price: 'From 2420DT', code: 'RGN', description: 'Golden pagodas and traditional Southeast Asian culture.' },
    'BD': { name: 'Dhaka, Bangladesh', price: 'From 2890DT', code: 'DAC', description: 'Rich Bengali culture and vibrant river delta life.' },
    'LK': { name: 'Colombo, Sri Lanka', price: 'From 2650DT', code: 'CMB', description: 'Pearl of the Indian Ocean with tea plantations and beaches.' },
    'NP': { name: 'Kathmandu, Nepal', price: 'From 2780DT', code: 'KTM', description: 'Himalayan gateway with ancient temples and mountain adventures.' },
    'PK': { name: 'Karachi, Pakistan', price: 'From 2450DT', code: 'KHI', description: 'Cultural hub with rich history and Arabian Sea coastline.' },
    'AF': { name: 'Kabul, Afghanistan', price: 'From 1890DT', code: 'KBL', description: 'Historic Silk Road crossroads with mountain landscapes.' },
    'UZ': { name: 'Tashkent, Uzbekistan', price: 'From 1650DT', code: 'TAS', description: 'Silk Road heritage with stunning Islamic architecture.' },
    'KZ': { name: 'Almaty, Kazakhstan', price: 'From 1580DT', code: 'ALA', description: 'Central Asian beauty with mountains and nomadic culture.' },
    'KG': { name: 'Bishkek, Kyrgyzstan', price: 'From 1720DT', code: 'FRU', description: 'Tian Shan mountains and traditional nomadic heritage.' },
    'TJ': { name: 'Dushanbe, Tajikistan', price: 'From 1820DT', code: 'DYU', description: 'Pamir Mountains and Persian cultural influences.' },
    'TM': { name: 'Ashgabat, Turkmenistan', price: 'From 1750DT', code: 'ASB', description: 'Marble capital with desert landscapes and ancient history.' },

    // Americas
    'US': { name: 'New York, USA', price: 'From 1200DT', code: 'JFK', description: 'The city that never sleeps with iconic skylines, Broadway shows, and diverse culture.' },
    'CA': { name: 'Toronto, Canada', price: 'From 1350DT', code: 'YYZ', description: 'Multicultural metropolis with CN Tower and Niagara Falls nearby.' },
    'MX': { name: 'Mexico City, Mexico', price: 'From 1580DT', code: 'MEX', description: 'Aztec heritage meets modern Latin American culture and cuisine.' },
    'BR': { name: 'Rio de Janeiro, Brazil', price: 'From 1970DT', code: 'GIG', description: 'Experience the vibrant carnival culture, beautiful beaches, and Christ the Redeemer.' },
    'AR': { name: 'Buenos Aires, Argentina', price: 'From 2150DT', code: 'EZE', description: 'Tango capital with European elegance and South American passion.' },
    'CL': { name: 'Santiago, Chile', price: 'From 2280DT', code: 'SCL', description: 'Andes Mountains backdrop with world-class wine regions.' },
    'PE': { name: 'Lima, Peru', price: 'From 2180DT', code: 'LIM', description: 'Gateway to Machu Picchu with incredible Peruvian cuisine.' },
    'CO': { name: 'Bogotá, Colombia', price: 'From 1950DT', code: 'BOG', description: 'Andean capital with emeralds, coffee culture, and colonial charm.' },
    'VE': { name: 'Caracas, Venezuela', price: 'From 1890DT', code: 'CCS', description: 'Caribbean coast meets Andean mountains in this vibrant capital.' },
    'EC': { name: 'Quito, Ecuador', price: 'From 2050DT', code: 'UIO', description: 'Equatorial capital with colonial architecture and Galápagos gateway.' },
    'BO': { name: 'La Paz, Bolivia', price: 'From 2220DT', code: 'LPB', description: 'World\'s highest capital with indigenous culture and Andes views.' },
    'PY': { name: 'Asunción, Paraguay', price: 'From 2180DT', code: 'ASU', description: 'Heart of South America with Guaraní culture and river landscapes.' },
    'UY': { name: 'Montevideo, Uruguay', price: 'From 2250DT', code: 'MVD', description: 'Río de la Plata charm with beaches and European influences.' },

    // Africa
    'ZA': { name: 'Cape Town, South Africa', price: 'From 1850DT', code: 'CPT', description: 'Table Mountain beauty with wine regions and diverse culture.' },
    'KE': { name: 'Nairobi, Kenya', price: 'From 1450DT', code: 'NBO', description: 'Safari capital with incredible wildlife and Maasai culture.' },
    'ET': { name: 'Addis Ababa, Ethiopia', price: 'From 1280DT', code: 'ADD', description: 'Cradle of humanity with ancient history and coffee origins.' },
    'NG': { name: 'Lagos, Nigeria', price: 'From 1380DT', code: 'LOS', description: 'West African hub with vibrant culture and Nollywood cinema.' },
    'GH': { name: 'Accra, Ghana', price: 'From 1420DT', code: 'ACC', description: 'Gold Coast heritage with friendly culture and Atlantic beaches.' },
    'SN': { name: 'Dakar, Senegal', price: 'From 1180DT', code: 'DKR', description: 'Westernmost African capital with French colonial charm.' },
    'CI': { name: 'Abidjan, Côte d\'Ivoire', price: 'From 1250DT', code: 'ABJ', description: 'Economic hub with lagoons and cocoa plantation heritage.' },
    'CM': { name: 'Douala, Cameroon', price: 'From 1320DT', code: 'DLA', description: 'Central African gateway with diverse landscapes and cultures.' },
    'AO': { name: 'Luanda, Angola', price: 'From 1480DT', code: 'LAD', description: 'Atlantic coast capital with Portuguese colonial architecture.' },
    'TZ': { name: 'Dar es Salaam, Tanzania', price: 'From 1520DT', code: 'DAR', description: 'Swahili coast with Kilimanjaro and Serengeti nearby.' },
    'UG': { name: 'Kampala, Uganda', price: 'From 1450DT', code: 'EBB', description: 'Pearl of Africa with mountain gorillas and Lake Victoria.' },
    'RW': { name: 'Kigali, Rwanda', price: 'From 1420DT', code: 'KGL', description: 'Land of a thousand hills with remarkable recovery story.' },
    'ZM': { name: 'Lusaka, Zambia', price: 'From 1580DT', code: 'LUN', description: 'Victoria Falls gateway with copper mining heritage.' },
    'ZW': { name: 'Harare, Zimbabwe', price: 'From 1620DT', code: 'HRE', description: 'Great Zimbabwe ruins and stunning natural landscapes.' },
    'BW': { name: 'Gaborone, Botswana', price: 'From 1680DT', code: 'GBE', description: 'Kalahari Desert and Okavango Delta wildlife paradise.' },
    'NA': { name: 'Windhoek, Namibia', price: 'From 1750DT', code: 'WDH', description: 'Namib Desert landscapes and German colonial heritage.' },

    // Oceania
    'AU': { name: 'Sydney, Australia', price: 'From 3690DT', code: 'SYD', description: 'From the Great Barrier Reef to the Outback - adventure awaits in Australia.' },
    'NZ': { name: 'Auckland, New Zealand', price: 'From 4200DT', code: 'AKL', description: 'Land of the Long White Cloud with stunning landscapes and Maori culture.' },
    'FJ': { name: 'Suva, Fiji', price: 'From 4850DT', code: 'SUV', description: 'Tropical paradise with coral reefs and warm Fijian hospitality.' },

    // Indian Ocean Islands
    'MU': { name: 'Mauritius', price: 'From 1200DT', code: 'MRU', description: 'Tropical paradise with pristine beaches, luxury resorts, and crystal-clear lagoons.' },
    'SC': { name: 'Seychelles', price: 'From 1580DT', code: 'SEZ', description: 'Paradise on Earth with pristine beaches and crystal-clear waters.' },
    'MV': { name: 'Maldives', price: 'From 2180DT', code: 'MLE', description: 'Overwater bungalows and pristine coral atolls in the Indian Ocean.' },
    'MG': { name: 'Antananarivo, Madagascar', price: 'From 1680DT', code: 'TNR', description: 'Unique wildlife and baobab trees on the world\'s fourth-largest island.' },

    // Eastern Europe & Russia
    'RU': { name: 'Moscow, Russia', price: 'From 1180DT', code: 'SVO', description: 'Red Square grandeur with onion domes and rich imperial history.' },
    'UA': { name: 'Kyiv, Ukraine', price: 'From 850DT', code: 'KBP', description: 'Golden-domed churches and Dnieper River beauty.' },
    'BY': { name: 'Minsk, Belarus', price: 'From 820DT', code: 'MSQ', description: 'Soviet architecture meets European charm in this Eastern European capital.' },
    'LT': { name: 'Vilnius, Lithuania', price: 'From 780DT', code: 'VNO', description: 'Baltic charm with medieval old town and amber heritage.' },
    'LV': { name: 'Riga, Latvia', price: 'From 790DT', code: 'RIX', description: 'Art Nouveau architecture and Baltic Sea coastal beauty.' },
    'EE': { name: 'Tallinn, Estonia', price: 'From 820DT', code: 'TLL', description: 'Digital innovation meets medieval charm in this Baltic gem.' },

    // Central Asia
    'GE': { name: 'Tbilisi, Georgia', price: 'From 920DT', code: 'TBS', description: 'Caucasus Mountains wine country with ancient hospitality traditions.' },
    'AM': { name: 'Yerevan, Armenia', price: 'From 880DT', code: 'EVN', description: 'Ancient civilization with Mount Ararat views and brandy heritage.' },
    'AZ': { name: 'Baku, Azerbaijan', price: 'From 950DT', code: 'GYD', description: 'Caspian Sea oil capital with flame towers and ancient fire temples.' }
  };

  // Get ALL countries from your exact SVG
  const countries = svgElement.querySelectorAll('path[id]');
  console.log(`Found ${countries.length} countries in your SVG`);
  
  if (countries.length === 0) {
    console.error('No countries found in SVG');
    return;
  }
  
  countries.forEach((country, index) => {
    const countryId = country.id;
    const countryName = countryNames[countryId] || country.getAttribute('title') || countryId;
    const destination = destinations[countryId];
    
    // Style countries in BLUE (your exact SVG with blue colors)
    country.style.fill = destination ? '#4a7bc8' : '#6b9bd2';
    country.style.stroke = '#ffffff';
    country.style.strokeWidth = '0.5';
    country.style.cursor = 'pointer';
    country.style.transition = 'all 0.3s ease';
    
    // Add interactivity to ALL countries
    country.addEventListener('mouseenter', function() {
      if (!this.classList.contains('selected')) {
        this.style.fill = destination ? '#5a8bd4' : '#7babd4';
        this.style.strokeWidth = '1.5';
      }
    });
    
    country.addEventListener('mouseleave', function() {
      if (!this.classList.contains('selected')) {
        this.style.fill = destination ? '#4a7bc8' : '#6b9bd2';
        this.style.strokeWidth = '0.5';
      }
    });
    
    country.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log(`Clicked on ${countryName} (${countryId})`);
      
      // Remove selection from all countries
      countries.forEach(c => {
        c.classList.remove('selected');
        const cDestination = destinations[c.id];
        c.style.fill = cDestination ? '#4a7bc8' : '#6b9bd2';
        c.style.strokeWidth = '0.5';
      });
      
      // Select clicked country
      this.classList.add('selected');
      this.style.fill = '#f59e0b';
      this.style.strokeWidth = '2';
      
      // Update panel
      if (destination) {
        updateDestinationPanel(destination);
      } else {
        updateDestinationPanel({
          name: countryName,
          price: 'Coming Soon',
          code: countryId,
          description: `Flights to ${countryName} are not available yet. Stay tuned for future destinations!`
        });
      }
    });
    
    if (index < 10) {
      console.log(`Set up interactivity for ${countryName} (${countryId})`);
    }
  });

  // Set initial selection (Mauritius)
  setTimeout(() => {
    const mauritius = svgElement.querySelector('path[id="MU"]');
    if (mauritius && destinations['MU']) {
      console.log('Setting initial selection to Mauritius');
      mauritius.click();
    } else {
      console.log('Setting default destination');
      updateDestinationPanel({
        name: 'Select a destination',
        price: 'Click on a country',
        code: '',
        description: 'Choose a destination from the map to see details and book your flight.'
      });
    }
  }, 100);
  
  console.log('Map interactivity setup complete with your exact SVG!');
}

function updateDestinationPanel(destination) {
  const countryName = document.getElementById('countryName');
  const countryPrice = document.getElementById('countryPrice');
  const countryDescription = document.getElementById('countryDescription');
  const bookBtn = document.getElementById('bookBtn');

  if (countryName) countryName.textContent = destination.name;
  if (countryPrice) countryPrice.textContent = destination.price;
  if (countryDescription) countryDescription.textContent = destination.description;
  if (bookBtn) {
    if (destination.price === 'Coming Soon' || destination.price === 'Click on a country') {
      bookBtn.style.display = 'none';
    } else {
      bookBtn.href = `Book-Complete.html?destination=${destination.code}`;
      bookBtn.style.display = 'inline-block';
    }
  }
}

// Interactive Geometric World Map Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize real world map if on explore page
  console.log('DOM loaded, checking for world map...');
  const mapContainer = document.getElementById('worldMap');
  if (mapContainer) {
    console.log('World map container found, initializing...');
    initializeWorldMap();
  } else {
    console.log('No world map container found on this page');
  }
  
  const countries = document.querySelectorAll('.geo-country');
  const countryNameElement = document.getElementById('countryName');
  const destinationInfo = document.getElementById('destinationInfo');
  
  // Country data
  const countryData = {
    'Canada': { price: '1400', code: 'CAN', description: 'Discover the natural beauty of Canada with stunning landscapes and vibrant cities.' },
    'United States': { price: '1200', code: 'USA', description: 'Explore the land of opportunities with iconic cities like New York, Los Angeles, and Chicago.' },
    'Mexico': { price: '1100', code: 'MEX', description: 'Experience rich culture, ancient ruins, and beautiful beaches in Mexico.' },
    'Brazil': { price: '1970', code: 'BRA', description: 'Immerse yourself in vibrant culture and delicious cuisine in Brazil.' },
    'Argentina': { price: '2100', code: 'ARG', description: 'Discover the passion of tango and the beauty of Patagonia in Argentina.' },
    'Colombia': { price: '1800', code: 'COL', description: 'Experience the diversity of Colombia from Caribbean coasts to Andean mountains.' },
    'United Kingdom': { price: '890', code: 'GBR', description: 'Explore the historic capital of England with its iconic landmarks.' },
    'France': { price: '750', code: 'FRA', description: 'Experience the romance of Paris and the beauty of the French countryside.' },
    'Germany': { price: '680', code: 'DEU', description: 'Discover German efficiency, history, and beautiful castles.' },
    'Italy': { price: '720', code: 'ITA', description: 'Indulge in Italian cuisine, art, and the romance of ancient Rome.' },
    'Spain': { price: '650', code: 'ESP', description: 'Experience Spanish passion, flamenco, and stunning architecture.' },
    'Morocco': { price: '450', code: 'MAR', description: 'Explore the exotic markets and beautiful landscapes of Morocco.' },
    'Egypt': { price: '520', code: 'EGY', description: 'Discover ancient pyramids and the mysteries of the pharaohs.' },
    'Kenya': { price: '1200', code: 'KEN', description: 'Experience incredible wildlife safaris and African culture.' },
    'South Africa': { price: '1800', code: 'ZAF', description: 'Explore diverse landscapes from Cape Town to Kruger National Park.' },
    'Turkey': { price: '580', code: 'TUR', description: 'Bridge between Europe and Asia with rich history and culture.' },
    'United Arab Emirates': { price: '980', code: 'ARE', description: 'Experience luxury and modern architecture in Dubai and Abu Dhabi.' },
    'Qatar': { price: '1250', code: 'QAT', description: 'Modern Middle Eastern hub with luxury shopping and culture.' },
    'Russia': { price: '1600', code: 'RUS', description: 'Explore the vast landscapes and rich culture of Russia.' },
    'China': { price: '1350', code: 'CHN', description: 'Discover ancient traditions and modern marvels in China.' },
    'India': { price: '3129', code: 'IND', description: 'India\'s financial capital with Bollywood glamour and rich culture.' },
    'Japan': { price: '1478', code: 'JPN', description: 'Discover Japan\'s capital with modern technology and ancient traditions.' },
    'Thailand': { price: '1890', code: 'THA', description: 'Experience tropical paradise with beautiful temples and beaches.' },
    'Malaysia': { price: '2309', code: 'MYS', description: 'Experience the perfect blend of modern and traditional in Malaysia\'s vibrant capital.' },
    'Indonesia': { price: '1970', code: 'IDN', description: 'Immerse yourself in vibrant culture and delicious cuisine in Indonesia\'s capital.' },
    'Australia': { price: '3690', code: 'AUS', description: 'From the Great Barrier Reef to the Outback - adventure awaits.' },
    'New Zealand': { price: '4200', code: 'NZL', description: 'Experience breathtaking landscapes and adventure sports.' },
    'Mauritius': { price: '1200', code: 'MUS', description: 'Tropical paradise with pristine beaches and luxury resorts.' },
    'Seychelles': { price: '1580', code: 'SYC', description: 'Paradise on Earth with pristine beaches and crystal-clear waters.' }
  };
  
  // Add click event listeners to all countries
  countries.forEach(country => {
    country.addEventListener('click', function() {
      const countryName = this.getAttribute('data-country');
      const data = countryData[countryName];
      
      if (data) {
        // Remove selected class from all countries
        countries.forEach(c => c.classList.remove('selected'));
        
        // Add selected class to clicked country
        this.classList.add('selected');
        
        // Update country name
        countryNameElement.textContent = countryName;
        
        // Update destination panel with country info
        destinationInfo.innerHTML = `
          <div class="country-name">${countryName}</div>
          <div class="country-info active">
            <div class="country-price">From ${data.price}DT</div>
            <p class="country-description">${data.description}</p>
            <a href="Book-Complete.html?destination=${data.code}" class="book-country-btn">
              Book Now <i class="ri-arrow-right-line"></i>
            </a>
          </div>
        `;
      }
    });
    
    // Add hover effects
    country.addEventListener('mouseenter', function() {
      if (!this.classList.contains('selected')) {
        this.classList.add('highlighted');
      }
    });
    
    country.addEventListener('mouseleave', function() {
      this.classList.remove('highlighted');
    });
  });
});
// PDF Generation and Email Functionality
function generateBookingPDF(bookingData) {
  // Create PDF content
  const pdfContent = `
    SAYADIAIRWAYS - BOOKING CONFIRMATION
    ====================================
    
    Booking Reference: ${bookingData.reference || 'SA' + Date.now()}
    Date: ${new Date().toLocaleDateString()}
    
    PASSENGER DETAILS:
    Name: ${bookingData.passengerName || 'Passenger Name'}
    Email: ${bookingData.email || 'passenger@email.com'}
    Phone: ${bookingData.phone || '+216 XX XXX XXX'}
    
    FLIGHT DETAILS:
    From: ${bookingData.from || 'Departure City'}
    To: ${bookingData.to || 'Destination City'}
    Date: ${bookingData.departure || 'Departure Date'}
    Passengers: ${bookingData.passengers || '1 Adult, Economy'}
    
    BOOKING STATUS: CONFIRMED
    
    Thank you for choosing SayadiAirways!
    For support: +216 71 XXX XXX
  `;
  
  // Create downloadable PDF (simplified version)
  const blob = new Blob([pdfContent], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SayadiAirways_Booking_${bookingData.reference || Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

function sendBookingEmail(bookingData) {
  // Simulate email sending
  const emailContent = {
    to: bookingData.email,
    subject: 'SayadiAirways - Booking Confirmation',
    body: `
      Dear ${bookingData.passengerName},
      
      Your booking has been confirmed!
      
      Booking Reference: ${bookingData.reference}
      Flight: ${bookingData.from} → ${bookingData.to}
      Date: ${bookingData.departure}
      
      Thank you for choosing SayadiAirways.
      
      Best regards,
      SayadiAirways Team
    `
  };
  
  console.log('Email sent:', emailContent);
  alert('Booking confirmation sent to your email!');
}
// Enhanced booking functionality with PDF and email
document.addEventListener('DOMContentLoaded', function() {
  // Booking completion handler
  const completeBookingBtn = document.getElementById('completeBooking');
  if (completeBookingBtn) {
    completeBookingBtn.addEventListener('click', function() {
      const bookingData = {
        reference: 'SA' + Date.now(),
        passengerName: document.querySelector('[name="firstName"]')?.value + ' ' + 
                      document.querySelector('[name="lastName"]')?.value,
        email: document.querySelector('[name="email"]')?.value,
        phone: document.querySelector('[name="phone"]')?.value,
        from: document.querySelector('[name="from"]')?.value,
        to: document.querySelector('[name="to"]')?.value,
        departure: document.querySelector('[name="departure"]')?.value,
        passengers: document.querySelector('[name="passengers"]')?.value
      };
      
      // Generate PDF and send email
      generateBookingPDF(bookingData);
      sendBookingEmail(bookingData);
      
      // Show success message
      showBookingSuccess(bookingData);
    });
  }
});

function showBookingSuccess(bookingData) {
  const successModal = `
    <div class="booking-success-modal" id="successModal">
      <div class="modal-content">
        <div class="success-header">
          <i class="ri-checkbox-circle-fill"></i>
          <h2>Booking Confirmed!</h2>
        </div>
        <div class="success-body">
          <p>Your flight has been successfully booked.</p>
          <div class="booking-ref">
            <strong>Booking Reference: ${bookingData.reference}</strong>
          </div>
          <div class="success-actions">
            <button onclick="generateBookingPDF(${JSON.stringify(bookingData)})" class="btn btn-primary">
              <i class="ri-download-line"></i> Download PDF
            </button>
            <button onclick="sendBookingEmail(${JSON.stringify(bookingData)})" class="btn btn-outline-primary">
              <i class="ri-mail-line"></i> Email Ticket
            </button>
          </div>
        </div>
        <button class="close-modal" onclick="closeSuccessModal()">×</button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', successModal);
}

function closeSuccessModal() {
  const modal = document.getElementById('successModal');
  if (modal) modal.remove();
}