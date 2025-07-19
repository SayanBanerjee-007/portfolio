// Theme Management
const themeToggle = document.getElementById('theme-toggle')
const themeIcon = document.getElementById('theme-icon')
const html = document.documentElement

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark'
html.setAttribute('data-theme', currentTheme)
updateThemeIcon(currentTheme)

themeToggle.addEventListener('click', () => {
	const currentTheme = html.getAttribute('data-theme')
	const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

	html.setAttribute('data-theme', newTheme)
	localStorage.setItem('theme', newTheme)
	updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
	if (theme === 'dark') {
		themeIcon.className = 'fas fa-sun'
	} else {
		themeIcon.className = 'fas fa-moon'
	}
}

// Mobile Navigation
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.querySelector('.mobile-menu')
const closeMenuBtn = document.getElementById('close-menu-btn')
const mobileMenuContainer = document.querySelector(
	'.mobile-menu-container'
)

// Function to reset hamburger icon to default state
function resetHamburgerIcon() {
	hamburger.innerHTML = `
		<span class="hamburger-line" style="margin-bottom: 5px;"></span>
		<span class="hamburger-line"></span>
		<span class="hamburger-line" style="margin-top: 5px;"></span>
	`
}

// Initialize hamburger icon on page load
if (hamburger) {
	resetHamburgerIcon()
}

// Debug: Check if elements exist
console.log('Hamburger element:', hamburger)
console.log('Mobile menu element:', mobileMenu)
console.log('Close menu button:', closeMenuBtn)
console.log('Mobile menu container:', mobileMenuContainer)

// Test function to manually trigger menu
window.testMenu = function () {
	if (mobileMenu) {
		mobileMenu.classList.toggle('active')
		console.log(
			'Menu toggled manually, active class:',
			mobileMenu.classList.contains('active')
		)
	}
}

if (hamburger && mobileMenu) {
	hamburger.addEventListener('click', e => {
		e.preventDefault()
		e.stopPropagation()

		console.log('Hamburger clicked!') // Debug log
		console.log('Current window width:', window.innerWidth) // Debug log

		const isActive = !hamburger.classList.contains('active')

		// Update classes
		hamburger.classList.toggle('active')
		mobileMenu.classList.toggle('active')

		// Directly update hamburger HTML for immediate change without transition
		if (isActive) {
			// Switch to X icon
			hamburger.innerHTML = `
				<span style="position:absolute; top:50%; left:50%; margin-left:-12px; margin-top:-2px; transform:rotate(45deg); background:var(--primary-color); width:24px; height:4px; box-shadow:0 0 10px rgba(79,70,229,0.7);"></span>
				<span style="display:none;"></span>
				<span style="position:absolute; top:50%; left:50%; margin-left:-12px; margin-top:-2px; transform:rotate(-45deg); background:var(--primary-color); width:24px; height:4px; box-shadow:0 0 10px rgba(79,70,229,0.7);"></span>
			`
		} else {
			// Switch back to hamburger icon with proper spacing
			resetHamburgerIcon()
		}

		console.log(
			'Hamburger active:',
			hamburger.classList.contains('active')
		)
		console.log(
			'Mobile menu active:',
			mobileMenu.classList.contains('active')
		)

		// Prevent body scroll when menu is open
		if (mobileMenu.classList.contains('active')) {
			document.body.style.overflow = 'hidden'
			document.body.classList.add('has-mobile-menu')
			console.log('Menu opened') // Debug log
		} else {
			document.body.style.overflow = 'auto'
			document.body.classList.remove('has-mobile-menu')
			console.log('Menu closed') // Debug log
		}
	})

	// Close mobile menu when clicking on a link
	mobileMenu.querySelectorAll('.nav-link').forEach(link => {
		link.addEventListener('click', () => {
			hamburger.classList.remove('active')
			mobileMenu.classList.remove('active')
			document.body.style.overflow = 'auto'
			document.body.classList.remove('has-mobile-menu')

			// Reset hamburger icon
			resetHamburgerIcon()
		})
	})

	// Close mobile menu when clicking the close button
	if (closeMenuBtn) {
		closeMenuBtn.addEventListener('click', () => {
			hamburger.classList.remove('active')
			mobileMenu.classList.remove('active')
			document.body.style.overflow = 'auto'
			document.body.classList.remove('has-mobile-menu')
			console.log('Menu closed via close button') // Debug log

			// Reset hamburger icon
			resetHamburgerIcon()
		})
	}

	// Close mobile menu when clicking outside
	document.addEventListener('click', e => {
		if (
			!hamburger.contains(e.target) &&
			!mobileMenu.contains(e.target) &&
			mobileMenu.classList.contains('active')
		) {
			hamburger.classList.remove('active')
			mobileMenu.classList.remove('active')
			document.body.style.overflow = 'auto'
			document.body.classList.remove('has-mobile-menu')

			// Reset hamburger icon
			resetHamburgerIcon()
		}
	})
} else {
	console.error('Hamburger or nav menu element not found!')
}

// Handle window resize
window.addEventListener('resize', () => {
	if (window.innerWidth > 1024) {
		hamburger.classList.remove('active')
		mobileMenu.classList.remove('active')
		document.body.style.overflow = 'auto'

		// Reset hamburger icon
		resetHamburgerIcon()
	}

	// Update particle canvas size
	const canvas = document.querySelector('canvas')
	if (canvas) {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault()
		const target = document.querySelector(this.getAttribute('href'))
		if (target) {
			const navbarHeight =
				document.querySelector('.navbar').offsetHeight
			const targetPosition = target.offsetTop - navbarHeight - 20

			window.scrollTo({
				top: targetPosition,
				behavior: 'smooth',
			})
		}
	})
})

