// ---------------- Initialize Lucide icons ----------------
lucide.createIcons();

// ---------------- Mobile Menu Functionality ----------------
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
  isMenuOpen = !isMenuOpen;
  
  // Update menu icon
  const menuIcon = menuBtn.querySelector('i');
  menuIcon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
  lucide.createIcons();
  
  // Toggle mobile menu
  mobileMenu.style.display = isMenuOpen ? 'block' : 'none';
});

// ---------------- Search Functionality with Suggestions ----------------
const locations = [
  { name: "Library", link: "library.html" },
  { name: "North Block", link: "NB.html" },
  { name: "Gateway Building", link: "gatewaybuilding.html" },
  { name: "Reception", link: "reception.html" },
  { name: "Kalpana Chawla Hostel", link: "kch.html" },
  { name: "APJ Abdul Kalam Hostel", link: "apj.html" },
  { name: "Gargi Hostel", link: "Gargi.html" },
  { name: "Bhagat Singh Hostel", link: "bsh.html" },
  { name: "Wellness Centre", link: "wellness.html" },
  { name: "Medical Room", link: "medical.html" },
  { name: "Emergency Gathering Area", link: "emergency.html" },
  { name: "Mail Room", link: "mailroom.html" },
  { name: "Gym", link: "gym.html" },
  { name: "E2 Cafeteria", link: "e2.html" },
  { name: "Q Cafe", link: "Q-cafe.html" },
  { name: "Smoothie Point", link: "smoothie.html" },
  { name: "Maggi Point", link: "maggie.html" },
  { name: "Dominos", link: "dominos.html" },
  { name: "Cafe Coffee Day", link: "xpress.html" },
  { name: "Burger Singh", link: "burger.html" },
  { name: "Tuckshop (KCH)", link: "tuckshop.html" },
  { name: "AVS Tuckshop (BSH)", link: "tuckshopbsh.html" },
  { name: "Mess (D cafe)", link: "D-cafe.html" },
  { name: "Mess (Tower Mess)", link: "towermess.html" },
  { name: "Auditorium", link: "auditorium.html" },
  { name: "MPH (Multi-Purpose Hall)", link: "MPH.html" },
  { name: "Pond Area", link: "PondArea.html" }
];

const searchInput = document.querySelector('.search-box input');
const searchBtn = document.querySelector('.search-btn');

// Create suggestion box
const suggestionBox = document.createElement('div');
suggestionBox.className = 'suggestion-box';
Object.assign(suggestionBox.style, {
  position: 'absolute',
  background: '#fff',
  border: '1px solid #ccc',
  width: '100%',
  maxHeight: '250px',
  overflowY: 'auto',
  display: 'none',
  zIndex: '999',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  borderRadius: '8px',
  padding: '10px 0', // <-- Increased padding here (was 5px 0 before)
  marginTop: '5px', // <-- Added this to give space below input
});

searchInput.parentNode.appendChild(suggestionBox);

// Handle search input
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  suggestionBox.innerHTML = '';

  if (query) {
    const startsWithMatches = locations.filter(loc =>
      loc.name.toLowerCase().startsWith(query)
    );
    const containsMatches = locations.filter(loc =>
      !loc.name.toLowerCase().startsWith(query) &&
      loc.name.toLowerCase().includes(query)
    );

    const matchedLocations = [...startsWithMatches, ...containsMatches];

    matchedLocations.forEach(loc => {
      const option = document.createElement('div');
      option.textContent = loc.name;
      Object.assign(option.style, {
        padding: '10px 15px',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#333'
      });
      option.addEventListener('mouseover', () => option.style.background = '#f0f0f0');
      option.addEventListener('mouseout', () => option.style.background = '#fff');
      option.addEventListener('click', () => window.location.href = loc.link);
      suggestionBox.appendChild(option);
    });

    suggestionBox.style.display = matchedLocations.length ? 'block' : 'none';
  } else {
    suggestionBox.style.display = 'none';
  }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
    suggestionBox.style.display = 'none';
  }
});

