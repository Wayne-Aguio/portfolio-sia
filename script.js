document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // --- DIGITAL BUSINESS CARD & VCF GENERATOR LOGIC ---
    const contactInfo = {
        firstName: "Wayne",
        lastName: "Aguio",
        title: "3rd Year BSIT Student",
        org: "Polytechnic University of the Philippines",
        email: "wj1507398@gmail.com",
        phone: "+639000000000", // Update with your actual phone number if desired
        url: window.location.href.split('#')[0] + "#card"
    };

    // Function to generate and download the vCard (.vcf) file
    function downloadVCard() {
        const vcardData = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `N:${contactInfo.lastName};${contactInfo.firstName};;;`,
            `FN:${contactInfo.firstName} ${contactInfo.lastName}`,
            `ORG:${contactInfo.org}`,
            `TITLE:${contactInfo.title}`,
            `TEL;TYPE=CELL:${contactInfo.phone}`,
            `EMAIL:${contactInfo.email}`,
            `URL:${contactInfo.url}`,
            "END:VCARD"
        ].join("\n");

        const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${contactInfo.firstName}_${contactInfo.lastName}_Contact.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Attach event listener to download button
    const downloadBtn = document.getElementById('download-vcard-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadVCard);
    }

    // Auto-trigger download if someone loaded the page via a specific hash/query (simulating auto-download on QR scan if hosted live)
    if (window.location.hash === '#download-card') {
        setTimeout(downloadVCard, 600);
    }

    // Generate QR Code that directs users to the portfolio card page with an auto-download trigger
    const qrTargetUrl = encodeURIComponent(contactInfo.url + '#download-card');
    const qrImg = document.getElementById('qr-code');
    if (qrImg) {
        qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrTargetUrl}`;
    }
});