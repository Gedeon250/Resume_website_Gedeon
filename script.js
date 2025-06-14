// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
    });
});

// Form validation
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    input.style.borderColor = 'var(--error-color)';
}

function clearError(input) {
    const formGroup = input.parentElement;
    const errorMessage = formGroup.querySelector('.error-message');
    errorMessage.style.display = 'none';
    input.style.borderColor = '#ddd';
}

// Real-time validation
formInputs.forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() === '') {
            showError(input, 'This field is required');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
        } else {
            clearError(input);
        }
    });

    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            showError(input, 'This field is required');
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
        } else {
            clearError(input);
        }
    });
});

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Validate all inputs
    formInputs.forEach(input => {
        if (input.value.trim() === '') {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    if (isValid) {
        // Submit the form using Formspree
        const formData = new FormData(contactForm);
        
        fetch('https://formspree.io/f/xqabbklr', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message. Please try again later.');
        });
    }
});

// Load GitHub projects
async function loadProjects() {
    const projectsContainer = document.getElementById('projectsContainer');
    
    try {
        // Fetch repositories from GitHub API
        const response = await fetch('https://api.github.com/users/Gedeon250/repos');
        const repos = await response.json();
        
        // Display each repository as a project card
        repos.forEach(repo => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <p>Language: ${repo.language || 'Not specified'}</p>
                <a href="${repo.html_url}" target="_blank" class="project-link">View on GitHub</a>
            `;
            
            projectsContainer.appendChild(projectCard);
        });
        
    } catch (error) {
        console.error('Error loading projects:', error);
        projectsContainer.innerHTML = '<p>Unable to load projects. Please try again later.</p>';
    }
}

// Load projects when page loads
window.addEventListener('DOMContentLoaded', loadProjects);

// Add scroll event listener for navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.nav-container');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
    } else {
        navbar.style.backgroundColor = 'var(--primary-color)';
    }
});