// Intersection Observer for Animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible')

			// Special handling for counters
			if (entry.target.classList.contains('stat-number')) {
				animateCounter(entry.target)
			}
		}
	})
}, observerOptions)

// Observe all elements that should animate
document
	.querySelectorAll(
		'.fade-in, .project-card, .skill-category, .highlight-card, .text-card, .contact-card'
	)
	.forEach(el => {
		el.classList.add('fade-in')
		observer.observe(el)
	})

// Counter Animation
function animateCounter(element) {
	const target = parseInt(element.textContent)
	const duration = 1500 // 1.5 seconds
	const step = target / (duration / 16) // 60fps
	let current = 0

	const timer = setInterval(() => {
		current += step
		if (current >= target) {
			current = target
			clearInterval(timer)
		}
		element.textContent = Math.floor(current) + '+'
	}, 16)
}

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
	let i = 0
	element.innerHTML = ''

	function type() {
		if (i < text.length) {
			element.innerHTML += text.charAt(i)
			i++
			setTimeout(type, speed)
		}
	}

	type()
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
	const nameElement = document.querySelector('.name-animation')
	if (nameElement) {
		const originalText = nameElement.textContent
		typeWriter(nameElement, originalText, 150)
	}
})

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
	const navbar = document.querySelector('.navbar')
	const scrolled = window.pageYOffset
	const isDark =
		document.documentElement.getAttribute('data-theme') === 'dark'

	if (scrolled > 100) {
		if (isDark) {
			navbar.style.background = 'rgba(15, 23, 42, 0.8)'
			navbar.style.borderColor = 'rgba(148, 163, 184, 0.2)'
		} else {
			navbar.style.background = 'rgba(255, 255, 255, 0.8)'
			navbar.style.borderColor = 'rgba(255, 255, 255, 0.3)'
		}
		navbar.style.backdropFilter = 'blur(25px)'
	} else {
		navbar.style.background = 'var(--navbar-bg)'
		navbar.style.borderColor = 'var(--navbar-border)'
		navbar.style.backdropFilter = 'var(--backdrop-blur)'
	}
})

// Particle Effect on Mouse Move
let particles = []
const particleCount = 50

class Particle {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.vx = (Math.random() - 0.5) * 2
		this.vy = (Math.random() - 0.5) * 2
		this.life = 1
		this.decay = Math.random() * 0.02 + 0.01
		this.size = Math.random() * 3 + 1
	}

	update() {
		this.x += this.vx
		this.y += this.vy
		this.life -= this.decay
	}

	draw(ctx) {
		ctx.save()
		ctx.globalAlpha = this.life
		ctx.fillStyle = '#6366f1'
		ctx.beginPath()
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
		ctx.fill()
		ctx.restore()
	}
}

