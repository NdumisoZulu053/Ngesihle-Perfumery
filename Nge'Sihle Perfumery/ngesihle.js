document.addEventListener('DOMContentLoaded', function() {
const lastVisited = document.getElementById('lastVisited');
const now = new Date();
            
// Format date as "Month Day, Year at HH:MM AM/PM"
 const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
    };
const formattedDate = now.toLocaleDateString('en-US', options);
            
 // Check if there's a previous visit in localStorage
 const lastVisit = localStorage.getItem('lastVisit');
            
if (lastVisit) {
    lastVisited.textContent = `Last visited on: ${lastVisit}`;
} else {
    lastVisited.textContent = 'This is your first visit. Welcome!';
}
            
// Update localStorage with current visit
localStorage.setItem('lastVisit', formattedDate);
});

// Enable quantity input when checkbox is checked
document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    const id = checkbox.id;
    const quantityId = 'quantity' + id.slice(-1);
    const quantityInput = document.getElementById(quantityId);
    
    checkbox.addEventListener('change', function() {
        quantityInput.disabled = !this.checked;
        if (!this.checked) {
            quantityInput.value = '1';
        }
    });
});

// Get URL parameters from registration form
const urlParams = new URLSearchParams(window.location.search);
const firstName = urlParams.get('firstName');
const lastName = urlParams.get('lastName');
const deliveryAddress = urlParams.get('deliveryAddress');

// Add hidden fields to carry registration data forward
if (firstName) {
    const hiddenFirstName = document.createElement('input');
    hiddenFirstName.type = 'hidden';
    hiddenFirstName.name = 'firstName';
    hiddenFirstName.value = firstName;
    document.getElementById('productsForm').appendChild(hiddenFirstName);
}

if (lastName) {
    const hiddenLastName = document.createElement('input');
    hiddenLastName.type = 'hidden';
    hiddenLastName.name = 'lastName';
    hiddenLastName.value = lastName;
    document.getElementById('productsForm').appendChild(hiddenLastName);
}

if (deliveryAddress) {
    const hiddenAddress = document.createElement('input');
    hiddenAddress.type = 'hidden';
    hiddenAddress.name = 'deliveryAddress';
    hiddenAddress.value = deliveryAddress;
    document.getElementById('productsForm').appendChild(hiddenAddress);
}

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    
    let isValid = true;
    
    // Reset errors
    passwordError.textContent = '';
    confirmError.textContent = '';
    
    // Validate password
    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    }
    
    if (!/[A-Z]/.test(password)) {
        passwordError.textContent += ' Password must contain at least one uppercase letter.';
        isValid = false;
    }
    
    if (!/\d/.test(password)) {
        passwordError.textContent += ' Password must contain at least one digit.';
        isValid = false;
    }
    
    if (!/[!@#$]/.test(password)) {
        passwordError.textContent += ' Password must contain at least one of these symbols: !, @, #, $.';
        isValid = false;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        confirmError.textContent = 'Passwords do not match.';
        isValid = false;
    }
    
    if (!isValid) {
        e.preventDefault();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    fetch('staff.json')
        .then(response => response.json())
        .then(data => {
            const staffDirectory = document.getElementById('staffDirectory');
            
            data.staff.forEach(staff => {
                const card = document.createElement('div');
                card.className = 'staff-card';
                
                card.innerHTML = `
                    <div class="staff-name">${staff.firstName} ${staff.lastName}</div>
                    <div class="staff-job">${staff.jobDescription}</div>
                    <div class="staff-contact">
                        <div>Staff #: ${staff.staffNumber}</div>
                        <div>Phone: ${staff.workPhone}</div>
                        <div>Email: ${staff.workEmail}</div>
                    </div>
                `;
                
                staffDirectory.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading staff data:', error));
});


