// Get the necessary elements from the DOM
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// --- 1. FUNCTION TO APPLY THE THEME ---
// This function applies the 'dark-mode' class to the body if the theme is 'dark'
const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true; // Sync checkbox with the theme
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false; // Sync checkbox with the theme
    }
};

// --- 2. FUNCTION TO SAVE THE THEME TO LOCAL STORAGE ---
const saveTheme = (theme) => {
    localStorage.setItem('theme', theme);
};

// --- 3. EVENT LISTENER FOR THE TOGGLE SWITCH ---
// When the toggle is clicked, determine the new theme and apply/save it
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    applyTheme(newTheme);
    saveTheme(newTheme);
});

// --- 4. INITIAL THEME SETUP ON PAGE LOAD ---
// Check for a saved theme in localStorage. If not found, check the user's system preference.
const loadTheme = () => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
        return; // Stop here if we found a saved theme
    }

    // If no saved theme, check system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'dark' : 'light';
    
    applyTheme(defaultTheme);
    // Note: We don't save the default theme to localStorage immediately, 
    // allowing the user to switch without having a "saved" preference yet.
};

// Run the theme setup when the script loads
loadTheme();