// Create canvas for particle effect
function createParticleCanvas() {
	// Only create particles on larger screens for better performance
	if (window.innerWidth < 768) {
		return
	}

	const canvas = document.createElement('canvas')
	canvas.style.position = 'fixed'
	canvas.style.top = '0'
	canvas.style.left = '0'
	canvas.style.pointerEvents = 'none'
	canvas.style.zIndex = '1'
	canvas.style.opacity = '0.6'
	document.body.appendChild(canvas)

	const ctx = canvas.getContext('2d')

	function resize() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
	}

	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		for (let i = particles.length - 1; i >= 0; i--) {
			const particle = particles[i]
			particle.update()
			particle.draw(ctx)

			if (particle.life <= 0) {
				particles.splice(i, 1)
			}
		}

		requestAnimationFrame(animate)
	}

	window.addEventListener('resize', () => {
		resize()
		// Remove particles on mobile after resize
		if (window.innerWidth < 768) {
			particles.length = 0
			canvas.remove()
		}
	})

	// Reduce particle count on smaller screens
	const maxParticles = window.innerWidth < 1024 ? 20 : particleCount

	document.addEventListener('mousemove', e => {
		if (particles.length < maxParticles && window.innerWidth >= 768) {
			particles.push(new Particle(e.clientX, e.clientY))
		}
	})

	resize()
	animate()
}

// Initialize particle effect
createParticleCanvas()

// Notification System
function showNotification(message, type = 'info') {
	const notification = document.createElement('div')
	notification.className = `notification ${type}`
	notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `

	// Style the notification
	notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-glass);
        backdrop-filter: var(--backdrop-blur);
        border: 1px solid var(--border-glass);
        border-radius: 12px;
        padding: 16px 20px;
        color: var(--text-primary);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: var(--shadow-glass);
    `

	document.body.appendChild(notification)

	// Animate in
	setTimeout(() => {
		notification.style.transform = 'translateX(0)'
	}, 100)

	// Animate out and remove
	setTimeout(() => {
		notification.style.transform = 'translateX(400px)'
		setTimeout(() => {
			document.body.removeChild(notification)
		}, 300)
	}, 3000)
}

function getNotificationIcon(type) {
	switch (type) {
		case 'success':
			return 'fa-check-circle'
		case 'error':
			return 'fa-exclamation-circle'
		case 'warning':
			return 'fa-exclamation-triangle'
		default:
			return 'fa-info-circle'
	}
}

// Responsive font size adjustments
function adjustFontSizes() {
	const screenWidth = window.innerWidth
	const root = document.documentElement

	// Adjust base font size based on screen width
	if (screenWidth < 480) {
		root.style.fontSize = '14px'
	} else if (screenWidth < 768) {
		root.style.fontSize = '15px'
	} else if (screenWidth < 1024) {
		root.style.fontSize = '16px'
	} else {
		root.style.fontSize = '16px'
	}
}

// Optimized parallax effect for mobile
function handleParallax() {
	if (window.innerWidth < 768) {
		// Disable parallax on mobile for better performance
		const shapes = document.querySelectorAll('.shape')
		shapes.forEach(shape => {
			shape.style.transform = 'none'
		})
		return
	}

	const scrolled = window.pageYOffset
	const shapes = document.querySelectorAll('.shape')

	shapes.forEach((shape, index) => {
		const speed = (index + 1) * 0.1
		shape.style.transform = `translateY(${
			scrolled * speed
		}px) rotate(${scrolled * 0.1}deg)`
	})
}

// Initialize responsive features
window.addEventListener(
	'resize',
	throttle(() => {
		adjustFontSizes()
	}, 250)
)

// Replace the existing parallax scroll event
window.addEventListener(
	'scroll',
	throttle(() => {
		handleParallax()
	}, 16)
)

// Touch-friendly interactions
function addTouchSupport() {
	const cards = document.querySelectorAll(
		'.project-card, .skill-category, .achievement-card'
	)

	cards.forEach(card => {
		// Add touch events for better mobile interaction
		card.addEventListener(
			'touchstart',
			function () {
				this.style.transform = 'scale(0.98)'
			},
			{ passive: true }
		)

		card.addEventListener(
			'touchend',
			function () {
				this.style.transform = ''
			},
			{ passive: true }
		)
	})
}

// Initialize touch support
document.addEventListener('DOMContentLoaded', addTouchSupport)

// Skills Animation on Hover
document.querySelectorAll('.skill-item').forEach(item => {
	item.addEventListener('mouseenter', () => {
		const icon = item.querySelector('i')
		icon.style.transform = 'scale(1.2) rotate(5deg)'
		icon.style.transition = 'transform 0.3s ease'
	})

	item.addEventListener('mouseleave', () => {
		const icon = item.querySelector('i')
		icon.style.transform = 'scale(1) rotate(0deg)'
	})
})

// Project Card Tilt Effect
document.querySelectorAll('.project-card').forEach(card => {
	card.addEventListener('mousemove', e => {
		const rect = card.getBoundingClientRect()
		const x = e.clientX - rect.left
		const y = e.clientY - rect.top

		const centerX = rect.width / 2
		const centerY = rect.height / 2

		const rotateX = (y - centerY) / 10
		const rotateY = (centerX - x) / 10

		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
	})

	card.addEventListener('mouseleave', () => {
		card.style.transform =
			'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)'
	})
})

