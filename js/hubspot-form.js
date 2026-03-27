// HubSpot Form Integration
// Submits contact form data to HubSpot via Forms API

(function() {
    'use strict';

    // HubSpot Configuration
    const HUBSPOT_CONFIG = {
        portalId: '26013262',
        formGuid: 'a7274aa7-578b-4859-aef8-776bb2f15e84',
        region: 'eu1'
    };

    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');

        if (!form) {
            console.warn('Contact form not found');
            return;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                firstName: document.getElementById('firstName').value.trim(),
                lastName: document.getElementById('lastName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value.trim()
            };

            // Validate required fields
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
                showMessage('Please fill in all required fields.', 'error');
                return;
            }

            // Disable submit button to prevent double submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Submit to HubSpot
            submitToHubSpot(formData)
                .then(function() {
                    // Success
                    showMessage('Thank you! We\'ll get back to you within 24 hours.', 'success');
                    form.reset();
                })
                .catch(function(error) {
                    // Error
                    console.error('HubSpot submission error:', error);
                    showMessage('Something went wrong. Please try again or email us directly at info@bharatfinance.de', 'error');
                })
                .finally(function() {
                    // Re-enable submit button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                });
        });
    });

    /**
     * Submit form data to HubSpot Forms API
     */
    function submitToHubSpot(formData) {
        const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_CONFIG.portalId}/${HUBSPOT_CONFIG.formGuid}`;

        // Build HubSpot payload
        const payload = {
            fields: [
                {
                    objectTypeId: "0-1",
                    name: "firstname",
                    value: formData.firstName
                },
                {
                    objectTypeId: "0-1",
                    name: "lastname",
                    value: formData.lastName
                },
                {
                    objectTypeId: "0-1",
                    name: "email",
                    value: formData.email
                },
                {
                    objectTypeId: "0-1",
                    name: "phone",
                    value: formData.phone
                }
            ],
            context: {
                pageUri: window.location.href,
                pageName: document.title
            }
        };

        // Add interest if selected
        if (formData.interest) {
            payload.fields.push({
                objectTypeId: "0-1",
                name: "interest_topic",
                value: formData.interest
            });
        }

        // Add message if provided
        if (formData.message) {
            payload.fields.push({
                objectTypeId: "0-1",
                name: "message",
                value: formData.message
            });
        }

        // Send to HubSpot
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('HubSpot API error: ' + response.status);
            }
            return response.json();
        });
    }

    /**
     * Display success or error message
     */
    function showMessage(message, type) {
        // Remove existing messages
        const existingMsg = document.querySelector('.form-message');
        if (existingMsg) {
            existingMsg.remove();
        }

        // Create message element
        const msgDiv = document.createElement('div');
        msgDiv.className = 'form-message';
        msgDiv.style.cssText = `
            padding: 1rem 1.5rem;
            margin-top: 1rem;
            border-radius: 0;
            font-size: 0.875rem;
            text-align: center;
            ${type === 'success'
                ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
                : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        msgDiv.textContent = message;

        // Insert after form
        const form = document.getElementById('contactForm');
        form.parentNode.insertBefore(msgDiv, form.nextSibling);

        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(function() {
                if (msgDiv.parentNode) {
                    msgDiv.remove();
                }
            }, 5000);
        }
    }
})();