// Search button click
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    // Handle search - can be implemented based on requirements
    performSearch();
  }
});

// Handle search on enter key
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
      performSearch();
    }
  }
});

// Perform search
function performSearch() {
  const query = searchInput.value.trim().toLowerCase();
  const location = locations.find(loc => loc.name.toLowerCase() === query);
  if (location) {
    window.location.href = location.link;
  } else {
    alert("Location not found. Please try again!");
  }
}

// Map Modal functionality
const mapModal = document.getElementById('map-modal');
const mapLink = document.getElementById('campus-map-link');
const closeMapBtn = document.querySelector('.close');

mapLink.addEventListener('click', (e) => {
  e.preventDefault();
  mapModal.style.display = 'block';
});

closeMapBtn.addEventListener('click', () => {
  mapModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target === mapModal) {
    mapModal.style.display = 'none';
  }
});

// Locations dropdown functionality
const locationsLink = document.getElementById('locations-link');
const locationsDropdown = document.getElementById('locations-dropdown');
let isLocationsOpen = false;

locationsLink.addEventListener('click', (e) => {
  e.preventDefault();
  isLocationsOpen = !isLocationsOpen;
  
  if (isLocationsOpen) {
    const linkRect = locationsLink.getBoundingClientRect();
    locationsDropdown.style.top = `${linkRect.bottom + window.scrollY}px`;
    locationsDropdown.style.left = `${linkRect.left}px`;
    locationsDropdown.style.display = 'block';
  } else {
    locationsDropdown.style.display = 'none';
  }
});

// Close locations dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!locationsLink.contains(e.target) && !locationsDropdown.contains(e.target)) {
    locationsDropdown.style.display = 'none';
    isLocationsOpen = false;
  }
});

// Responsive navigation
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    mobileMenu.style.display = 'none';
    isMenuOpen = false;
    const menuIcon = menuBtn.querySelector('i');
    menuIcon.setAttribute('data-lucide', 'menu');
    lucide.createIcons();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const contactUsButtons = document.querySelectorAll('.sign-in-btn');
  
  // Create popup
  const contactPopup = document.createElement('div');
  contactPopup.id = 'contact-popup';
  contactPopup.innerHTML = `
    <h3>Contact Us</h3>
    <p>E-mail us your queries</p>
    <p><a href="https://mail.google.com/mail/?view=cm&fs=1&to=zephyrbmu@gmail.com"><i class='fas fa-envelope'></i> zephyrbmu@gmail.com</p></a>
    <button id='close-popup'>Close</button>
  `;
  document.body.appendChild(contactPopup);

  // Show/Hide popup
  function togglePopup(button) {
    const rect = button.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (contactPopup.style.display === 'block') {
      hidePopup();
    } else {
      contactPopup.style.position = 'absolute';
      contactPopup.style.top = (rect.bottom + scrollTop + 10) + 'px';
      contactPopup.style.left = (rect.left) + 'px';
      contactPopup.style.display = 'block';
    }
  }

  // Hide popup
  function hidePopup() {
    contactPopup.style.display = 'none';
  }

  // Event listeners
  contactUsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      togglePopup(button);
    });
  });

  document.getElementById('close-popup').addEventListener('click', hidePopup);

  // Close popup when clicking outside
  document.addEventListener('click', (e) => {
    if (!contactPopup.contains(e.target) && 
        !Array.from(contactUsButtons).some(button => button.contains(e.target))) {
      hidePopup();
    }
  });
});

document.getElementById("search-button").addEventListener("click", function () {
  const input = document.getElementById("search-bar").value.toLowerCase().trim();

  const pages = {
    "emergency": "emergency.html",
    "canteen": "canteens.html",
    "canteens": "canteens.html",
    "food court": "canteens.html",
    "library": "library.html",
    "labs": "labs.html",
    "hostel": "hostel.html",
    "sports": "sports.html",
    "admin": "admin.html",
    "parking": "parking.html"
  };

  if (pages[input]) {
    window.location.href = pages[input];
  } else {
    alert("No results found. Try searching for places like 'library', 'canteen', or 'emergency'.");
  }
});

