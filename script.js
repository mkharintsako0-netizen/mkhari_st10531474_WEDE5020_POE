'use strict'

const CONTACT_EMAIL = 'info@ecoshine.co.za';
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const VAT_RATE = 0.15;
const SHOP_LOCATION = { lat: -26.504718570416895, lng: 27.779282943407797 };

const SERVICES = [
    { id: 'residential', name: 'Residential Cleaning', category: 'Home', price: 150, unit: 'hour', description: 'Regular or once-off cleaning for houses and flats using plant-based products.' },
    { id: 'commercial', name: 'Commercial Cleaning', category: 'Business', price: 200, unit: 'hour', description: 'Offices, shops and shared spaces cleaned around your working hours.' },
    { id: 'window', name: 'Window Washing', category: 'Home', price: 100, unit: 'task', description: 'Streak-free windows, inside and out, with no harsh chemicals.' },
    { id: 'carpet', name: 'Carpet Cleaning', category: 'Specialist', price: 250, unit: 'session', description: 'Deep carpet cleaning that lifts stains and odours safely.' },
    { id: 'green', name: 'Green Cleaning Solutions', category: 'Specialist', price: 300, unit: 'session', description: 'A full eco-friendly clean using certified low-impact products.' },
    { id: 'waxing', name: 'Exterior Waxing', category: 'Specialist', price: 150, unit: 'session', description: 'Protective, eco-friendly wax finish for vehicle exteriors.' }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const rand = (amount) => 'R' + amount.toFixed(2);

// Builds an element safely: text goes in as textContent, never as HTML
function el(tag, { text, className, attrs } = {}, children = []) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    if (attrs) Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    children.forEach((child) => node.append(child));
    return node;
}

