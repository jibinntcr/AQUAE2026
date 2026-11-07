/**
 * AQUAE Impact & AQUAE Labs — 2026 Biophilic Telemetry & Multi-Page Controller
 * Features:
 * 1. Sticky Frosted Header & Mobile App-Like Navigation Drawer
 * 2. Scroll-Triggered Hardware-Accelerated Reveal Animations
 * 3. Interactive ALCI 7-Domain Heptagon & Telemetry Inspector (alci.html)
 * 4. Interactive Pillar & Workflow Highlighters
 * 5. Institutional Enquiry Form Validation & Topic Pre-Selection (contact.html)
 */

document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('siteHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // 1. Sticky Header Scroll State
  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 16) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Drawer (Optimized for iOS & Android Touch)
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when tapping outside on mobile
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // 3. Smooth Scroll-Triggered Reveal Animations
  const revealTargets = document.querySelectorAll(
    '.surface-card, .work-portal-card, .leader-card, .quote-feature-card, .glass-panel, .telemetry-stat-card, .timeline-step-card, .section-header'
  );

  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    revealTargets.forEach((el, idx) => {
      el.classList.add('reveal-item');
      el.style.transitionDelay = `${(idx % 4) * 55}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  // 4. Interactive ALCI 7-Domain Heptagon & Domain Inspector (on alci.html)
  const domainData = {
    1: {
      code: 'DOMAIN 01 • OXYGEN',
      title: '1. Gross Oxygen Productivity',
      desc: 'Assesses the oxygen production associated with photosynthetic activity and ecosystem productivity.',
      metric: 'Photosynthetic Biomass & Net O₂ Flux',
      application: 'Primary Ecosystem Service & Atmospheric Stability'
    },
    2: {
      code: 'DOMAIN 02 • HYDROLOGY',
      title: '2. Water Purification Productivity',
      desc: 'Evaluates the contribution of ecosystems to natural water purification processes.',
      metric: 'Watershed Filtration & Riparian Bio-Indicators',
      application: 'Freshwater Quality & Hydrological Services'
    },
    3: {
      code: 'DOMAIN 03 • BIOMASS',
      title: '3. Woody Biomass as Bulk Energy',
      desc: 'Measures woody above-ground biomass as an indicator of ecosystem productivity and its potential as a source of renewable energy.',
      metric: 'Allometric Standing Stock & Above-Ground Mass',
      application: 'Structural Carbon & Renewable Bio-Energy Equivalence'
    },
    4: {
      code: 'DOMAIN 04 • MICROCLIMATE',
      title: '4. Cooling Effect Productivity',
      desc: 'Assesses the contribution of vegetation and ecological succession to local temperature regulation and landscape cooling.',
      metric: 'Canopy Evapotranspiration & Thermal Differential',
      application: 'Landscape Microclimate & Heat Mitigation'
    },
    5: {
      code: 'DOMAIN 05 • LIVING SOIL',
      title: '5. Living Soil as a Sustainable Agriculture Product',
      desc: 'Evaluates the ecological value of living soil, including its organic matter and role in supporting soil health and sustainable agriculture.',
      metric: 'Soil Organic Matter (SOM) & Microbial Vitality',
      application: 'Regenerative Agriculture & Subsurface Fertility'
    },
    6: {
      code: 'DOMAIN 06 • WRC',
      title: '6. Soil Water Retention Capacity (WRC)',
      desc: 'Assesses the capacity of soil to retain water and support ecosystem functions and local hydrological processes.',
      metric: 'Infiltration Rate & Soil Moisture Holding Capacity',
      application: 'Drought Resilience & Groundwater Recharge'
    },
    7: {
      code: 'DOMAIN 07 • RSCV',
      title: '7. Biodiversity as a Conservation Product (RSCV)',
      desc: 'Evaluates biodiversity through species richness and Relative Species Conservation Value (RSCV), recognising the conservation importance of species within an ecosystem.',
      metric: 'Species Richness & Relative Species Conservation Value',
      application: 'Habitat Complexity & Trophic Resilience'
    }
  };

  const heptagonNodes = document.querySelectorAll('.heptagon-node');
  const domainCards = document.querySelectorAll('.domain-interactive-card');
  const inspectorCode = document.getElementById('inspectorCode');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorMetric = document.getElementById('inspectorMetric');
  const inspectorApp = document.getElementById('inspectorApp');

  const selectDomain = (id) => {
    const d = domainData[id];
    if (!d) return;

    heptagonNodes.forEach((n) => {
      n.classList.toggle('active', n.getAttribute('data-domain') === String(id));
    });

    domainCards.forEach((c) => {
      c.classList.toggle('active', c.getAttribute('data-domain') === String(id));
    });

    if (inspectorCode) inspectorCode.textContent = d.code;
    if (inspectorTitle) inspectorTitle.textContent = d.title;
    if (inspectorDesc) inspectorDesc.textContent = d.desc;
    if (inspectorMetric) inspectorMetric.textContent = d.metric;
    if (inspectorApp) inspectorApp.textContent = d.application;
  };

  heptagonNodes.forEach((node) => {
    node.addEventListener('click', () => {
      selectDomain(node.getAttribute('data-domain'));
    });
  });

  domainCards.forEach((card) => {
    card.addEventListener('click', () => {
      selectDomain(card.getAttribute('data-domain'));
      const consoleEl = document.querySelector('.alci-interactive-console');
      if (consoleEl && window.innerWidth < 960) {
        consoleEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // 5. Contact & Enquiry Form Controller (contact.html)
  const enquiryForm = document.getElementById('aquaeEnquiryForm');
  const confirmationMessage = document.getElementById('confirmationMessage');
  const resetEnquiryBtn = document.getElementById('resetEnquiryBtn');
  const formErrorMsg = document.getElementById('formErrorMsg');
  const areaSelect = document.getElementById('areaOfEnquiry');
  const enquiryTagBtns = document.querySelectorAll('.enquiry-tag-btn');

  // Pre-select Area of Enquiry if passed via URL parameter (?area=...)
  if (areaSelect) {
    const params = new URLSearchParams(window.location.search);
    const areaParam = params.get('area');
    if (areaParam) {
      Array.from(areaSelect.options).forEach((opt) => {
        if (opt.value.toLowerCase() === areaParam.toLowerCase()) {
          areaSelect.value = opt.value;
        }
      });
    }
  }

  enquiryTagBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetVal = btn.getAttribute('data-area');
      enquiryTagBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      if (areaSelect && targetVal) {
        areaSelect.value = targetVal;
        areaSelect.focus();
      }
    });
  });

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName');
      const workEmail = document.getElementById('workEmail');
      const country = document.getElementById('country');
      const areaOfEnquiry = document.getElementById('areaOfEnquiry');
      const enquiryDescription = document.getElementById('enquiryDescription');
      const privacyConsent = document.getElementById('privacyConsent');

      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.value.trim());

      if (
        !fullName.value.trim() ||
        !emailValid ||
        !country.value.trim() ||
        !areaOfEnquiry.value ||
        !enquiryDescription.value.trim() ||
        !privacyConsent.checked
      ) {
        if (formErrorMsg) {
          formErrorMsg.style.display = 'block';
          formErrorMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      if (formErrorMsg) {
        formErrorMsg.style.display = 'none';
      }

      enquiryForm.style.display = 'none';
      if (confirmationMessage) {
        confirmationMessage.classList.add('visible');
        confirmationMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (resetEnquiryBtn && enquiryForm && confirmationMessage) {
    resetEnquiryBtn.addEventListener('click', () => {
      enquiryForm.reset();
      confirmationMessage.classList.remove('visible');
      enquiryForm.style.display = 'block';
    });
  }
});
