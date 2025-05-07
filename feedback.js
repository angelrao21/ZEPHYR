// Function to handle form submission and send to Google Sheets
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value || 'Not provided',
        feedback: document.getElementById('feedback').value,
        source: document.getElementById('find').value || 'Not specified',
        timestamp: new Date().toLocaleString()
    };
    
    // The URL for the Google Apps Script web app
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzUvecs3dbw9Jo80kf98negL_pRDaoXMxQ8hE4BIhUSChDhtlWfzKis33n0W8316PVL/exec';
    
    // Convert form data to URL parameters
    const urlParams = new URLSearchParams();
    Object.keys(formData).forEach(key => {
        urlParams.append(key, formData[key]);
    });
    
    // Send data to Google Sheets via the web app
    fetch(scriptURL + '?' + urlParams.toString(), {
        method: 'GET',
        mode: 'no-cors',
    })
    .then(() => {
        // Show success message with animation
        const formSection = document.querySelector('.form-section');
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Thank You!</h3>
            <p>Your feedback has been submitted successfully.</p>
        `;
        
        // Add success message to the form
        this.style.display = 'none';
        formSection.appendChild(successMessage);
        
        // Restore form after 5 seconds
        setTimeout(() => {
            this.reset();
            this.style.display = 'flex';
            formSection.removeChild(successMessage);
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }, 5000);
        
        // Also save to local storage as backup
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push(formData);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        
        // Show error message
        submitButton.innerHTML = 'Error! Try Again';
        submitButton.classList.add('error');
        
        setTimeout(() => {
            submitButton.innerHTML = originalButtonText;
            submitButton.classList.remove('error');
            submitButton.disabled = false;
        }, 3000);
        
        // Save to local storage as fallback
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push(formData);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    });
});

// Admin functionality (triggered with Ctrl+Shift+Z)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
        const adminPanel = document.getElementById('adminPanel') || createAdminPanel();
        adminPanel.style.display = adminPanel.style.display === 'none' ? 'block' : 'none';
    }
});

// Function to create admin panel
function createAdminPanel() {
    const panel = document.createElement('div');
    panel.id = 'adminPanel';
    panel.className = 'admin-panel';
    
    panel.innerHTML = `
        <div class="admin-header">
            <h3>Admin Panel</h3>
            <button onclick="this.parentElement.parentElement.style.display='none'">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="admin-body">
            <div class="admin-section">
                <h4>Google Sheets Setup</h4>
                <p>Current status: <span id="connectionStatus">Not configured</span></p>
                <button onclick="checkConnection()" class="admin-btn">Test Connection</button>
                <button onclick="configureSheet()" class="admin-btn">Configure</button>
            </div>
            <div class="admin-section">
                <h4>Local Data</h4>
                <p><span id="localCount">0</span> entries stored locally</p>
                <button onclick="downloadAsExcel()" class="admin-btn">Download as CSV</button>
                <button onclick="clearLocalData()" class="admin-btn warning">Clear Local Data</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(panel);
    updateLocalCount();
    return panel;
}

// Function to check the count of local entries
function updateLocalCount() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    const localCount = document.getElementById('localCount');
    if (localCount) {
        localCount.textContent = feedbacks.length;
    }
    
    // Update download button visibility
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.style.display = feedbacks.length > 0 ? 'block' : 'none';
    }
}

// Function to download feedback as Excel (CSV format)
function downloadAsExcel() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');

    if (feedbacks.length === 0) {
        alert('No feedback available to download.');
        return;
    }

    // Create CSV content
    let csvContent = "Name,Email,Feedback,How did you find us,Timestamp\n";
    feedbacks.forEach(feedback => {
        // Escape commas in fields
        const escapedFeedback = feedback.feedback.replace(/,/g, ' ');
        csvContent += `${feedback.name},${feedback.email},${escapedFeedback},${feedback.source},${feedback.timestamp}\n`;
    });

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "feedback_data.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to clear local data
function clearLocalData() {
    if (confirm('Are you sure you want to clear all locally stored feedback? This cannot be undone.')) {
        localStorage.removeItem('feedbacks');
        updateLocalCount();
        alert('Local data cleared successfully.');
    }
}

// Function to check Google Sheets connection
function checkConnection() {
    const connectionStatus = document.getElementById('connectionStatus');
    connectionStatus.textContent = 'Checking...';
    
    const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL';
    
    fetch(scriptURL + '?action=test', {
        method: 'GET',
        mode: 'no-cors',
    })
    .then(() => {
        connectionStatus.textContent = 'Connected';
        connectionStatus.className = 'connected';
    })
    .catch(() => {
        connectionStatus.textContent = 'Connection Failed';
        connectionStatus.className = 'disconnected';
    });
}

// Function to help configure Google Sheet
function configureSheet() {
    const modal = document.createElement('div');
    modal.className = 'config-modal';
    
    modal.innerHTML = `
        <div class="config-content">
            <h3>Google Sheets Configuration</h3>
            <ol>
                <li>Go to <a href="https://script.google.com" target="_blank">Google Apps Script</a></li>
                <li>Create a new project</li>
                <li>Copy and paste the Apps Script code provided below</li>
                <li>Save the project and click on "Deploy" > "New deployment"</li>
                <li>Select "Web app" as the deployment type</li>
                <li>Set "Who has access" to "Anyone"</li>
                <li>Click "Deploy" and copy the web app URL</li>
                <li>Replace 'YOUR_GOOGLE_SCRIPT_URL' in the feedback.js file with your URL</li>
            </ol>
            
            <div class="code-container">
                <pre><code>
function doGet(e) {
  // Test connection if requested
  if (e.parameter.action === 'test') {
    return ContentService.createTextOutput('Connection successful');
  }
  
  // Process the form submission
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Get parameters from the request
  var name = e.parameter.name || 'No Name';
  var email = e.parameter.email || 'No Email';
  var feedback = e.parameter.feedback || 'No Feedback';
  var source = e.parameter.source || 'Not Specified';
  var timestamp = e.parameter.timestamp || new Date().toLocaleString();
  
  // Add a new row to the spreadsheet
  sheet.appendRow([timestamp, name, email, feedback, source]);
  
  // Return success response
  return ContentService.createTextOutput('Success!');
}
                </code></pre>
            </div>
            
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Check local storage for feedbacks on load
window.addEventListener('load', function() {
    updateLocalCount();
    
    // Add form field validation
    const nameField = document.getElementById('name');
    const feedbackField = document.getElementById('feedback');
    const emailField = document.getElementById('email');
    
    // Add validation styles
    [nameField, feedbackField, emailField].forEach(field => {
        if (!field) return;
        
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });
});

// Function to validate a field
function validateField(field) {
    if (field.required && !field.value.trim()) {
        field.classList.add('invalid');
        
        // Show error message if it doesn't exist
        let errorMsg = field.parentElement.querySelector('.error-msg');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = 'This field is required';
            field.parentElement.appendChild(errorMsg);
        }
    } else if (field.type === 'email' && field.value.trim() && !validateEmail(field.value)) {
        field.classList.add('invalid');
        
        // Show error message if it doesn't exist
        let errorMsg = field.parentElement.querySelector('.error-msg');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-msg';
            errorMsg.textContent = 'Please enter a valid email address';
            field.parentElement.appendChild(errorMsg);
        }
    } else {
        field.classList.remove('invalid');
        
        // Remove error message if it exists
        const errorMsg = field.parentElement.querySelector('.error-msg');
        if (errorMsg) {
            field.parentElement.removeChild(errorMsg);
        }
    }
}

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}