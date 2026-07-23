/* ==========================================================================
   DANTAM DENTAL CLINICS - INTERACTIVE LANDING PAGE LOGIC
   ========================================================================== */

let currentRating = 5;

document.addEventListener('DOMContentLoaded', () => {
    // Initial cost calculation on load
    try {
        calculateCost();
    } catch (err) {
        console.warn('Cost calculation init warning:', err);
    }
});

/* 1. Mobile Navigation Toggle */
function toggleMobileNav() {
    const navLinks = document.getElementById('navLinks');
    const toggleBtn = document.getElementById('mobileMenuBtn');
    if (navLinks) {
        navLinks.classList.toggle('active');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        }
    }
}

function closeMobileNav() {
    const navLinks = document.getElementById('navLinks');
    const toggleBtn = document.getElementById('mobileMenuBtn');
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            if (icon) icon.className = 'fa-solid fa-bars';
        }
    }
}

/* 2. Interactive Star Rating Selector */
function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('#starRating i');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

/* 3. Global Appointments Store & Form Submission Handlers */
let APPOINTMENTS_STORE = [
    { id: 'DAN-84920', name: 'Rajesh Kumar', phone: '+91 98490 12345', clinic: 'Gachibowli', service: 'Single Tooth Implant', date: '2026-07-25', time: '10:30', status: 'Confirmed' },
    { id: 'DAN-84921', name: 'Priya Sharma', phone: '+91 97012 34567', clinic: 'Kondapur', service: 'All-on-4 Dental Implants', date: '2026-07-26', time: '14:00', status: 'Pending' }
];

function handleFormSubmit(e, formType = 'Form') {
    if (e && e.preventDefault) e.preventDefault();
    const form = e ? e.target : null;
    if (!form) return;

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn ? btn.innerHTML : '';

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    }

    setTimeout(() => {
        if (form.id === 'mainBookingForm') {
            const name = document.getElementById('bName') ? document.getElementById('bName').value : 'Patient';
            const phone = document.getElementById('bPhone') ? document.getElementById('bPhone').value : '';
            const email = document.getElementById('bEmail') ? document.getElementById('bEmail').value : '';
            const clinic = document.getElementById('bClinic') ? document.getElementById('bClinic').value : 'Gachibowli';
            const service = document.getElementById('bService') ? document.getElementById('bService').value : 'Consultation';
            const date = document.getElementById('bDate') ? document.getElementById('bDate').value : 'Upcoming';
            const time = document.getElementById('bTime') ? document.getElementById('bTime').value : '10:00 AM';

            const newId = `DAN-${Math.floor(10000 + Math.random() * 90000)}`;
            const newApt = { id: newId, name, phone, email, clinic, service, date, time, status: 'Confirmed' };
            APPOINTMENTS_STORE.unshift(newApt);

            const cardMain = form.closest('.booking-card-main');
            if (cardMain) {
                cardMain.innerHTML = `
                    <div style="background: #E8F7F6; border-radius: 20px; padding: 32px; text-align: center; border: 1px solid #A8DADA;">
                        <div style="width: 56px; height: 56px; border-radius: 50%; background: #087979; color: #fff; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto; font-size: 1.5rem;">
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <h3 style="font-family: var(--font-heading); font-size: 1.75rem; color: #111827; margin-bottom: 8px;">Appointment Confirmed!</h3>
                        <p style="font-size: 0.95rem; color: #374151; margin-bottom: 16px;">
                            Thank you, <strong>${name}</strong>. Your appointment has been booked.
                        </p>
                        <div style="background: #fff; border-radius: 12px; padding: 16px; text-align: left; margin: 0 auto 20px auto; max-width: 400px; border: 1px solid #E5E7EB; font-size: 0.9rem;">
                            <div><strong>Booking ID:</strong> ${newId}</div>
                            <div><strong>Clinic:</strong> Dantam ${clinic}</div>
                            <div><strong>Service:</strong> ${service}</div>
                            <div><strong>Date & Time:</strong> ${date} at ${time}</div>
                        </div>
                        <button class="btn btn-pill-primary" onclick="location.reload()">
                            Book Another Appointment
                        </button>
                    </div>
                `;
            }
        } else if (formType === 'Review') {
            alert(`⭐ Thank you! Your ${currentRating}-star review has been submitted for moderation.`);
            form.reset();
        } else if (formType === 'Message') {
            alert('📩 Thank you for your message! Our team will get back to you within one business day.');
            form.reset();
        } else if (formType === 'Admin Login') {
            renderAdminDashboard();
        } else {
            alert('🎉 Success! Request received. Our clinic team will reach out to you shortly.');
            form.reset();
        }

        if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalText;
        }
    }, 1000);
}