function injectStyles() {
    const css = `
[hidden]{display:none !important}
:focus-visible{outline:3px solid #48a972;outline-offset:3px}
nav ul li a.active{color:#48a972;border-bottom:2px solid #48a972;padding-bottom:4px}

.reveal:not(.visible){opacity:0;transform:translateY(24px)}
.reveal.visible{animation:fadeUp .6s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@media (prefers-reduced-motion:reduce){
  .reveal:not(.visible){opacity:1;transform:none}
  .reveal.visible{animation:none}
}

.btn-green{background:#1f3a2b;color:#fff;padding:10px 20px;border:none;border-radius:8px;font-family:inherit;font-weight:600;font-size:.95rem;cursor:pointer;text-decoration:none;display:inline-block;transition:all .3s ease}
.btn-green:hover{background:#48a972}
.back-to-top{position:fixed;right:20px;bottom:20px;width:46px;height:46px;border-radius:50%;border:none;background:#1f3a2b;color:#fff;font-size:1.3rem;cursor:pointer;box-shadow:0 8px 24px rgba(31,58,43,.2);z-index:900}
.back-to-top:hover{background:#48a972}

.service-controls{display:flex;flex-wrap:wrap;gap:12px;margin-bottom:12px}
.service-controls input,.service-controls select{padding:10px 14px;border:1px solid #cbd5e1;border-radius:8px;background:#f8fafc;font-family:inherit;font-size:.95rem;color:#2d3748}
.service-controls input{flex:1 1 220px}
.service-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px}
.service-card{background:#e2f1e8;border-top:4px solid #48a972;border-radius:12px;padding:20px;display:flex;flex-direction:column;gap:8px}
.service-card h3{color:#1f3a2b}
.service-card .badge{align-self:flex-start;background:#fff;color:#1f3a2b;font-size:.8rem;font-weight:600;padding:2px 10px;border-radius:20px}
.service-card p{margin-bottom:0 !important}
.service-card .btn-green{margin-top:auto;align-self:flex-start}
.price{font-weight:700;color:#1f3a2b !important}
#service-count{font-size:.9rem}

.accordion-item{border:1px solid rgba(72,169,114,.3);border-radius:12px;margin-bottom:10px;overflow:hidden}
.accordion-header{width:100%;text-align:left;background:#e2f1e8;color:#1f3a2b;padding:14px 18px;font-family:inherit;font-size:1rem;font-weight:600;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center}
.accordion-header::after{content:'+';font-size:1.4rem;line-height:1}
.accordion-header[aria-expanded="true"]::after{content:'\\2212'}
.accordion-panel{max-height:0;overflow:hidden;transition:max-height .35s ease;background:#fff}
.accordion-panel p{padding:14px 18px;margin:0 !important}

.modal-overlay{position:fixed;inset:0;background:rgba(31,58,43,.65);display:none;align-items:center;justify-content:center;padding:20px;z-index:1000}
.modal-overlay.open{display:flex;animation:fadeUp .25s ease}
.modal{position:relative;background:#fff;border-radius:18px;max-width:480px;width:100%;padding:32px 28px 28px;box-shadow:0 16px 32px rgba(31,58,43,.15)}
.modal h3{color:#1f3a2b;margin-bottom:8px}
.modal p{color:#64748b;margin-bottom:14px}
.modal .btn-primary{display:inline-block}
.modal-close{position:absolute;top:8px;right:12px;background:none;border:none;font-size:1.8rem;line-height:1;cursor:pointer;color:#1f3a2b}
.modal.lightbox{max-width:900px;background:transparent;box-shadow:none;padding:36px 0 0;text-align:center}
.modal.lightbox .modal-close{color:#fff;right:0}
.lightbox img{max-width:100%;max-height:70vh;width:auto !important;border-radius:12px}
.lightbox figure{margin:0}
.lightbox figcaption{color:#fff;margin:10px 0}
.lightbox-nav{display:flex;justify-content:center;gap:12px}
.lightbox-trigger{cursor:zoom-in}

form input[type="tel"],form input[type="date"],form input[type="number"],form select{width:100%;padding:12px 16px;border:1px solid #cbd5e1;border-radius:8px;font-family:inherit;font-size:.95rem;background-color:#f8fafc;transition:all .4s ease}
form input[type="tel"]:focus,form input[type="date"]:focus,form input[type="number"]:focus,form select:focus{outline:none;border-color:#48a972;box-shadow:0 0 0 3px rgba(72,169,114,.2);background-color:#fff}
form .invalid{border-color:#b91c1c !important}
.field-error{color:#b91c1c;font-size:.85rem;font-weight:500;min-height:1.1em}
.field-hint{color:#64748b;font-size:.85rem;font-weight:400}
.form-status{font-weight:600;margin-top:12px}
.form-status.info{color:#64748b}
.form-status.success{color:#1e5631}
.form-status.error{color:#b91c1c}
.result-box{background:#e2f1e8;border-left:4px solid #48a972;border-radius:10px;padding:18px 22px;margin-top:20px}
.result-box h3{color:#1f3a2b;margin-bottom:10px}
.result-box p{color:#2d3748;margin-bottom:6px}
.result-box pre{white-space:pre-wrap;word-wrap:break-word;font-family:inherit;background:#fff;border-radius:8px;padding:12px;margin:10px 0 14px}
.result-box .btn-primary{display:inline-block}
#map{height:320px;border-radius:12px;margin-top:16px;z-index:1}
`;
    document.head.append(el('style', { text: css, attrs: { id: 'part3-styles' } }));
}