// Easter Egg: Konami Code
let konamiCode = []
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65] // UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A

document.addEventListener('keydown', e => {
	konamiCode.push(e.keyCode)

	if (konamiCode.length > konamiSequence.length) {
		konamiCode.shift()
	}

	if (
		konamiCode.length === konamiSequence.length &&
		konamiCode.every((code, index) => code === konamiSequence[index])
	) {
		activateEasterEgg()
		konamiCode = []
	}
})

function activateEasterEgg() {
	// Rainbow background effect
	document.body.style.animation = 'rainbow 2s ease infinite'

	// Add rainbow animation to CSS
	const style = document.createElement('style')
	style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `
	document.head.appendChild(style)

	showNotification(
		'🎉 Konami Code activated! You found the easter egg!',
		'success'
	)

	// Reset after 5 seconds
	setTimeout(() => {
		document.body.style.animation = ''
		document.head.removeChild(style)
	}, 5000)
}

// Page Load Animation
window.addEventListener('load', () => {
	// Hide loading screen
	const loadingScreen = document.getElementById('loading-screen')
	if (loadingScreen) {
		setTimeout(() => {
			loadingScreen.style.opacity = '0'
			setTimeout(() => {
				loadingScreen.remove()
			}, 500)
		}, 800) // Show loading for at least 800ms for better UX
	}

	// Animate hero section
	const heroElements = document.querySelectorAll('.hero-text > *')
	heroElements.forEach((el, index) => {
		el.style.opacity = '0'
		el.style.transform = 'translateY(30px)'
		setTimeout(() => {
			el.style.transition = 'all 0.6s ease'
			el.style.opacity = '1'
			el.style.transform = 'translateY(0)'
		}, index * 200 + 1000) // Delay until after loading screen
	})

	// Initialize responsive features
	adjustFontSizes()
})

// Preload images for better performance
function preloadImages() {
	const images = [
		'https://avatars.githubusercontent.com/u/115403169?v=4',
	]

	images.forEach(src => {
		const img = new Image()
		img.src = src
	})
}

preloadImages()

// Copy to clipboard functionality
function copyToClipboard(text) {
	navigator.clipboard
		.writeText(text)
		.then(() => {
			showNotification('Copied to clipboard!', 'success')
		})
		.catch(() => {
			showNotification('Failed to copy to clipboard', 'error')
		})
}

// Add copy functionality to email
document.addEventListener('DOMContentLoaded', () => {
	const emailElements = document.querySelectorAll('[href^="mailto:"]')
	emailElements.forEach(el => {
		el.addEventListener('contextmenu', e => {
			e.preventDefault()
			const email = el.getAttribute('href').replace('mailto:', '')
			copyToClipboard(email)
		})
	})
})

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
	let inThrottle
	return function () {
		const args = arguments
		const context = this
		if (!inThrottle) {
			func.apply(context, args)
			inThrottle = true
			setTimeout(() => (inThrottle = false), limit)
		}
	}
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(e => {
	// Your scroll handler code here
}, 16) // ~60fps

window.addEventListener('scroll', throttledScrollHandler)

// Accessibility improvements
document.addEventListener('keydown', e => {
	// Skip to main content with 'S' key
	if (e.key === 's' || e.key === 'S') {
		const mainContent = document.querySelector('#home')
		if (mainContent) {
			mainContent.focus()
			mainContent.scrollIntoView({ behavior: 'smooth' })
		}
	}
})

// Add focus indicators for keyboard navigation
document.addEventListener('keydown', e => {
	if (e.key === 'Tab') {
		document.body.classList.add('keyboard-navigation')
	}
})

document.addEventListener('mousedown', () => {
	document.body.classList.remove('keyboard-navigation')
})

// Console welcome message
console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║                    Welcome to Sayan's Portfolio!            ║
    ║                                                              ║
    ║  👋 Hi there! I see you're checking out the console.        ║
    ║  Feel free to explore the code on GitHub!                   ║
    ║                                                              ║
    ║  🔗 GitHub: https://github.com/SayanBanerjee-007           ║
    ║  📧 Email: sayankb.001@gmail.com                           ║
    ║                                                              ║
    ║  Try the Konami Code for a surprise! 😉                     ║
    ║  (↑↑↓↓←→←→BA)                                               ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
`)

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
	module.exports = {
		updateThemeIcon,
		showNotification,
		copyToClipboard,
		throttle,
	}
}