function renderAdminDashboard() {
    const adminCard = document.querySelector('#adminAuthModal .admin-modal-card');
    if (!adminCard) return;

    adminCard.style.maxWidth = '920px';
    adminCard.innerHTML = `
        <button type="button" class="modal-close-icon" onclick="closeAdminModal()">
            <i class="fa-solid fa-xmark"></i>
        </button>
        
        <div class="admin-header-brand">
            <div class="admin-logo-icon">D</div>
            <div class="admin-logo-text">Dantam Dental Admin Dashboard</div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <div>
                <h2 class="admin-title" style="font-size: 1.4rem; margin: 0;">Live Patient Appointments</h2>
                <p class="admin-subtitle" style="margin: 0;">Review and manage consultation requests</p>
            </div>
            <button class="btn btn-pill-secondary btn-sm" onclick="location.reload()">
                Sign out
            </button>
        </div>

        <div style="overflow-x: auto; border: 1px solid #E5E7EB; border-radius: 12px;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
                <thead>
                    <tr style="background: #E8F7F6; border-bottom: 1px solid #CBD5E1; color: #087979;">
                        <th style="padding: 12px 16px;">ID</th>
                        <th style="padding: 12px 16px;">Patient</th>
                        <th style="padding: 12px 16px;">Phone</th>
                        <th style="padding: 12px 16px;">Clinic</th>
                        <th style="padding: 12px 16px;">Service</th>
                        <th style="padding: 12px 16px;">Date</th>
                        <th style="padding: 12px 16px;">Status</th>
                        <th style="padding: 12px 16px;">Actions</th>
                    </tr>
                </thead>
                <tbody id="adminTableBody">
                    ${APPOINTMENTS_STORE.map(apt => `
                        <tr style="border-bottom: 1px solid #F1F5F9;">
                            <td style="padding: 12px 16px; font-weight: 700;">${apt.id}</td>
                            <td style="padding: 12px 16px; font-weight: 600;">${apt.name}</td>
                            <td style="padding: 12px 16px;">${apt.phone}</td>
                            <td style="padding: 12px 16px;">${apt.clinic}</td>
                            <td style="padding: 12px 16px;">${apt.service}</td>
                            <td style="padding: 12px 16px;">${apt.date}</td>
                            <td style="padding: 12px 16px;">
                                <span style="padding: 4px 10px; border-radius: 12px; font-size: 0.78rem; font-weight: 700; background: ${apt.status === 'Confirmed' ? '#DCFCE7' : '#FEF9C3'}; color: ${apt.status === 'Confirmed' ? '#15803D' : '#A16207'};">
                                    ${apt.status}
                                </span>
                            </td>
                            <td style="padding: 12px 16px;">
                                <button style="border: none; background: #087979; color: #fff; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; cursor: pointer;" onclick="alert('Appointment ${apt.id} Approved')">Approve</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

/* 4. Reschedule Request Toggle & Form Handlers */
function toggleRescheduleInline(expand) {
    const btn = document.getElementById('openRescheduleBtn');
    const body = document.getElementById('rescheduleInlineBody');
    if (expand) {
        if (btn) btn.style.display = 'none';
        if (body) body.style.display = 'block';
    } else {
        if (btn) btn.style.display = 'inline-flex';
        if (body) body.style.display = 'none';
    }
}

function openRescheduleModal() {
    toggleRescheduleInline(true);
}

/* 4b. Admin Auth Modal Handlers */
function openAdminModal() {
    const modal = document.getElementById('adminAuthModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeAdminModal() {
    const modal = document.getElementById('adminAuthModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/* 5. Interactive Cost Calculator Logic */
function calculateCost() {
    const teethRange = document.getElementById('teethRange');
    const teethValLabel = document.getElementById('teethVal');
    const brandSelect = document.getElementById('implantBrand');
    const boneGraftRadio = document.querySelector('input[name="boneGraft"]:checked');
    const costDisplay = document.getElementById('totalCostDisplay');
    const emiDisplay = document.getElementById('emiDisplay');

    if (!teethRange || !brandSelect || !costDisplay) return;

    const count = parseInt(teethRange.value, 10) || 1;
    if (teethValLabel) {
        teethValLabel.textContent = count === 1 ? '1 Tooth' : (count === 14 ? 'Full Arch (14 Teeth)' : `${count} Teeth`);
    }

    // Dynamic track background fill using exact teal #087979
    const percentage = ((count - 1) / (14 - 1)) * 100;
    teethRange.style.background = `linear-gradient(to right, #087979 ${percentage}%, #E2E8F0 ${percentage}%)`;

    let ratePerTooth = 45000;
    if (brandSelect.value === 'standard') ratePerTooth = 25000;
    if (brandSelect.value === 'swiss') ratePerTooth = 75000;

    let baseCost = count * ratePerTooth;

    // Package discount for full arch / multi teeth
    if (count >= 12) {
        baseCost = Math.round(baseCost * 0.75); // 25% full arch discount
    } else if (count >= 4) {
        baseCost = Math.round(baseCost * 0.85); // 15% multi-tooth discount
    }

    if (boneGraftRadio && boneGraftRadio.value === 'yes') {
        baseCost += 25000;
    }

    const minCost = Math.round(baseCost * 0.9);
    const maxCost = Math.round(baseCost * 1.1);
    const monthlyEMI = Math.round(baseCost / 12);

    costDisplay.textContent = `₹${minCost.toLocaleString('en-IN')} - ₹${maxCost.toLocaleString('en-IN')}`;
    if (emiDisplay) {
        emiDisplay.textContent = `₹${monthlyEMI.toLocaleString('en-IN')} / mo`;
    }
}

/* 6. FAQ Accordion Logic with Plus / Close Icon Switch */
function toggleFAQ(button) {
    if (!button) return;
    const faqCard = button.parentElement;
    if (!faqCard) return;

    const isActive = faqCard.classList.contains('active');

    // Close all FAQs and reset icons to plus
    document.querySelectorAll('.faq-item-card').forEach(card => {
        card.classList.remove('active');
        const iconContainer = card.querySelector('.toggle-circle-icon');
        if (iconContainer) {
            iconContainer.innerHTML = '<i class="fa-solid fa-plus"></i>';
        }
    });

    // Open clicked FAQ if it wasn't active and change icon to xmark
    if (!isActive) {
        faqCard.classList.add('active');
        const iconContainer = faqCard.querySelector('.toggle-circle-icon');
        if (iconContainer) {
            iconContainer.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        }
    }
}

/* 7. Navbar Shadow Effect on Scroll */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 40) {
            navbar.style.boxShadow = '0 4px 20px rgba(8, 121, 121, 0.12)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});

/* 8. Exact Google Maps Place Location & Directions Handler */
function getExactDirections(searchQuery) {
    const encodedQuery = encodeURIComponent(searchQuery);
    const placeUrl = `https://www.google.com/maps/search/?api=1&query=${encodedQuery}`;
    window.open(placeUrl, '_blank', 'noopener,noreferrer');
}

/* 9. Feature & Treatment Information Modal Data & Handlers (Exact Screenshots 1–4) */
const CLINIC_INFO_DATA = {
    'specialists': {
        title: 'Experienced Implant Specialists',
        subtitle: '15+ years placing implants with predictable, long-term outcomes.',
        icon: 'fa-solid fa-wand-magic-sparkles',
        checklist: [
            'Board-certified implantologists with thousands of successful placements',
            'Continuous training in the latest surgical and prosthetic protocols',
            'In-house prosthodontists, periodontists, and oral surgeons for complex cases',
            'Case-by-case planning reviewed by a multi-specialist team'
        ],
        buttonText: 'Book consultation',
        serviceValue: 'Consultation'
    },
    '3d-planning': {
        title: 'Advanced 3D Digital Implant Planning',
        subtitle: 'Millimeter-precise placement, guided by CBCT and digital workflows.',
        icon: 'fa-solid fa-expand',
        checklist: [
            'Cone Beam CT (CBCT) scans map bone volume, nerves, and sinus anatomy',
            'Digital smile design previews your final result before treatment begins',
            'Computer guided surgical stents for exact implant angulation and depth',
            'Reduced surgery time, less swelling, and faster recovery'
        ],
        buttonText: 'Book consultation',
        serviceValue: 'Consultation'
    },
    'natural-results': {
        title: 'Natural-Looking & Long-Lasting Results',
        subtitle: 'Crowns crafted to match your smile — indistinguishable from natural teeth.',
        icon: 'fa-regular fa-star',
        checklist: [
            'High-strength zirconia and layered ceramic crowns for lifelike aesthetics',
            'Custom shade matching under natural and clinic lighting',
            'Emergence profile shaped for healthy, natural-looking gum contours',
            'Backed by long-term warranties and follow-up care'
        ],
        buttonText: 'Book consultation',
        serviceValue: 'Single Implant'
    },
    'premium-systems': {
        title: 'Premium Implant Systems',
        subtitle: 'Worldwide recognized implant brands for long-term biocompatibility.',
        icon: 'fa-solid fa-shield-halved',
        checklist: [
            'Grade-4 pure medical titanium implants for optimal osseointegration',
            'US-FDA and CE certified international implant brands',
            'Authentic manufacturer warranty certificate provided with every implant',
            'Advanced surface treatment for faster bone healing and stability'
        ],
        buttonText: 'Book consultation',
        serviceValue: 'Single Implant'
    },
    'flexible-emi': {
        title: 'Flexible EMI & Affordable Pricing',
        subtitle: 'Transparent costs with 0% interest monthly payment options.',
        icon: 'fa-regular fa-credit-card',
        checklist: [
            '0% interest EMI options available up to 12 months',
            'Upfront all-inclusive quotes with zero hidden fees',
            'Flexible payment plans customized to your treatment phase',
            'Assistance with insurance documentation and claims'
        ],
        buttonText: 'Book consultation',
        serviceValue: 'Consultation'
    },
    'personalized-care': {
        title: 'Personalized Care & Comfortable Treatment',
        subtitle: 'Painless procedures in a calm, modern clinical environment.',
        icon: 'fa-regular fa-heart',
        checklist: [
            'Computerized painless local anesthesia delivery system',
            'Dedicated patient care coordinator for your entire journey',
            'Sedation options for anxious or needle-phobic patients',
            'Comprehensive post-operative care instructions and 24/7 helpline'
        ],
        buttonText: 'Book consultation',
        serviceValue: 'Consultation'
    },
    'single-implant': {
        title: 'Single Tooth Implants',
        subtitle: 'Replace a single missing tooth with a standalone crown.',
        priceRange: '₹25,000 – ₹45,000 per unit',
        duration: '3 – 4 months',
        hasPriceBox: true,
        checklistHeading: "What's included",
        checklist: [
            'Standalone titanium post placed directly in missing tooth gap',
            'Custom zirconia or ceramic crown color-matched to natural teeth',
            'Protects adjacent teeth from being ground down for a traditional bridge',
            'Prevents jawbone deterioration and maintains facial structure',
            'Full 100% chewing force restoration for all types of food'
        ],
        footnote: 'Prices and timelines are indicative. Your specialist will provide a personalized plan after a 3D consultation.',
        buttonText: 'Book this treatment',
        serviceValue: 'Single Implant'
    },
    'multiple-implants': {
        title: 'Multiple Teeth Implants',
        subtitle: 'Implant-supported bridges for two or more missing teeth in a row.',
        priceRange: '₹60,000 – ₹1,80,000 (2–4 units)',
        duration: '3 – 5 months',
        hasPriceBox: true,
        checklistHeading: "What's included",
        checklist: [
            'Two or more implants support a fixed bridge of natural-looking crowns',
            'More stable and hygienic than a traditional cemented bridge',
            'No damage to adjacent healthy teeth',
            'Restores full chewing efficiency and speech',
            'Distributes bite forces evenly, protecting the jawbone'
        ],
        footnote: 'Prices and timelines are indicative. Your specialist will provide a personalized plan after a 3D consultation.',
        buttonText: 'Book this treatment',
        serviceValue: 'Multiple Implants'
    },
    'full-mouth': {
        title: 'Full Mouth Dental Implants',
        subtitle: 'Complete arch fixed restoration for missing or failing teeth.',
        priceRange: '₹1,80,000 – ₹3,50,000 per arch',
        duration: '3 – 6 months',
        hasPriceBox: true,
        checklistHeading: "What's included",
        checklist: [
            '6 to 8 strategic implants per arch to support a permanent set of teeth',
            'Fixed permanent bridge eliminating loose dentures forever',
            'Immediate temporary fixed teeth provided where clinically suitable',
            'Complete restoration of smile aesthetics, speech, and chewing',
            'Computer-guided surgical placement for optimal bone support'
        ],
        footnote: 'Prices and timelines are indicative. Your specialist will provide a personalized plan after a 3D consultation.',
        buttonText: 'Book this treatment',
        serviceValue: 'Full Mouth'
    },
    'all-on-4': {
        title: 'All-on-4 Dental Implants',
        subtitle: 'Full arch fixed teeth supported by just 4 strategic implants.',
        priceRange: '₹1,50,000 – ₹2,80,000 per arch',
        duration: '3 – 5 months',
        hasPriceBox: true,
        checklistHeading: "What's included",
        checklist: [
            'Entire full arch of fixed teeth anchored on only 4 tilted implants',
            'Avoids complex bone grafting procedures in most patients',
            'Fixed provisional teeth attached within 24 to 48 hours',
            'High stability and aesthetic outcome with reduced recovery time',
            'Easy to clean and maintain with long-term clinical predictability'
        ],
        footnote: 'Prices and timelines are indicative. Your specialist will provide a personalized plan after a 3D consultation.',
        buttonText: 'Book this treatment',
        serviceValue: 'All-on-4'
    }
};

function openInfoModal(infoKey) {
    const data = CLINIC_INFO_DATA[infoKey];
    if (!data) return;

    const modal = document.getElementById('featureInfoModal');
    if (!modal) return;

    const container = modal.querySelector('.info-modal-card-ref') || modal.querySelector('.info-modal-card');
    if (!container) return;

    // Render Price Box HTML if present
    let priceBoxHtml = '';
    if (data.hasPriceBox) {
        priceBoxHtml = `
            <div class="info-modal-price-box">
                <div>
                    <div class="info-price-col-title">PRICE RANGE</div>
                    <div class="info-price-col-val">${data.priceRange}</div>
                </div>
                <div>
                    <div class="info-price-col-title">TREATMENT DURATION</div>
                    <div class="info-price-col-val">${data.duration}</div>
                </div>
            </div>
        `;
    }

    // Render Icon Badge HTML if present
    let iconBadgeHtml = '';
    if (data.icon) {
        iconBadgeHtml = `
            <div class="info-modal-badge-icon">
                <i class="${data.icon}"></i>
            </div>
        `;
    }

    // Render Checklist HTML
    let checklistHeadingHtml = '';
    if (data.checklistHeading) {
        checklistHeadingHtml = `<div class="info-modal-checklist-heading">${data.checklistHeading}</div>`;
    }

    const checklistItemsHtml = data.checklist.map(item => `
        <li>
            <span class="info-check-circle"><i class="fa-solid fa-check"></i></span>
            <span>${item}</span>
        </li>
    `).join('');

    // Render Footnote HTML if present
    let footnoteHtml = '';
    if (data.footnote) {
        footnoteHtml = `<div class="info-modal-footnote">${data.footnote}</div>`;
    }

    container.innerHTML = `
        <button type="button" class="modal-close-icon" onclick="closeInfoModal()" aria-label="Close modal">
            <i class="fa-solid fa-xmark"></i>
        </button>
        
        ${iconBadgeHtml}
        
        <h2 class="info-modal-ref-title">${data.title}</h2>
        <p class="info-modal-ref-sub">${data.subtitle}</p>

        ${priceBoxHtml}

        ${checklistHeadingHtml}

        <ul class="info-modal-ref-list">
            ${checklistItemsHtml}
        </ul>

        ${footnoteHtml}

        <div class="info-modal-action-row">
            <button type="button" class="btn btn-pill-primary" id="infoModalCtaBtn">
                ${data.buttonText} <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    `;

    const ctaBtn = document.getElementById('infoModalCtaBtn');
    if (ctaBtn) {
        ctaBtn.onclick = () => {
            closeInfoModal();
            const serviceSelect = document.getElementById('bService');
            if (serviceSelect && data.serviceValue) {
                serviceSelect.value = data.serviceValue;
            }
            const bookingSection = document.getElementById('booking-form');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
            }
        };
    }

    modal.classList.add('active');
}

function closeInfoModal() {
    const modal = document.getElementById('featureInfoModal');
    if (modal) {
        modal.classList.remove('active');
    }
}