// Google Maps initialization
let map;
let markers = [];

// Campus locations with coordinates - Updated with exact locations based on new center
const campusLocations = [
  { name: "Library", position: { lat: 28.2475, lng: 76.8142 }, link: "library.html" },
  { name: "North Block", position: { lat: 28.2483, lng: 76.8130 }, link: "NB.html" },
  { name: "Gateway Building", position: { lat: 28.2478, lng: 76.8138 }, link: "gatewaybuilding.html" },
  { name: "Reception", position: { lat: 28.2474, lng: 76.8126 }, link: "reception.html" },
  { name: "E2 Cafeteria", position: { lat: 28.24742761709504, lng: 76.81320690644608 }, link: "e2.html" },
  { name: "DELICIOUS Cafeteria", position: { lat: 28.2462, lng: 76.8161 }, link: "D-cafe.html" },
  { name: "Admin BMU", position: { lat: 28.2474, lng: 76.8175 }, link: "reception.html" },
  { name: "BMU Recreation Park", position: { lat: 28.2468, lng: 76.8195 }, link: "PondArea.html" },
  { name: "BMU Playground", position: { lat: 28.2487, lng: 76.8185 }, link: "MPH.html" },
  { name: "Tennis Court", position: { lat: 28.2493, lng: 76.8195 }, link: "MPH.html" },
  { name: "Kalpana Chawla Hostel", position: { lat: 28.2465, lng: 76.8140 }, link: "kch.html" },
  { name: "APJ Abdul Kalam Hostel", position: { lat: 28.2462, lng: 76.8145 }, link: "apj.html" },
  { name: "Gargi Hostel", position: { lat: 28.2468, lng: 76.8149 }, link: "Gargi.html" },
  { name: "Bhagat Singh Hostel", position: { lat: 28.2460, lng: 76.8135 }, link: "bsh.html" },
  { name: "Q Cafe", position: { lat: 28.2479, lng: 76.8137 }, link: "Q-cafe.html" },
  { name: "Smoothie Point", position: { lat: 28.2477, lng: 76.8128 }, link: "smoothie.html" },
  { name: "Maggi Point", position: { lat: 28.2480, lng: 76.8132 }, link: "maggie.html" },
  { name: "Dominos", position: { lat: 28.2473, lng: 76.8135 }, link: "dominos.html" },
  { name: "Burger Singh", position: { lat: 28.2472, lng: 76.8130 }, link: "burger.html" },
  { name: "Auditorium", position: { lat: 28.2483, lng: 76.8144 }, link: "auditorium.html" },
  { name: "MPH (Multi-Purpose Hall)", position: { lat: 28.2487, lng: 76.8140 }, link: "MPH.html" }
];

