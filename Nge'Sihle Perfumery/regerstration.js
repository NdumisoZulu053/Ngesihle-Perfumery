   
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const sameAsHomeCheckbox = document.getElementById('sameAsHome');
            const postalAddressFields = document.getElementById('postalAddressFields');
            
            // Copy home address to postal address when checkbox is clicked
            sameAsHomeCheckbox.addEventListener('change', function() {
                if(this.checked) {
                    document.getElementById('postalStreet').value = document.getElementById('street').value;
                    document.getElementById('postalSuburb').value = document.getElementById('suburb').value;
                    document.getElementById('postalCity').value = document.getElementById('city').value;
                    document.getElementById('postalProvince').value = document.getElementById('province').value;
                    document.getElementById('postalPostalCode').value = document.getElementById('postalCode').value;
                    postalAddressFields.style.display = 'none';
                } else {
                    postalAddressFields.style.display = 'block';
                }
            });
            
            // Form validation
            form.addEventListener('submit', function(event) {
                let isValid = true;
                
                // Clear previous errors
                const errorElements = document.querySelectorAll('.error');
                errorElements.forEach(el => el.textContent = '');
                
                // Validate required fields
                const requiredFields = form.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    if(!field.value.trim()) {
                        const errorElement = document.getElementById(`${field.id}Error`) || 
                                            document.getElementById(`${field.name}Error`);
                        if(errorElement) {
                            errorElement.textContent = 'This field is required';
                        }
                        isValid = false;
                    }
                });
                
                // Validate ID number (South African ID numbers are 13 digits)
                const idNumber = document.getElementById('idNumber');
                if(idNumber.value && !/^\d{13}$/.test(idNumber.value)) {
                    document.getElementById('idNumberError').textContent = 'ID number must be 13 digits';
                    isValid = false;
                }
                
                // Validate phone numbers
                const cellphone = document.getElementById('cellphone');
                if(cellphone.value && !/^\d{10}$/.test(cellphone.value)) {
                    document.getElementById('cellphoneError').textContent = 'Cellphone number must be 10 digits';
                    isValid = false;
                }
                
                const telephoneWork = document.getElementById('telephoneWork');
                if(telephoneWork.value && !/^\d{10}$/.test(telephoneWork.value)) {
                    document.getElementById('telephoneWorkError').textContent = 'Telephone number must be 10 digits';
                    isValid = false;
                }
                
                // Validate email
                const email = document.getElementById('email');
                if(email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                    document.getElementById('emailError').textContent = 'Please enter a valid email address';
                    isValid = false;
                }
                
                // Validate postal code
                const postalCode = document.getElementById('postalCode');
                if(postalCode.value && !/^\d{4}$/.test(postalCode.value)) {
                    document.getElementById('addressError').textContent = 'Postal code must be 4 digits';
                    isValid = false;
                }
                
                // Validate credit card number based on type
                const cardType = document.getElementById('cardType').value;
                const cardNumber = document.getElementById('cardNumber').value;
                
                if(cardType && cardNumber) {
                    let cardValid = false;
                    
                    if(cardType === 'visa' && /^4\d{12}(\d{3})?$/.test(cardNumber)) {
                        cardValid = true;
                    } else if(cardType === 'mastercard' && /^5[1-5]\d{14}$/.test(cardNumber)) {
                        cardValid = true;
                    } else if(cardType === 'amex' && /^3[47]\d{13}$/.test(cardNumber)) {
                        cardValid = true;
                    } else if(cardType === 'discover' && /^6(?:011|5\d{2})\d{12}$/.test(cardNumber)) {
                        cardValid = true;
                    }
                    
                    if(!cardValid) {
                        document.getElementById('cardNumberError').textContent = 'Invalid credit card number for selected type';
                        isValid = false;
                    }
                }
                
                // Validate CVC
                const cvc = document.getElementById('cvc');
                if(cvc.value && !/^\d{3,4}$/.test(cvc.value)) {
                    document.getElementById('cvcError').textContent = 'CVC must be 3 or 4 digits';
                    isValid = false;
                }
                
                // Validate expiration date is in the future
                const expMonth = parseInt(document.getElementById('expMonth').value);
                const expYear = parseInt(document.getElementById('expYear').value);
                const currentDate = new Date();
                const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed
                const currentYear = currentDate.getFullYear();
                
                if(expYear && expMonth) {
                    if(expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
                        document.getElementById('expDateError').textContent = 'Credit card is expired';
                        isValid = false;
                    }
                }
                
                if(!isValid) {
                    event.preventDefault();
                } else {
                    // Form is valid, you could submit it here or process the data
                    alert('Form submitted successfully!');
                    // form.submit(); // Uncomment to actually submit the form
                }
            });
        });
        document.addEventListener('DOMContentLoaded', function() {
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const form = document.getElementById('registrationForm');
  
  // Real-time password validation feedback
  password.addEventListener('input', function() {
    const length = document.getElementById('length');
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const number = document.getElementById('number');
    
    // Validate length
    if (password.value.length >= 8) {
      length.style.color = 'green';
    } else {
      length.style.color = 'red';
    }
    
    // Validate uppercase letters
    if (/[A-Z]/.test(password.value)) {
      uppercase.style.color = 'green';
    } else {
      uppercase.style.color = 'red';
    }
    
    // Validate lowercase letters
    if (/[a-z]/.test(password.value)) {
      lowercase.style.color = 'green';
    } else {
      lowercase.style.color = 'red';
    }
    
    // Validate numbers
    if (/[0-9]/.test(password.value)) {
      number.style.color = 'green';
    } else {
      number.style.color = 'red';
    }
  });
  
  // Password confirmation check
  confirmPassword.addEventListener('input', function() {
    const match = document.getElementById('passwordMatch');
    
    if (password.value === confirmPassword.value) {
      match.textContent = 'Passwords match!';
      match.style.color = 'green';
    } else {
      match.textContent = 'Passwords do not match!';
      match.style.color = 'red';
    }
  });
  
  // Form submission validation
  form.addEventListener('submit', function(e) {
    if (password.value !== confirmPassword.value) {
      e.preventDefault();
      alert('Passwords do not match!');
      password.focus();
    }
    
  });
});