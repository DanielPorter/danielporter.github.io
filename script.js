let allCourses = [];
let currentPage = 1;
const coursesPerPage = 30;

// Load JSON data
async function loadCourses() {
    try {
        const [sdmcResponse, ucbResponse] = await Promise.all([
            fetch('sdmc-courses.json'),
            fetch('ucb-courses.json')
        ]);
        const sdmcCourses = await sdmcResponse.json();
        const ucbCourses = await ucbResponse.json();
        allCourses = [...sdmcCourses, ...ucbCourses];
        renderCourses();
    } catch (error) {
        console.error('Error loading course data:', error);
    }
}

// Render courses
function renderCourses() {
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '';
    
    const start = (currentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    
    allCourses.slice(start, end).forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <h3>${course.college}</h3>
            <div class="course-basic">
                <strong>${course.code}</strong>: ${course.title}
            </div>
            <div class="course-details">
                <p><strong>Prerequisites:</strong> ${course.prerequisites.join(', ')}</p>
                <p><strong>Terms Offered:</strong> ${course.terms.join(', ')}</p>
                <p>${course.description}</p>
            </div>
        `;
        
        card.addEventListener('click', () => {
            card.classList.toggle('active');
            card.querySelector('.course-details').style.display = 
                card.classList.contains('active') ? 'block' : 'none';
        });
        
        container.appendChild(card);
    });
}

// Pagination controls
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        document.getElementById('currentPage').textContent = currentPage;
        renderCourses();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < Math.ceil(allCourses.length / coursesPerPage)) {
        currentPage++;
        document.getElementById('currentPage').textContent = currentPage;
        renderCourses();
    }
});

// Load courses on page load
loadCourses();
