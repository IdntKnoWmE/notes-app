
export function validatePassword(password){

    let score = 0;

    // Rule 1: Length is at least 8 characters
    if (password.length >= 8) score++;

    // Rule 2: Contains lowercase letters
    if (/[a-z]/.test(password)) score++;

    // Rule 3: Contains uppercase letters
    if (/[A-Z]/.test(password)) score++;

    // Rule 4: Contains numbers
    if (/[0-9]/.test(password)) score++;

    // Rule 5: Contains special characters
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // Calculate strength based on score
    if (password.length === 0) {
        return "Empty";
    } else if (score < 3) {
        return "Weak";
    } else if (score === 3 || score === 4) {
        return "Moderate";
    } else if (score === 5) {
        return "Strong";
    }
}