// Initialize the map
function initMap() {
  // BMU Campus center coordinates - adjusted to match screenshot
  const bmuCenter = { lat: 28.2469, lng: 76.8166 };
  // E2 Cafeteria coordinates
  const e2CafeteriaCoords = { lat: 28.24742761709504, lng: 76.81320690644608 };
  
  // Create map centered on BMU
  map = new google.maps.Map(document.getElementById("google-map"), {
    zoom: 17.5,
    center: bmuCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_LEFT,
      mapTypeIds: [
        google.maps.MapTypeId.ROADMAP,
        google.maps.MapTypeId.SATELLITE,
        google.maps.MapTypeId.HYBRID
      ]
    },
    streetViewControl: true,
    fullscreenControl: true,
    gestureHandling: 'greedy',
    styles: [
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
          { "visibility": "on" }
        ]
      }
    ]
  });
  
  // BMU campus marker with info window
  const mainMarker = new google.maps.Marker({
    position: bmuCenter,
    map: map,
    title: "BML Munjal University",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      scaledSize: new google.maps.Size(40, 40)
    }
  });
  
  const mainInfoWindow = new google.maps.InfoWindow({
    content: `<div style="width:250px;">
                <h3 style="margin:0;color:#1a3668;">BML Munjal University</h3>
                <p style="margin:5px 0;font-size:13px;">67th KM Milestone, NH-48, Sidhrawli, Gurugram, Haryana 122413</p>
                <p style="margin:5px 0;font-size:13px;"><b>Phone:</b> 1800-103-6888</p>
                <p style="margin:5px 0;font-size:13px;"><b>Email:</b> info@bmu.edu.in</p>
                <a href="https://www.bmu.edu.in/" target="_blank" style="color:#1a73e8;text-decoration:none;font-size:13px;">Visit Website</a>
              </div>`
  });
  
  mainMarker.addListener("click", () => {
    mainInfoWindow.open(map, mainMarker);
  });
  
  // Add markers for all locations
  let e2CafeteriaMarker = null;
  
  campusLocations.forEach(location => {
    // Use a special icon for E2 Cafeteria and DELICIOUS Cafeteria
    const isE2Cafeteria = location.name === "E2 Cafeteria";
    const isDeliciousCafeteria = location.name === "DELICIOUS Cafeteria";
    
    let markerIcon = undefined;
    if (isE2Cafeteria) {
      markerIcon = {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new google.maps.Size(48, 48),
        labelOrigin: new google.maps.Point(24, 60)
      };
    } else if (isDeliciousCafeteria) {
      markerIcon = {
        url: "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
        scaledSize: new google.maps.Size(42, 42)
      };
    }
    
    const marker = new google.maps.Marker({
      position: location.position,
      map: map,
      title: location.name,
      animation: google.maps.Animation.DROP,
      icon: markerIcon,
      label: isE2Cafeteria ? {
        text: "E2 CAFETERIA",
        color: "#d32f2f",
        fontWeight: "bold",
        fontSize: "14px"
      } : null
    });
    
    if (isE2Cafeteria) {
      e2CafeteriaMarker = marker;
    }
    
    markers.push(marker);
    
    // Create info window content with special styling for cafeterias
    let infoContent = '';
    if (isE2Cafeteria) {
      infoContent = `<div style="width:220px;">
                      <h3 style="margin:0;color:#d32f2f;font-size:16px;border-bottom:2px solid #d32f2f;padding-bottom:5px;">
                        ${location.name}
                      </h3>
                      <p style="margin:8px 0;font-size:13px;">
                        <b>Location:</b> Near North Block
                      </p>
                      <p style="margin:5px 0;font-size:13px;">
                        <b>Open:</b> 8:00 AM - 8:00 PM
                      </p>
                      <p style="margin:5px 0;font-size:13px;">
                        <b>Offerings:</b> Snacks, Meals, Beverages
                      </p>
                      <a href="${location.link}" style="display:inline-block;margin-top:8px;color:#d32f2f;text-decoration:none;font-weight:bold;">
                        View Details →
                      </a>
                    </div>`;
    } else if (isDeliciousCafeteria) {
      infoContent = `<div style="width:220px;">
                      <h3 style="margin:0;color:#ff8c00;font-size:16px;border-bottom:2px solid #ff8c00;padding-bottom:5px;">
                        ${location.name}
                      </h3>
                      <p style="margin:8px 0;font-size:13px;">
                        <b>Location:</b> Near Recreation Park
                      </p>
                      <p style="margin:5px 0;font-size:13px;">
                        <b>Open:</b> 7:30 AM - 10:00 PM
                      </p>
                      <p style="margin:5px 0;font-size:13px;">
                        <b>Offerings:</b> Full Meals, South Indian, North Indian
                      </p>
                      <a href="${location.link}" style="display:inline-block;margin-top:8px;color:#ff8c00;text-decoration:none;font-weight:bold;">
                        View Details →
                      </a>
                    </div>`;
    } else {
      infoContent = `<div style="width:180px;">
                      <h3 style="margin:0;">${location.name}</h3>
                      <a href="${location.link}" style="display:inline-block;margin-top:5px;color:#1a73e8;text-decoration:none;">View Details</a>
                    </div>`;
    }
    
    const infoWindow = new google.maps.InfoWindow({
      content: infoContent
    });
    
    // Add click event for marker
    marker.addListener("click", () => {
      // Close all open info windows
      markers.forEach(m => {
        if (m.infoWindow && m.infoWindow.getMap()) {
          m.infoWindow.close();
        }
      });
      
      // Open this marker's info window
      infoWindow.open(map, marker);
      marker.infoWindow = infoWindow;
      
      // Bounce animation when clicked
      marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        marker.setAnimation(null);
      }, 1500);
    });
  });

  // Function to focus on E2 Cafeteria
  window.focusOnE2Cafeteria = function() {
    if (map && e2CafeteriaMarker) {
      map.setCenter(e2CafeteriaCoords);
      map.setZoom(18);
      
      // Trigger the marker click to show info window
      google.maps.event.trigger(e2CafeteriaMarker, 'click');
      
      // Add a highlight effect
      e2CafeteriaMarker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(() => {
        e2CafeteriaMarker.setAnimation(null);
      }, 2500);
    }
  };
  
  // Add a button to focus on E2 Cafeteria
  const mapControlDiv = document.createElement('div');
  
  const controlButton = document.createElement('button');
  controlButton.style.backgroundColor = '#fff';
  controlButton.style.border = '2px solid #d32f2f';
  controlButton.style.borderRadius = '3px';
  controlButton.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
  controlButton.style.color = '#d32f2f';
  controlButton.style.cursor = 'pointer';
  controlButton.style.fontFamily = 'Roboto,Arial,sans-serif';
  controlButton.style.fontSize = '14px';
  controlButton.style.lineHeight = '38px';
  controlButton.style.margin = '8px 0 22px';
  controlButton.style.padding = '0 5px';
  controlButton.style.textAlign = 'center';
  controlButton.textContent = 'Show E2 Cafeteria';
  controlButton.title = 'Click to center the map on E2 Cafeteria';
  controlButton.type = 'button';
  
  controlButton.addEventListener('click', function() {
    window.focusOnE2Cafeteria();
  });
  
  mapControlDiv.appendChild(controlButton);
  
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(mapControlDiv);

  // Add event listener for when the map is fully loaded
  google.maps.event.addListenerOnce(map, 'idle', function() {
    // Force recenter after map is loaded
    map.setCenter(bmuCenter);
    
    // Add a slight delay to ensure markers appear correctly
    setTimeout(() => {
      // Refresh the map view
      google.maps.event.trigger(map, 'resize');
      
      // Focus on E2 Cafeteria by default
      window.focusOnE2Cafeteria();
    }, 500);
  });
}

