// Sanitise input by removing specific characters to prevent XSS attacks
export function sanitiseInput(str) {
    return str.replace(/[><()&;]/g, '');
}