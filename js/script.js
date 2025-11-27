// DOM Elements
const passwordInput = document.getElementById('password-input');
const togglePassword = document.getElementById('toggle-password');
const strengthFill = document.getElementById('strength-fill');
const strengthText = document.getElementById('strength-text');
const strengthScore = document.getElementById('strength-score');
const eyeIcon = togglePassword.querySelector('i');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
const historyList = document.getElementById('history-list');
const commonWarning = document.getElementById('common-warning');

// Criteria icons
const lengthIcon = document.getElementById('length-icon');
const uppercaseIcon = document.getElementById('uppercase-icon');
const lowercaseIcon = document.getElementById('lowercase-icon');
const numberIcon = document.getElementById('number-icon');
const specialIcon = document.getElementById('special-icon');

// Common passwords to warn against
const commonPasswords = ["123456", "password", "qwerty", "111111", "12345678", "iloveyou"];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadHistory();
    checkPasswordStrength('');
});

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
});

// Toggle dark/light theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update icon
    if (newTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});

// Generate strong password
generateBtn.addEventListener('click', () => {
    const newPassword = generateStrongPassword();
    passwordInput.value = newPassword;
    checkPasswordStrength(newPassword);
    addToHistory(newPassword);
    showToast('Password generated!');
});

// Copy password to clipboard
copyBtn.addEventListener('click', () => {
    const password = passwordInput.value;
    if (password) {
        navigator.clipboard.writeText(password)
            .then(() => {
                showToast('Password copied to clipboard!');
            })
            .catch(err => {
                showToast('Failed to copy password');
                console.error('Failed to copy: ', err);
            });
    } else {
        showToast('No password to copy');
    }
});

// Check password strength on input
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    checkPasswordStrength(password);
});

/**
 * Checks the strength of a password and updates the UI accordingly
 * @param {string} password - The password to check
 */
function checkPasswordStrength(password) {
    // Hide common password warning initially
    commonWarning.style.display = 'none';
    
    // Check if password is common
    if (commonPasswords.includes(password)) {
        commonWarning.style.display = 'block';
    }
    
    // Initialize criteria checks
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    
    // Update criteria icons
    updateCriteriaIcon(lengthIcon, hasLength);
    updateCriteriaIcon(uppercaseIcon, hasUppercase);
    updateCriteriaIcon(lowercaseIcon, hasLowercase);
    updateCriteriaIcon(numberIcon, hasNumber);
    updateCriteriaIcon(specialIcon, hasSpecial);
    
    // Calculate strength score (0-100)
    let score = 0;
    if (hasLength) score += 20;
    if (hasUppercase) score += 20;
    if (hasLowercase) score += 20;
    if (hasNumber) score += 20;
    if (hasSpecial) score += 20;
    
    // Update strength meter and text
    updateStrengthMeter(score);
}

/**
 * Updates the icon for a criteria
 * @param {HTMLElement} iconElement - The icon element to update
 * @param {boolean} isValid - Whether the criteria is met
 */
function updateCriteriaIcon(iconElement, isValid) {
    if (isValid) {
        iconElement.innerHTML = '<i class="fas fa-check-circle"></i>';
        iconElement.className = 'criteria-icon icon-valid';
    } else {
        iconElement.innerHTML = '<i class="fas fa-times-circle"></i>';
        iconElement.className = 'criteria-icon icon-invalid';
    }
}

/**
 * Updates the strength meter based on the strength score
 * @param {number} score - The strength score (0-100)
 */
function updateStrengthMeter(score) {
    // Update width with smooth transition
    strengthFill.style.width = `${score}%`;
    
    // Update score text
    strengthScore.textContent = `${score}%`;
    
    // Update color and text based on score
    if (score === 0) {
        // None
        strengthFill.style.backgroundColor = '#eee';
        strengthText.textContent = 'None';
        strengthText.className = 'strength-value';
    } else if (score <= 40) {
        // Weak
        strengthFill.style.backgroundColor = '#ff4757';
        strengthText.textContent = 'Weak';
        strengthText.className = 'strength-value weak';
    } else if (score <= 80) {
        // Medium
        strengthFill.style.backgroundColor = '#ffa502';
        strengthText.textContent = 'Medium';
        strengthText.className = 'strength-value medium';
    } else {
        // Strong
        strengthFill.style.backgroundColor = '#2ed573';
        strengthText.textContent = 'Strong';
        strengthText.className = 'strength-value strong';
    }
}

/**
 * Generates a strong random password
 * @returns {string} - Generated password
 */
function generateStrongPassword() {
    const length = Math.floor(Math.random() * 5) + 12; // 12-16 characters
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Ensure at least one of each type
    let password = '';
    password += getRandomChar(uppercase);
    password += getRandomChar(lowercase);
    password += getRandomChar(numbers);
    password += getRandomChar(symbols);
    
    // Fill the rest randomly
    const allChars = uppercase + lowercase + numbers + symbols;
    for (let i = 4; i < length; i++) {
        password += getRandomChar(allChars);
    }
    
    // Shuffle the password
    return shuffleString(password);
}

/**
 * Gets a random character from a string
 * @param {string} str - String to get character from
 * @returns {string} - Random character
 */
function getRandomChar(str) {
    return str.charAt(Math.floor(Math.random() * str.length));
}

/**
 * Shuffles a string
 * @param {string} str - String to shuffle
 * @returns {string} - Shuffled string
 */
function shuffleString(str) {
    const array = str.split('');
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join('');
}

/**
 * Adds a password to history (only generated passwords)
 * @param {string} password - Password to add
 */
function addToHistory(password) {
    // Get existing history from localStorage
    let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    
    // Add new password to the beginning
    history.unshift({
        password: password,
        timestamp: new Date().toISOString()
    });
    
    // Keep only last 5
    if (history.length > 5) {
        history = history.slice(0, 5);
    }
    
    // Save to localStorage
    localStorage.setItem('passwordHistory', JSON.stringify(history));
    
    // Update UI
    renderHistory();
}

/**
 * Loads password history from localStorage
 */
function loadHistory() {
    renderHistory();
}

/**
 * Renders password history in the UI
 */
function renderHistory() {
    const history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    
    // Clear current list
    historyList.innerHTML = '';
    
    // Add each item to the list
    history.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'history-item';
        
        // Truncate password for display
        const displayPassword = item.password.length > 15 
            ? item.password.substring(0, 15) + '...' 
            : item.password;
        
        listItem.innerHTML = `
            <span>${displayPassword}</span>
            <button class="delete-btn" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        historyList.appendChild(listItem);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            deleteFromHistory(index);
        });
    });
}

/**
 * Deletes an item from password history
 * @param {number} index - Index of item to delete
 */
function deleteFromHistory(index) {
    const history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    history.splice(index, 1);
    localStorage.setItem('passwordHistory', JSON.stringify(history));
    renderHistory();
}

/**
 * Shows a toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Loads theme preference from localStorage
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icon
    if (savedTheme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}