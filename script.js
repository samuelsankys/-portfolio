// ===== Configuration =====
const GITHUB_USERNAME = 'samuelsankys';
const FEATURED_REPOS = ['wallet', 'Ripio-Trade', 'desafio-verx', 'back-space-x', 'front-space-x', 'Socios'];

// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const projectsGrid = document.getElementById('projects-grid');
const statNumbers = document.querySelectorAll('.stat-number');

// ===== Navigation =====
// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('ph-list');
    icon.classList.toggle('ph-x');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('ph-list');
        icon.classList.remove('ph-x');
    });
});

// ===== Animated Counter =====
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => counterObserver.observe(stat));

// ===== GitHub Projects =====
const languageColors = {
    'JavaScript': '#f7df1e',
    'TypeScript': '#3178c6',
    'Python': '#3776ab',
    'Java': '#007396',
    'PHP': '#777bb4',
    'Dart': '#0175c2',
    'HTML': '#e34c26',
    'CSS': '#1572b6',
    'Shell': '#89e051',
    'Dockerfile': '#384d54'
};

const getLanguageColor = (language) => {
    return languageColors[language] || '#64748b';
};

const createProjectCard = (repo) => {
    const description = repo.description || 'Sem descrição disponível';
    const language = repo.language || 'N/A';
    const languageColor = getLanguageColor(language);

    return `
        <article class="project-card">
            <div class="project-header">
                <i class="ph ph-folder-notch-open project-icon"></i>
                <div class="project-links">
                    <a href="${repo.html_url}" target="_blank" rel="noopener" aria-label="Ver código">
                        <i class="ph ph-github-logo"></i>
                    </a>
                    ${repo.homepage ? `
                        <a href="${repo.homepage}" target="_blank" rel="noopener" aria-label="Ver demo">
                            <i class="ph ph-arrow-square-out"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
            <h3 class="project-title">${repo.name}</h3>
            <p class="project-description">${description}</p>
            <div class="project-tech">
                <span style="display: flex; align-items: center; gap: 4px;">
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: ${languageColor};"></span>
                    ${language}
                </span>
                ${repo.stargazers_count > 0 ? `
                    <span style="display: flex; align-items: center; gap: 4px;">
                        <i class="ph ph-star"></i> ${repo.stargazers_count}
                    </span>
                ` : ''}
                ${repo.forks_count > 0 ? `
                    <span style="display: flex; align-items: center; gap: 4px;">
                        <i class="ph ph-git-fork"></i> ${repo.forks_count}
                    </span>
                ` : ''}
            </div>
        </article>
    `;
};

const loadProjects = async () => {
    projectsGrid.innerHTML = `
        <div class="loading">
            <i class="ph ph-spinner"></i>
            <p>Carregando projetos...</p>
        </div>
    `;

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);

        if (!response.ok) {
            throw new Error('Erro ao carregar repositórios');
        }

        const repos = await response.json();

        // Filter and prioritize featured repos
        const featuredRepos = FEATURED_REPOS
            .map(name => repos.find(repo => repo.name.toLowerCase() === name.toLowerCase()))
            .filter(Boolean);

        // Get other popular repos sorted by stars/updated
        const otherRepos = repos
            .filter(repo => !FEATURED_REPOS.includes(repo.name) && !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6 - featuredRepos.length);

        const displayRepos = [...featuredRepos, ...otherRepos].slice(0, 6);

        if (displayRepos.length === 0) {
            projectsGrid.innerHTML = `
                <div class="loading">
                    <p>Nenhum projeto encontrado.</p>
                </div>
            `;
            return;
        }

        projectsGrid.innerHTML = displayRepos.map(createProjectCard).join('');

        // Add fade-in animation
        const cards = projectsGrid.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

    } catch (error) {
        console.error('Error loading projects:', error);
        projectsGrid.innerHTML = `
            <div class="loading">
                <i class="ph ph-warning"></i>
                <p>Erro ao carregar projetos. Por favor, tente novamente mais tarde.</p>
            </div>
        `;
    }
};

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Section Reveal Animation =====
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();

    // Update footer year
    const yearElement = document.querySelector('.footer-code');
    if (yearElement) {
        yearElement.innerHTML = `<span class="code-comment">// ${new Date().getFullYear()} - Todos os direitos reservados</span>`;
    }
});

// ===== Console Easter Egg =====
console.log('%c👋 Olá, dev curioso!', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%cFicou interessado no código? Confira o repositório: https://github.com/samuelsankys', 'font-size: 14px; color: #64748b;');