// Update map modal functionality
mapLink.addEventListener('click', (e) => {
  e.preventDefault();
  mapModal.style.display = 'block';
  
  // Trigger resize event after modal is shown to ensure map renders correctly
  setTimeout(() => {
    google.maps.event.trigger(map, 'resize');
    map.setCenter({ lat: 28.2469, lng: 76.8166 });
    
    // Add e2 cafeteria focus button to the modal
    const e2FocusButton = document.createElement('button');
    e2FocusButton.textContent = 'Focus on E2 Cafeteria';
    e2FocusButton.style.position = 'absolute';
    e2FocusButton.style.bottom = '30px';
    e2FocusButton.style.right = '30px';
    e2FocusButton.style.padding = '8px 16px';
    e2FocusButton.style.backgroundColor = '#d32f2f';
    e2FocusButton.style.color = 'white';
    e2FocusButton.style.border = 'none';
    e2FocusButton.style.borderRadius = '4px';
    e2FocusButton.style.cursor = 'pointer';
    e2FocusButton.style.zIndex = '1000';
    
    e2FocusButton.addEventListener('click', function() {
      window.focusOnE2Cafeteria();
    });
    
    // Check if button already exists
    const existingButton = document.getElementById('e2-focus-button');
    if (!existingButton) {
      e2FocusButton.id = 'e2-focus-button';
      document.querySelector('.modal-content').appendChild(e2FocusButton);
    }
  }, 100);
});
