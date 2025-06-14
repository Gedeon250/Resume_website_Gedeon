// This file is optional - you can merge it with script.js
// It provides more detailed comment handling

// Store comments temporarily (in a real app, use a database)
let allComments = JSON.parse(localStorage.getItem('comments')) || {};

// Function to save comments to localStorage
function saveComments() {
    localStorage.setItem('comments', JSON.stringify(allComments));
}

// Enhanced sendComment function
function sendComment(project, name, email, comment) {
    // Create project entry if it doesn't exist
    if (!allComments[project]) {
        allComments[project] = [];
    }
    
    // Add new comment
    allComments[project].push({
        name,
        email,
        comment,
        date: new Date().toISOString()
    });
    
    // Save to localStorage
    saveComments();
    
    // In a real app, you would also send this to your email
    // For now, we'll just log it
    console.log(`Comment sent to G.ntigibesh@alustudent.com about ${project}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Comment: ${comment}`);
}

// Function to display comments for a project
function displayComments(project) {
    if (allComments[project]) {
        console.log(`Comments for ${project}:`, allComments[project]);
    }
}
