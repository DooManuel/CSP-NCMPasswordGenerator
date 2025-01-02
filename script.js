// Array to store previously generated passwords to ensure uniqueness
let previousPasswords = [];

document.getElementById('generate-btn').addEventListener('click', function() {
    let password = generateStrongPassword(14); // Generate a strong password with 14 characters
    // Ensure the generated password is significantly different from the previous ones
    while (previousPasswords.includes(password)) {
        password = generateStrongPassword(14); 
    }
    previousPasswords.push(password);
    document.getElementById('password').value = password;
});

document.getElementById('copy-btn').addEventListener('click', function() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});

// Function to generate a strong password
function generateStrongPassword(length) {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digits = '0123456789';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    
    const allCharacters = lowerCaseLetters + upperCaseLetters + digits + specialChars;
    
    let password = '';
    
    // Ensure at least one character from each category is included
    password += getRandomCharacter(lowerCaseLetters);
    password += getRandomCharacter(upperCaseLetters);
    password += getRandomCharacter(digits);
    password += getRandomCharacter(specialChars);

    // Fill the rest of the password with random characters from all categories
    for (let i = password.length; i < length; i++) {
        password += getRandomCharacter(allCharacters);
    }
    
    return shuffleString(password); // Shuffle to ensure randomness
}

// Helper function to get a random character from a given string
function getRandomCharacter(charSet) {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
}

// Helper function to shuffle the characters in the password for more randomness
function shuffleString(str) {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr.join('');
}