const overlay = (() => {
    let root, box, closeBtn, lastFocus;

    function build() {
        root = el('div', { className: 'modal-overlay', attrs: { role: 'dialog', 'aria-modal': 'true' } });
        box = el('div', { className: 'modal' });
        closeBtn = el('button', { className: 'modal-close', text: '\u00D7', attrs: { type: 'button', 'aria-label': 'Close' } });
        root.append(box);
        document.body.append(root);

        closeBtn.addEventListener('click', close);
        root.addEventListener('click', (event) => { if (event.target === root) close(); });
        document.addEventListener('keydown', (event) => {
            if (!isOpen()) return;
            if (event.key === 'Escape') close();
            if (event.key === 'Tab') { // keep keyboard focus inside the dialog
                const focusable = $$('button, a[href]', box);
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    }

    function isOpen() { return Boolean(root) && root.classList.contains('open'); }

    function open(content, label, extraClass = '') {
        if (!root) build();
        if (!isOpen()) lastFocus = document.activeElement;
        box.className = 'modal ' + extraClass;
        box.replaceChildren(closeBtn, content);
        root.setAttribute('aria-label', label);
        root.classList.add('open');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function close() {
        root.classList.remove('open');
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }

    return { open, close, isOpen, box: () => box };
})();


function initNav() {
    $$('nav ul').forEach((list) => {
        if (!$('a[href="enquiry.html"]', list)) {
            const item = el('li', {}, [el('a', { text: 'Enquiry', attrs: { href: 'enquiry.html' } })]);
            const contact = $('a[href="contact.html"]', list);
            if (contact) contact.parentElement.before(item);
            else list.append(item);
        }
    });
    const current = location.pathname.split('/').pop() || 'index.html';
    $$('nav a').forEach((link) => {
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    $$('main section').forEach((section) => {
        section.classList.add('reveal');
        observer.observe(section);
    });
}

function initBackToTop() {
    const button = el('button', { className: 'back-to-top', text: '\u2191', attrs: { type: 'button', 'aria-label': 'Back to top', hidden: '' } });
    document.body.append(button);
    window.addEventListener('scroll', () => { button.hidden = window.scrollY < 400; }, { passive: true });
    button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

const FAQS = [
    ['Are your cleaning products safe for children and pets?', 'Yes. We use plant-based, low-toxicity products that are safe for families and pets once surfaces have dried.'],
    ['Do I need to supply cleaning equipment?', 'No. Our team arrives with all the equipment and eco-friendly products needed for the job.'],
    ['When can I book a service?', 'We operate from 9:00 AM to 5:00 PM, Monday to Friday. Use our enquiry page to pick a date and see availability.'],
    ['How is pricing calculated?', 'Prices are per hour, task or session depending on the service. Use the enquiry form for an instant estimate that includes VAT.']
];

function initAccordion() {
    const about = $('#aboutus');
    if (!about) return; // only on the About Us page
    const accordion = el('div', { className: 'accordion' });
    FAQS.forEach(([question, answer], i) => {
        const header = el('button', { className: 'accordion-header', text: question, attrs: { type: 'button', id: 'faq-h' + i, 'aria-expanded': 'false', 'aria-controls': 'faq-p' + i } });
        const panel = el('div', { className: 'accordion-panel', attrs: { id: 'faq-p' + i, role: 'region', 'aria-labelledby': 'faq-h' + i } }, [el('p', { text: answer })]);
        header.addEventListener('click', () => {
            const wasOpen = header.getAttribute('aria-expanded') === 'true';
            $$('.accordion-header', accordion).forEach((other) => setPanel(other, false));
            if (!wasOpen) setPanel(header, true);
        });
        accordion.append(el('div', { className: 'accordion-item' }, [header, panel]));
    });
    const section = el('section', { attrs: { id: 'faq' } }, [el('h2', { text: 'Frequently asked questions' }), accordion]);
    ($('main') || document.body).append(section);
}

function setPanel(button, open) {
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    button.setAttribute('aria-expanded', String(open));
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
}

function openServiceModal(service) {
    const content = el('div', {}, [
        el('h3', { text: service.name }),
        el('p', { className: 'price', text: rand(service.price) + ' per ' + service.unit }),
        el('p', { text: service.description }),
        el('a', { className: 'btn-primary', text: 'Enquire about this service', attrs: { href: 'enquiry.html?service=' + service.id } })
    ]);
    overlay.open(content, service.name + ' details');
}

function serviceCard(service) {
    const button = el('button', { className: 'btn-green', text: 'View details', attrs: { type: 'button' } });
    button.addEventListener('click', () => openServiceModal(service));
    return el('article', { className: 'service-card' }, [
        el('span', { className: 'badge', text: service.category }),
        el('h3', { text: service.name }),
        el('p', { text: service.description }),
        el('p', { className: 'price', text: rand(service.price) + ' per ' + service.unit }),
        button
    ]);
}

function initServices() {
    if (!$('#pricing')) return;

    const search = el('input', { attrs: { type: 'search', id: 'service-search', placeholder: 'Search services...', 'aria-label': 'Search services' } });
    const category = el('select', { attrs: { id: 'service-category', 'aria-label': 'Filter by category' } }, [
        el('option', { text: 'All categories', attrs: { value: 'all' } }),
        ...['Home', 'Business', 'Specialist'].map((c) => el('option', { text: c, attrs: { value: c } }))
    ]);
    const sort = el('select', { attrs: { id: 'service-sort', 'aria-label': 'Sort services' } }, [
        el('option', { text: 'Sort: Name (A to Z)', attrs: { value: 'name' } }),
        el('option', { text: 'Sort: Price (low to high)', attrs: { value: 'price-asc' } }),
        el('option', { text: 'Sort: Price (high to low)', attrs: { value: 'price-desc' } })
    ]);
    const count = el('p', { attrs: { id: 'service-count', 'aria-live': 'polite' } });
    const list = el('div', { className: 'service-grid', attrs: { id: 'service-list' } });

    const section = el('section', { attrs: { id: 'service-browser' } }, [
        el('h2', { text: 'Find a service' }),
        el('p', { text: 'Search, filter and sort our services. Select "View details" for more information.' }),
        el('div', { className: 'service-controls' }, [search, category, sort]),
        count,
        list,
        el('a', { className: 'btn-primary', text: 'Get a free quote', attrs: { href: 'enquiry.html' } })
    ]);
    ($('main') || document.body).append(el('div', { className: 'container' }, [section]));

    const sorters = {
        name: (a, b) => a.name.localeCompare(b.name),
        'price-asc': (a, b) => a.price - b.price,
        'price-desc': (a, b) => b.price - a.price
    };

    function render() {
        const query = search.value.trim().toLowerCase();
        const items = SERVICES
            .filter((s) => category.value === 'all' || s.category === category.value)
            .filter((s) => (s.name + ' ' + s.description).toLowerCase().includes(query))
            .sort(sorters[sort.value]);
        list.replaceChildren(...items.map(serviceCard));
        count.textContent = items.length ?
            'Showing ' + items.length + ' of ' + SERVICES.length + ' services' :
            'No services match your search. Try another word or choose "All categories".';
    }

    [search, category, sort].forEach((control) => control.addEventListener('input', render));
    render();
}

function initLightbox() {
    const images = $$('#gallery-section img, .image-grid img');
    if (!images.length) return;
    let index = 0;

    function show(i) {
        index = (i + images.length) % images.length;
        const source = images[index];
        const prev = el('button', { className: 'btn-green', text: 'Previous', attrs: { type: 'button' } });
        const next = el('button', { className: 'btn-green', text: 'Next', attrs: { type: 'button' } });
        prev.addEventListener('click', () => show(index - 1));
        next.addEventListener('click', () => show(index + 1));
        const content = el('figure', {}, [
            el('img', { attrs: { src: source.getAttribute('src'), alt: source.alt } }),
            el('figcaption', { text: source.alt }),
            el('div', { className: 'lightbox-nav' }, [prev, next])
        ]);
        overlay.open(content, 'Image viewer', 'lightbox');
    }

    images.forEach((image, i) => {
        image.classList.add('lightbox-trigger');
        image.setAttribute('tabindex', '0');
        image.setAttribute('role', 'button');
        image.addEventListener('click', () => show(i));
        image.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                show(i);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (!overlay.isOpen() || !overlay.box().classList.contains('lightbox')) return;
        if (event.key === 'ArrowRight') show(index + 1);
        if (event.key === 'ArrowLeft') show(index - 1);
    });
}

const RULES = {
    name: (v) => /^[A-Za-z\u00C0-\u024F][A-Za-z\u00C0-\u024F' -]{1,59}$/.test(v.trim()) ?
        '' : 'Enter your name using letters only (2 to 60 characters).',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ?
        '' : 'Enter a valid email address, for example name@example.com.',
    phone: (v) => /^(\+27|0)\d{9}$/.test(v.replace(/[\s()-]/g, '')) ?
        '' : 'Enter a valid South African number, for example 012 345 6789 or +27 12 345 6789.',
    phoneOptional: (v) => (v.trim() === '' ? '' : RULES.phone(v)),
    type: (v) => (v ? '' : 'Choose the type of message you are sending.'),
    message: (v) => (v.trim().length >= 10 && v.trim().length <= 1000 ?
        '' : 'Your message must be between 10 and 1000 characters.'),
    service: (v) => (SERVICES.some((s) => s.id === v) ? '' : 'Choose a service.'),
    quantity: (v) => (v !== '' && Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 100 ?
        '' : 'Enter a whole number from 1 to 100.'),
    notes: (v) => (v.length <= 300 ? '' : 'Notes can be up to 300 characters.'),
    date: (v) => {
        if (!v) return 'Choose a preferred date.';
        const date = new Date(v + 'T00:00:00');
        if (Number.isNaN(date.getTime())) return 'Enter a valid date.';
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const limit = new Date(today);
        limit.setFullYear(limit.getFullYear() + 1);
        if (date <= today) return 'Choose a date after today.';
        if (date > limit) return 'We can only take bookings up to a year ahead.';
        if (date.getDay() === 0 || date.getDay() === 6) return 'We operate Monday to Friday. Choose a weekday.';
        return '';
    }
};

function setError(field, message) {
    const slot = document.getElementById(field.id + '-error');
    if (slot) slot.textContent = message;
    field.classList.toggle('invalid', Boolean(message));
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateField(field) {
    const message = RULES[field.dataset.validate](field.value);
    setError(field, message);
    return message;
}

function validateForm(form) {
    let firstInvalid = null;
    $$('[data-validate]', form).forEach((field) => {
        if (validateField(field) && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
}

function attachLiveValidation(form) {
    $$('[data-validate]', form).forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => { if (field.classList.contains('invalid')) validateField(field); });
    });
}

function setStatus(node, message, kind) {
    node.textContent = message;
    node.className = 'form-status ' + kind;
}

// AJAX: send the data without reloading the page
async function postJSON(payload) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error('Request failed with status ' + response.status);
    return response.json();
}

function prepareContactForm() {
    let form = $('#contact-form');
    if (!form) {
        const section = $('#contact');
        if (!section) return null;
        const first = $('label[for="name"]', section);
        const button = $('button[type="submit"]', section);
        if (!first || !button) return null;
        form = el('form', { attrs: { id: 'contact-form', novalidate: '' } });
        const nodes = [];
        for (let node = first; node; node = node.nextElementSibling) {
            nodes.push(node);
            if (node === button) break;
        }
        first.before(form);
        form.append(...nodes);
    }
    form.setAttribute('novalidate', '');

    const name = $('#name', form);
    const email = $('#email', form);
    const message = $('#message', form);

    name.dataset.validate = 'name';
    name.setAttribute('minlength', '2');
    name.setAttribute('maxlength', '60');
    email.dataset.validate = 'email';
    message.dataset.validate = 'message';
    message.setAttribute('minlength', '10');
    message.setAttribute('maxlength', '1000');
    message.setAttribute('rows', '6');

    if (!$('#phone', form)) {
        const phone = el('input', { attrs: { type: 'tel', id: 'phone', name: 'phone', placeholder: '012 345 6789', autocomplete: 'tel' } });
        email.after(el('label', { text: 'Phone (optional):', attrs: { for: 'phone' } }), phone);
    }
    $('#phone', form).dataset.validate = 'phoneOptional';

    if (!$('#type', form)) {
        const type = el('select', { attrs: { id: 'type', name: 'type', required: '' } }, [
            el('option', { text: 'Choose one...', attrs: { value: '' } }),
            el('option', { text: 'General question', attrs: { value: 'general' } }),
            el('option', { text: 'Booking request', attrs: { value: 'booking' } }),
            el('option', { text: 'Feedback', attrs: { value: 'feedback' } }),
            el('option', { text: 'Complaint', attrs: { value: 'complaint' } })
        ]);
        $('label[for="message"]', form).before(el('label', { text: 'Type of message:', attrs: { for: 'type' } }), type);
    }
    $('#type', form).dataset.validate = 'type';

    $$('[data-validate]', form).forEach((field) => {
        if (!document.getElementById(field.id + '-error')) {
            field.after(el('span', { className: 'field-error', attrs: { id: field.id + '-error', 'aria-live': 'polite' } }));
        }
    });

    if (!$('#message-count')) message.after(el('span', { className: 'field-hint', text: '0 / 1000', attrs: { id: 'message-count' } }));
    if (!$('#form-status')) {
        form.after(
            el('p', { className: 'form-status', attrs: { id: 'form-status', 'aria-live': 'polite' } }),
            el('div', { className: 'result-box', attrs: { id: 'email-preview', hidden: '' } })
        );
    }
    return form;
}

function initContactForm() {
    const form = prepareContactForm();
    if (!form) return;
    const status = $('#form-status');
    const preview = $('#email-preview');
    const counter = $('#message-count');
    const message = $('#message');

    attachLiveValidation(form);
    message.addEventListener('input', () => { counter.textContent = message.value.length + ' / 1000'; });

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        if (!validateForm(form)) {
            setStatus(status, 'Please fix the highlighted fields and try again.', 'error');
            return;
        }
        const data = Object.fromEntries(new FormData(form));
        const typeLabel = $('#type').selectedOptions[0].text;
        const submit = $('button[type="submit"]', form);
        submit.disabled = true;
        setStatus(status, 'Sending your message...', 'info');

        let delivered = true;
        try { await postJSON(data); } catch (error) { delivered = false; }
        submit.disabled = false;

        const subject = 'EcoShine ' + typeLabel + ' from ' + data.name;
        const body = [
            'Name: ' + data.name,
            'Email: ' + data.email,
            'Phone: ' + ((data.phone || '').trim() || 'Not provided'),
            'Message type: ' + typeLabel,
            '',
            data.message.trim()
        ].join('\n');
        const mailto = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

        preview.replaceChildren(
            el('h3', { text: 'Your email is ready to send' }),
            el('p', { text: 'To: ' + CONTACT_EMAIL }),
            el('p', { text: 'Subject: ' + subject }),
            el('pre', { text: body }),
            el('a', { className: 'btn-primary', text: 'Open in my email app and send', attrs: { href: mailto } })
        );
        preview.hidden = false;

        if (delivered) {
            setStatus(status, 'Thank you, ' + data.name + '. Your details were checked and received. Use the button below to send the email.', 'success');
        } else {
            setStatus(status, 'We could not reach the server, but your email is ready. Use the button below to send it.', 'error');
        }
        preview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

function initEnquiryForm() {
    const form = $('#enquiry-form');
    if (!form) return;
    const serviceSelect = $('#service');
    const quantityLabel = $('#quantity-label');
    const priceHint = $('#price-hint');
    const dateInput = $('#date');
    const status = $('#form-status');
    const result = $('#enquiry-result');

    SERVICES.forEach((s) => serviceSelect.append(el('option', { text: s.name + ' (' + rand(s.price) + ' per ' + s.unit + ')', attrs: { value: s.id } })));

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];

    function updateQuantityLabel() {
        const service = SERVICES.find((s) => s.id === serviceSelect.value);
        quantityLabel.textContent = service ? 'Number of ' + service.unit + 's' : 'Quantity';
        priceHint.textContent = service ? 'Price: ' + rand(service.price) + ' per ' + service.unit : '';
    }
    serviceSelect.addEventListener('change', updateQuantityLabel);

    const preselected = new URLSearchParams(location.search).get('service');
    if (SERVICES.some((s) => s.id === preselected)) serviceSelect.value = preselected;
    updateQuantityLabel();

    attachLiveValidation(form);

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        if (!validateForm(form)) {
            setStatus(status, 'Please fix the highlighted fields and try again.', 'error');
            return;
        }
        const data = Object.fromEntries(new FormData(form));
        const service = SERVICES.find((s) => s.id === data.service);
        const submit = $('button[type="submit"]', form);
        submit.disabled = true;
        setStatus(status, 'Calculating your estimate...', 'info');

        try {
            await postJSON(data);
        } catch (error) {
            submit.disabled = false;
            setStatus(status, 'We could not send your enquiry. Check your connection and try again.', 'error');
            return;
        }
        submit.disabled = false;

        const quantity = Number(data.quantity);
        const subtotal = service.price * quantity;
        const vat = subtotal * VAT_RATE;
        const total = subtotal + vat;
        const date = new Date(data.date + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const daysAway = Math.round((date - today) / 86400000);
        const availability = daysAway <= 2 ?
            'Limited availability. Our team will phone you to confirm a time.' :
            'Available. We have space on this date and will confirm by email.';
        const reference = 'ES-' + Date.now().toString(36).toUpperCase().slice(-6);

        result.replaceChildren(
            el('h3', { text: 'Thank you, ' + data.name + '. Here is your estimate' }),
            el('p', { text: 'Reference: ' + reference }),
            el('p', { text: 'Service: ' + service.name + ' (' + quantity + ' ' + service.unit + (quantity > 1 ? 's' : '') + ')' }),
            el('p', { text: 'Subtotal: ' + rand(subtotal) }),
            el('p', { text: 'VAT (15%): ' + rand(vat) }),
            el('p', { className: 'price', text: 'Estimated total: ' + rand(total) }),
            el('p', { text: 'Preferred date: ' + date.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }),
            el('p', { text: 'Availability: ' + availability }),
            el('a', { className: 'btn-primary', text: 'Contact us to confirm your booking', attrs: { href: 'contact.html' } })
        );
        result.hidden = false;
        setStatus(status, 'Your enquiry was sent successfully.', 'success');
        result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

function loadLeaflet() {
    return new Promise((resolve, reject) => {
        if (typeof L !== 'undefined') { resolve(); return; }
        const link = el('link', { attrs: { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css' } });
        const script = el('script', { attrs: { src: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js' } });
        script.addEventListener('load', resolve);
        script.addEventListener('error', reject);
        document.head.append(link, script);
    });
}

function initMap() {
    if (!$('#contact')) return; // only on the Contact page
    const mapBox = el('div', { attrs: { id: 'map', role: 'region', 'aria-label': 'Map showing the EcoShine location' } });
    const section = el('section', { attrs: { id: 'map-section' } }, [
        el('h2', { text: 'Find us' }),
        el('p', { text: 'Our location on the map. Drag to move and use the buttons to zoom.' }),
        mapBox
    ]);
    ($('main') || document.body).append(section);

    loadLeaflet().then(() => {
        const map = L.map('map').setView([SHOP_LOCATION.lat, SHOP_LOCATION.lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
        }).addTo(map);
        L.marker([SHOP_LOCATION.lat, SHOP_LOCATION.lng]).addTo(map)
            .bindPopup('<strong>EcoShine</strong><br>Mon to Fri, 9:00 AM - 5:00 PM');
    }).catch(() => {
        mapBox.textContent = 'The map could not be loaded. Please check your internet connection.';
    });
}

function start() {
    injectStyles();
    initNav();
    initAccordion();
    initServices();
    initLightbox();
    initContactForm();
    initEnquiryForm();
    initMap();
    initReveal();
    initBackToTop();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();