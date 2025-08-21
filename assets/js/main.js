/*
	God Peace Ministry JavaScript
	Optimized by Honoured Hands Multimedia
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge:   [ '1141px',  '1680px' ],
		large:    [ '981px',   '1140px' ],
		medium:   [ '737px',   '980px'  ],
		small:    [ '481px',   '736px'  ],
		xsmall:   [ '321px',   '480px'  ],
		xxsmall:  [ null,      '320px'  ]
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Scrolly.
	$('.scrolly').scrolly();

})(jQuery);

// Responsive menu toggle with height calculation
document.addEventListener('DOMContentLoaded', function () {
	const navToggle = document.querySelector('.nav-toggle');
	const navLinks = document.querySelector('.nav-links');
	const mainHeader = document.querySelector('.main-header');

	if (navToggle && navLinks && mainHeader) {
		navToggle.addEventListener('click', () => {
			// Calculate the correct top position based on header height
			const headerHeight = mainHeader.offsetHeight;
			navLinks.style.top = headerHeight + 'px';
			navLinks.classList.toggle('active');
			
			// Prevent body scrolling when menu is open
			document.body.classList.toggle('menu-open');
		});

		// Close menu when clicking outside
		document.addEventListener('click', function(event) {
			if (!event.target.closest('.nav-links') && 
				!event.target.closest('.nav-toggle') && 
				navLinks.classList.contains('active')) {
				navLinks.classList.remove('active');
				document.body.classList.remove('menu-open');
			}
		});

		// Close menu when clicking on links
		const navItems = navLinks.querySelectorAll('a');
		navItems.forEach(item => {
			item.addEventListener('click', () => {
				navLinks.classList.remove('active');
				document.body.classList.remove('menu-open');
			});
		});
	}

	// Bank details copy functionality
	const copyButtons = document.querySelectorAll('.give-box a');
	
	copyButtons.forEach(button => {
		if (button.textContent.includes('Copy') || button.textContent.includes('copy')) {
			button.addEventListener('click', function(e) {
				e.preventDefault();
				const bankDetails = `God Peace Ministry\nIBAN: NL12BANK3456789012\nBIC: BANKNL2A`;
				
				navigator.clipboard.writeText(bankDetails).then(() => {
					// Show confirmation
					const originalText = button.textContent;
					button.textContent = '✓ Copied!';
					button.style.backgroundColor = '#28a745';
					
					// Revert after 2 seconds
					setTimeout(() => {
						button.textContent = originalText;
						button.style.backgroundColor = '';
					}, 2000);
				}).catch(err => {
					// Fallback for older browsers
					const textArea = document.createElement('textarea');
					textArea.value = bankDetails;
					document.body.appendChild(textArea);
					textArea.select();
					
					try {
						document.execCommand('copy');
						const originalText = button.textContent;
						button.textContent = '✓ Copied!';
						button.style.backgroundColor = '#28a745';
						
						setTimeout(() => {
							button.textContent = originalText;
							button.style.backgroundColor = '';
						}, 2000);
					} catch (err) {
						alert('Could not copy details. Please manually select and copy.');
					}
					
					document.body.removeChild(textArea);
				});
			});
		}
	});

	// Smooth scrolling for anchor links
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			
			const targetId = this.getAttribute('href');
			if (targetId === '#') return;
			
			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				const headerHeight = document.querySelector('.main-header').offsetHeight;
				const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
				
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});

	// Lazy loading for images
	if ('loading' in HTMLImageElement.prototype) {
		// Native lazy loading supported
		const images = document.querySelectorAll('img[loading="lazy"]');
		images.forEach(img => {
			img.addEventListener('load', function() {
				this.classList.add('loaded');
			});
		});
	} else {
		// Fallback for browsers without native lazy loading
		// You could add a lazy loading library here if needed
	}

	// Form validation and submission
	const contactForm = document.querySelector('.contact-form form');
	if (contactForm) {
		contactForm.addEventListener('submit', function(e) {
			e.preventDefault();
			
			// Basic validation
			const nameInput = this.querySelector('#name');
			const emailInput = this.querySelector('#email');
			const messageInput = this.querySelector('#message');
			
			let isValid = true;
			
			if (!nameInput.value.trim()) {
				nameInput.style.borderColor = 'red';
				isValid = false;
			} else {
				nameInput.style.borderColor = '';
			}
			
			if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
				emailInput.style.borderColor = 'red';
				isValid = false;
			} else {
				emailInput.style.borderColor = '';
			}
			
			if (!messageInput.value.trim()) {
				messageInput.style.borderColor = 'red';
				isValid = false;
			} else {
				messageInput.style.borderColor = '';
			}
			
			if (isValid) {
				// Show success message
				const successMessage = document.getElementById('contact-success');
				if (successMessage) {
					successMessage.style.display = 'block';
				}
				
				// Reset form
				this.reset();
				
				// Hide success message after 5 seconds
				setTimeout(() => {
					if (successMessage) {
						successMessage.style.display = 'none';
					}
				}, 5000);
			}
		});
	}

	// Course registration modal
	const openBtns = document.querySelectorAll('.open-form-btn');
	const modal = document.getElementById('registration-modal');
	const closeBtn = document.querySelector('.close-btn');

	if (openBtns.length && modal && closeBtn) {
		openBtns.forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				modal.style.display = 'block';
				document.body.style.overflow = 'hidden'; // Prevent scrolling
			});
		});

		closeBtn.addEventListener('click', () => {
			modal.style.display = 'none';
			document.body.style.overflow = ''; // Re-enable scrolling
		});

		window.addEventListener('click', (e) => {
			if (e.target === modal) {
				modal.style.display = 'none';
				document.body.style.overflow = '';
			}
		});

		// Close modal with Escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && modal.style.display === 'block') {
				modal.style.display = 'none';
				document.body.style.overflow = '';
			}
		});
	}

})(jQuery);