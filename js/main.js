/**
 * ZhongKe Fastener — Main Script
 */

document.addEventListener('DOMContentLoaded', function() {

  // Mobile nav
  var mobileToggle = document.getElementById('mobileToggle');
  var navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() { navLinks.classList.toggle('open'); });
    navLinks.querySelectorAll('a').forEach(function(l) { l.addEventListener('click', function() { navLinks.classList.remove('open'); }); });
  }

  // Scroll to top
  var scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() { scrollTopBtn.classList.toggle('visible', window.scrollY > 500); });
    scrollTopBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // Navbar shadow
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() { navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 40px rgba(0,0,0,0.4)' : ''; });
  }

  // ============================================
  // Reveal on scroll
  // ============================================
  var reveals = document.querySelectorAll('.reveal, .cat-card, .cap-card, .prod-detail-card, .process-step, .faq-item, .about-feat');
  function checkReveal() {
    var h = window.innerHeight;
    reveals.forEach(function(el) {
      var r = el.getBoundingClientRect();
      if (r.top < h - 50 && !el.classList.contains('animate-in')) { el.classList.add('animate-in'); }
    });
  }
  if (reveals.length > 0) { checkReveal(); window.addEventListener('scroll', checkReveal); }

  // ============================================
  // Counter animation
  // ============================================
  var counters = document.querySelectorAll('.stat-num[data-target]');
  var countersStarted = false;
  function animateCounters() {
    if (countersStarted) return;
    var first = counters[0];
    if (!first) return;
    var rect = first.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      countersStarted = true;
      counters.forEach(function(c) {
        var target = parseInt(c.getAttribute('data-target'));
        var duration = 2000;
        var start = performance.now();
        function update(now) {
          var elapsed = now - start;
          var progress = Math.min(elapsed / duration, 1);
          // ease-out
          progress = 1 - Math.pow(1 - progress, 3);
          c.textContent = Math.floor(progress * target).toLocaleString();
          if (progress < 1) { requestAnimationFrame(update); } else { c.textContent = target.toLocaleString(); }
        }
        requestAnimationFrame(update);
      });
    }
  }
  if (counters.length > 0) { animateCounters(); window.addEventListener('scroll', animateCounters); }

  // ============================================
  // FAQ accordion
  // ============================================
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', function() {
      var isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(function(i) { i.classList.remove('open'); });
      // Open clicked (unless it was already open)
      if (!isOpen) { item.classList.add('open'); }
    });
  });

  // ============================================
  // Product category cards (homepage)
  // ============================================
  var catCards = document.querySelectorAll('.cat-card[data-cat]');
  if (catCards.length > 0) {
    catCards.forEach(function(card) {
      card.addEventListener('click', function() {
        catCards.forEach(function(c) { c.classList.remove('active'); });
        card.classList.add('active');
        updateProductTable(card.getAttribute('data-cat'));
      });
    });
  }

  // ============================================
  // Inquiry form
  // ============================================
  var inquiryForms = document.querySelectorAll('.inquiry-form');
  inquiryForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var fields = form.querySelectorAll('input, textarea, select');
      var body = 'ZhongKe Fastener — New Inquiry\n\n';
      fields.forEach(function(f) {
        if (f.name) body += f.name.charAt(0).toUpperCase() + f.name.slice(1) + ': ' + (f.value || 'N/A') + '\n';
      });
      body += '\n---\nPlease reply within 24 hours.';
      window.open('mailto:tluo7909@gmail.com?subject=New Inquiry&body=' + encodeURIComponent(body), '_blank');
      var btn = form.querySelector('button[type="submit"]');
      var orig = btn.textContent;
      btn.textContent = 'Email Opened!'; btn.style.background = '#0ea95a'; btn.style.opacity = '1';
      setTimeout(function() { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 3000);
    });
  });

});

// ============================================
// Product table data (homepage)
// ============================================
var productData = {
  bolts: {
    title: 'Bolts — Popular Specifications',
    items: [
      { name: 'Hex Head Bolt', spec: 'M6 – M64', grade: '8.8 / 10.9 / 12.9', material: 'Carbon / Alloy / Stainless', standard: 'GB/T 5782, DIN 931, ISO 4014', surface: 'Black Oxide / Zinc / Dacromet' },
      { name: 'Flange Bolt', spec: 'M5 – M20', grade: '8.8 / 10.9', material: 'Carbon Steel / SS304', standard: 'GB/T 5789, DIN 6921', surface: 'Zinc / Dacromet / Chrome' },
      { name: 'Carriage Bolt', spec: 'M5 – M24', grade: '4.8 / 8.8', material: 'Carbon Steel / Stainless', standard: 'GB/T 14, DIN 603', surface: 'Zinc / Hot-Dip Galv.' },
      { name: 'Socket Head Cap Screw', spec: 'M3 – M36', grade: '8.8 / 10.9 / 12.9 / A2-70', material: 'Alloy Steel / Stainless', standard: 'DIN 912, ISO 4762', surface: 'Black Oxide / Zinc' },
      { name: 'U-Bolt', spec: 'M6 – M30', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'GB/T 2329, DIN 3570', surface: 'Zinc / HDG' },
      { name: 'Double-End Stud', spec: 'M6 – M48', grade: '8.8 / 10.9 / A2-70', material: 'Carbon / Alloy / Stainless', standard: 'DIN 938-939', surface: 'Black Oxide / Zinc' },
      { name: 'Anchor Bolt', spec: 'M12 – M48', grade: '35# / 45# Steel', material: 'Carbon Steel', standard: 'GB/T 799', surface: 'HDG / Dacromet' },
      { name: 'T-Bolt', spec: 'M5 – M24', grade: '8.8 / 10.9', material: 'Carbon / Stainless', standard: 'GB/T 37, DIN 188', surface: 'Black Oxide / Zinc' },
      { name: 'Eye Bolt', spec: 'M6 – M24', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'DIN 444', surface: 'Zinc / Black Oxide' },
      { name: 'Lifting Eye Bolt', spec: 'M6 – M48', grade: '8.8 / 10.9', material: 'Alloy / Stainless', standard: 'DIN 580', surface: 'Zinc / Passivated' },
      { name: 'Weld Bolt', spec: 'M4 – M16', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'GB/T 902', surface: 'Zinc / Copper' },
      { name: 'Low Head Socket Screw', spec: 'M3 – M16', grade: '8.8 / 10.9 / A2-70', material: 'Alloy / Stainless', standard: 'DIN 7984', surface: 'Black Oxide / Passivated' },
      { name: 'Square Head Bolt', spec: 'M5 – M24', grade: '8.8 / 10.9', material: 'Carbon / Stainless', standard: 'DIN 478', surface: 'Zinc / Black Oxide' },
      { name: 'Hex Bolt Fine Thread', spec: 'M8 – M48', grade: '8.8 / 10.9 / 12.9', material: 'Carbon / Alloy / SS', standard: 'DIN 961', surface: 'Zinc / Dacromet / HDG' }
    ]
  },
  nuts: {
    title: 'Nuts — Popular Specifications',
    items: [
      { name: 'Hex Nut', spec: 'M3 – M64', grade: '8 / 10 / 12', material: 'Carbon / Stainless / Brass', standard: 'DIN 934, ISO 4032', surface: 'Zinc / Black Oxide' },
      { name: 'Nylon Insert Lock Nut', spec: 'M3 – M36', grade: '8 / 10', material: 'Carbon / Stainless', standard: 'DIN 985', surface: 'Zinc / Passivated' },
      { name: 'Flange Nut', spec: 'M5 – M20', grade: '8 / 10', material: 'Carbon / Stainless', standard: 'DIN 6923', surface: 'Zinc / Dacromet' },
      { name: 'Cap Nut (Acorn)', spec: 'M4 – M24', grade: '6 / 8', material: 'Carbon / Stainless', standard: 'DIN 1587', surface: 'Zinc / Chrome' },
      { name: 'Wing Nut', spec: 'M4 – M20', grade: '4 / 5', material: 'Carbon / Stainless', standard: 'DIN 315', surface: 'Zinc / Chrome' },
      { name: 'Self-Locking Nut', spec: 'M4 – M30', grade: '8 / 10', material: 'Carbon / Stainless', standard: 'DIN 980', surface: 'Zinc / Dacromet' },
      { name: 'Weld Nut', spec: 'M4 – M16', grade: '8', material: 'Carbon Steel', standard: 'DIN 929', surface: 'Zinc' },
      { name: 'Square Nut', spec: 'M3 – M12', grade: '6 / 8', material: 'Carbon / Stainless', standard: 'DIN 557', surface: 'Plain / Zinc' },
      { name: 'T-Nut', spec: 'M4 – M16', grade: '6 / 8', material: 'Carbon / Stainless', standard: 'DIN 508', surface: 'Zinc / Black Oxide' },
      { name: 'Round Nut', spec: 'M10 – M80', grade: '8', material: 'Carbon / 45#', standard: 'DIN 1804', surface: 'Black Oxide / Zinc' },
      { name: 'Coupling Nut (Long)', spec: 'M4 – M24', grade: '8', material: 'Carbon / Stainless', standard: 'DIN 6334', surface: 'Zinc / Passivated' },
      { name: 'Cage Nut', spec: 'M4 – M12', grade: '—', material: 'Spring Steel', standard: 'Server Rack', surface: 'Zinc / Black Oxide' },
      { name: 'Rivet Nut (Nutsert)', spec: 'M3 – M12', grade: '—', material: 'Carbon / SS / Al', standard: 'GB/T 17880', surface: 'Zinc / Passivated' },
      { name: 'Thin Hex Jam Nut', spec: 'M3 – M36', grade: '6 / 8', material: 'Carbon / Stainless', standard: 'DIN 439', surface: 'Zinc / Passivated' }
    ]
  },
  screws: {
    title: 'Screws — Popular Specifications',
    items: [
      { name: 'Pan Head Self-Tapping', spec: 'ST2.2 – ST6.3', grade: '—', material: 'Carbon / SS410', standard: 'GB/T 845, DIN 968', surface: 'Zinc / Passivated' },
      { name: 'CSK Self-Tapping', spec: 'ST2.2 – ST6.3', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 969', surface: 'Zinc / Black Oxide' },
      { name: 'Pan Head Machine Screw', spec: 'M2 – M12', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'DIN 7985', surface: 'Zinc / Passivated' },
      { name: 'Countersunk Screw', spec: 'M2 – M12', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'DIN 965', surface: 'Zinc / Passivated' },
      { name: 'Socket Set Screw', spec: 'M2 – M24', grade: '12.9 / A2-70', material: 'Alloy / Stainless', standard: 'DIN 913', surface: 'Black Oxide / Passivated' },
      { name: 'Hex Wood Screw', spec: 'M4 – M16', grade: '—', material: 'Carbon Steel', standard: 'DIN 571', surface: 'Zinc' },
      { name: 'Hex Flange Self-Tap', spec: 'ST3.5 – ST6.3', grade: '—', material: 'Carbon / Stainless', standard: 'GB/T 16824', surface: 'Zinc / Passivated' },
      { name: 'Lifting Eye Screw', spec: 'M8 – M36', grade: '—', material: '20# / Stainless', standard: 'GB/T 825', surface: 'Zinc / Passivated' },
      { name: 'Button Head Socket', spec: 'M3 – M12', grade: '8.8 / 10.9 / A2-70', material: 'Alloy / Stainless', standard: 'ISO 7380', surface: 'Black Oxide / Passivated' },
      { name: 'Drywall Screw', spec: '3.5 – 6.3mm', grade: '—', material: 'Carbon Steel', standard: 'GB/T 14210', surface: 'Black Phosphated' },
      { name: 'Shoulder Screw', spec: 'M5 – M24', grade: '10.9 / 12.9', material: 'Alloy Steel', standard: 'DIN 7379', surface: 'Black Oxide' },
      { name: 'Knurled Thumb Screw', spec: 'M3 – M8', grade: '—', material: 'Stainless / Carbon', standard: 'JB/T 364', surface: 'Plain / Chrome' }
    ]
  },
  washers: {
    title: 'Washers — Popular Specifications',
    items: [
      { name: 'Flat Washer', spec: 'M2 – M64', grade: '200HV / 300HV', material: 'Carbon / Stainless / Copper', standard: 'DIN 125A, ISO 7089', surface: 'Zinc / Plain' },
      { name: 'Spring Lock Washer', spec: 'M2 – M48', grade: '—', material: '65Mn / SS304', standard: 'DIN 127B', surface: 'Black Oxide / Zinc' },
      { name: 'Serrated Lock Washer', spec: 'M3 – M20', grade: '—', material: '65Mn / Stainless', standard: 'DIN 6797', surface: 'Black Oxide' },
      { name: 'Belleville Washer', spec: 'M3 – M30', grade: '—', material: '50CrVA / Stainless', standard: 'DIN 2093', surface: 'Phosphate' },
      { name: 'Tab Washer', spec: 'M3 – M36', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 463', surface: 'Black Oxide' },
      { name: 'Sealing Washer', spec: 'M3 – M24', grade: '—', material: 'Cu / Al / Rubber+Metal', standard: 'JB/ZQ 4403', surface: 'Plain' },
      { name: 'Heavy Flat Washer', spec: 'M5 – M48', grade: '300HV', material: '45# / Alloy Steel', standard: 'DIN 6916', surface: 'Zinc / Dacromet' },
      { name: 'Countersunk Washer', spec: 'M3 – M12', grade: '200HV', material: 'Carbon / Stainless', standard: 'GB/T 848', surface: 'Zinc / Passivated' },
      { name: 'Wave Spring Washer', spec: 'M3 – M24', grade: '—', material: '65Mn / SS304', standard: 'DIN 137B', surface: 'Black Oxide / Passivated' },
      { name: 'Fender Washer', spec: 'M4 – M16', grade: '200HV', material: 'Carbon / Stainless', standard: 'DIN 9021', surface: 'Zinc / Passivated' },
      { name: 'Wedge Lock Washer', spec: 'M4 – M24', grade: '—', material: 'Alloy / SS316', standard: 'Nord-Lock Type', surface: 'Delta Protekt' },
      { name: 'Curved Spring Washer', spec: 'M3 – M20', grade: '—', material: '65Mn / SS304', standard: 'DIN 137A', surface: 'Black Oxide' }
    ]
  },
  rivets: {
    title: 'Rivets — Popular Specifications',
    items: [
      { name: 'Open-End Blind Rivet', spec: '2.4 – 6.4mm', grade: '—', material: 'Al / Steel / Stainless', standard: 'DIN 7337', surface: 'Plain / Zinc' },
      { name: 'Closed-End Blind Rivet', spec: '3.2 – 6.4mm', grade: '—', material: 'Al / Steel / Stainless', standard: 'GB/T 12616', surface: 'Plain / Zinc' },
      { name: 'Solid Rivet', spec: '2 – 20mm', grade: '—', material: 'Steel / Cu / Al', standard: 'DIN 660-662', surface: 'Plain / Zinc' },
      { name: 'Drive Rivet', spec: '3.2 – 6.4mm', grade: '—', material: 'Al / Steel', standard: 'DIN 7338', surface: 'Plain / Zinc' },
      { name: 'Lockbolt (Huck)', spec: '4.0 – 12.0mm', grade: '10.9 / 12.9', material: 'Carbon / Alloy Steel', standard: 'GB/T 26565', surface: 'Zinc / Dacromet' },
      { name: 'Peel-Type Blind Rivet', spec: '3.2 – 6.4mm', grade: '—', material: 'Al / Stainless', standard: 'GB/T 12618', surface: 'Passivated' },
      { name: 'Round Head Rivet', spec: '1.5 – 10mm', grade: '—', material: 'Steel / Cu / Al', standard: 'GB/T 867', surface: 'Plain / Zinc' },
      { name: 'Button Head Rivet', spec: '2 – 16mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 660', surface: 'Plain / Zinc' },
      { name: 'Large Flange Blind Rivet', spec: '3.2 – 6.4mm', grade: '—', material: 'Al / Steel / SS', standard: 'DIN 7337', surface: 'Plain / Zinc' },
      { name: 'Tubular Rivet', spec: '2 – 8mm', grade: '—', material: 'Brass / Cu / Al', standard: 'DIN 7340', surface: 'Plain / Nickel' },
      { name: 'Rivet Nut (Threaded Insert)', spec: 'M3 – M12', grade: '—', material: 'Steel / SS / Al', standard: 'GB/T 17880', surface: 'Zinc / Passivated' }
    ]
  },
  pins: {
    title: 'Pins & Shafts — Popular Specifications',
    items: [
      { name: 'Cylindrical Dowel Pin', spec: '1 – 50mm', grade: '—', material: 'Carbon / Stainless / Bearing Steel', standard: 'DIN 7, ISO 2338', surface: 'Hardened / Passivated' },
      { name: 'Taper Pin', spec: '2 – 40mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 1', surface: 'Black Oxide' },
      { name: 'Cotter Pin (Split)', spec: '0.8 – 20mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 94', surface: 'Zinc / Passivated' },
      { name: 'Spring Pin (Roll)', spec: '1 – 20mm', grade: '—', material: '65Mn / SS301', standard: 'DIN 1481', surface: 'Black Oxide' },
      { name: 'Clevis Pin w/ Hole', spec: '6 – 60mm', grade: '40Cr / 45#', material: 'Carbon / Alloy / Stainless', standard: 'Custom', surface: 'Zinc / Chrome' },
      { name: 'Threaded Pin', spec: 'M3 – M20', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 258', surface: 'Black Oxide / Passivated' },
      { name: 'Parallel Key', spec: '2×2 – 50×28mm', grade: '—', material: '45# / Stainless', standard: 'GB/T 1096', surface: 'Black Oxide' },
      { name: 'Locating Pin', spec: '3 – 30mm', grade: '—', material: 'GCr15 / 40Cr', standard: 'DIN 6325', surface: 'Hardened / Zinc' },
      { name: 'Circlip', spec: '5 – 100mm', grade: '—', material: '65Mn / Stainless', standard: 'DIN 471-472', surface: 'Black Oxide' },
      { name: 'U-Clevis Pin', spec: '3 – 25mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 1434', surface: 'Zinc / Passivated' },
      { name: 'Clevis Pin with Hole', spec: '6 – 50mm', grade: '—', material: 'Carbon / Alloy / SS', standard: 'DIN 1444', surface: 'Zinc / Chrome' },
      { name: 'Taper Spring Pin', spec: '2 – 12mm', grade: '—', material: '65Mn / Stainless', standard: 'DIN 1481', surface: 'Black Oxide' }
    ]
  },
  studs: {
    title: 'Studs & Threaded Rods — Popular Specifications',
    items: [
      { name: 'Threaded Rod (All Thread)', spec: 'M3 – M30 × 1m/3m', grade: '4.8 / 8.8 / A2-70', material: 'Carbon / Stainless', standard: 'DIN 975/976', surface: 'Zinc / HDG / Plain' },
      { name: 'Double-End Stud (Tap End)', spec: 'M4 – M36', grade: '8.8 / 10.9 / A2-70', material: 'Carbon / Alloy / Stainless', standard: 'DIN 939', surface: 'Black Oxide / Zinc' },
      { name: 'Double-End Stud (Equal)', spec: 'M4 – M36', grade: '8.8 / 10.9 / A2-70', material: 'Carbon / Alloy / SS', standard: 'DIN 938', surface: 'Zinc / Dacromet' },
      { name: 'Left-Right Thread Stud', spec: 'M6 – M20', grade: '8.8 / A2-70', material: 'Carbon / Stainless', standard: 'DIN 2510', surface: 'Zinc / Plain' },
      { name: 'Weld Stud', spec: 'M4 – M16', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'DIN 32501', surface: 'Zinc / Copper' },
      { name: 'Expansion Bolt / Wall Anchor', spec: 'M5 – M20', grade: '4.8 / 5.8', material: 'Carbon / Stainless', standard: 'GB/T 22795', surface: 'Zinc / HDG' },
      { name: 'Wedge Anchor', spec: 'M6 – M24', grade: '5.8 / 8.8', material: 'Carbon / Stainless', standard: 'JB/ZQ 4763', surface: 'Zinc / HDG' },
      { name: 'Drop-in Anchor', spec: 'M6 – M20', grade: '—', material: 'Carbon / Stainless', standard: 'Expansion Type', surface: 'Zinc / Plain' },
      { name: 'Hex Standoff / Spacer', spec: 'M3 – M10 × 5-50mm', grade: '—', material: 'Brass / Stainless / Nylon', standard: 'Custom', surface: 'Nickel / Plain' },
      { name: 'Sleeve Anchor', spec: 'M6 – M20', grade: '5.8 / 8.8', material: 'Carbon / Stainless', standard: 'Through Bolt Type', surface: 'Zinc / HDG' }
    ]
  },
  kits: {
    title: 'Kits & Assortment Sets — Popular Specifications',
    items: [
      { name: 'Hex Nut + Flat Washer Set', spec: 'M3 – M12 | 50-300 pcs', grade: 'A2 / 8', material: 'Stainless / Carbon', standard: 'DIN 934+125', surface: 'Zinc / Passivated' },
      { name: 'Bolt + Nut + Washer Kit', spec: 'M4 – M12 | 80-400 pcs', grade: '8.8 / A2', material: 'Carbon / Stainless', standard: 'DIN 931+934+125', surface: 'Zinc / Dacromet' },
      { name: 'Flat Washer Assortment Box', spec: 'M3 – M16 | 6 sizes | 150 pcs', grade: '200HV / A2', material: 'Carbon / Stainless', standard: 'DIN 125A', surface: 'Zinc / Passivated' },
      { name: 'Hex Nut Assortment Box', spec: 'M3 – M12 | 8 sizes | 200 pcs', grade: '8 / A2', material: 'Carbon / Stainless', standard: 'DIN 934', surface: 'Zinc / Passivated' },
      { name: 'Self-Tapping Screw Kit', spec: 'ST3.5-ST6.3 | 5 sizes | 200 pcs', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 7981/7982', surface: 'Zinc / Passivated' },
      { name: 'Nylon Lock Nut Kit', spec: 'M4 – M12 | 6 sizes | 120 pcs', grade: '8 / A2', material: 'Carbon / Stainless', standard: 'DIN 985', surface: 'Zinc / Passivated' },
      { name: 'Spring Lock Washer Set', spec: 'M3 – M20 | 10 sizes | 300 pcs', grade: '—', material: '65Mn / SS304', standard: 'DIN 127', surface: 'Black Oxide' },
      { name: 'O-Ring & Seal Kit', spec: 'Assorted | NBR / Silicone / EPDM', grade: '—', material: 'Rubber / Silicone', standard: 'Metric / Inch', surface: '—' },
      { name: 'DIY Home Hardware Set', spec: '100-500 pcs mix', grade: '4.8 / A2', material: 'Carbon / Stainless', standard: 'Assorted', surface: 'Zinc / Plain' },
      { name: 'Retaining Ring Circlip Set', spec: 'Φ5-Φ50mm | 15 sizes | 300 pcs', grade: '—', material: '65Mn / Stainless', standard: 'DIN 471+472', surface: 'Black Oxide' }
    ]
  }
};

function updateProductTable(cat) {
  var data = productData[cat];
  if (!data) return;
  document.getElementById('tableTitle').textContent = data.title;
  document.getElementById('productCount').textContent = data.items.length + ' Products';
  var html = '';
  data.items.forEach(function(item) {
    html += '<tr>';
    html += '<td><strong>' + item.name + '</strong></td>';
    html += '<td><span class="spec-tag">' + item.spec + '</span></td>';
    html += '<td>' + item.grade + '<br><small style="color:var(--gray-500);">' + item.material + '</small></td>';
    html += '<td style="font-size:0.82rem;">' + item.standard + '</td>';
    html += '<td>' + item.surface + '</td>';
    html += '<td style="white-space:nowrap;"><a href="contact.html" class="inquiry-link" style="margin-right:8px;">Inquire</a><button class="btn-add-cart-sm" onclick="ZKCart.add({name:this.dataset.n,spec:this.dataset.s,grade:this.dataset.g,material:this.dataset.m,standard:this.dataset.std,surface:this.dataset.sf});this.textContent=\'✓\';var b=this;setTimeout(function(){b.textContent=\'+ Add\'},1200)" data-n="' + item.name.replace(/"/g, '&quot;') + '" data-s="' + item.spec.replace(/"/g, '&quot;') + '" data-g="' + (item.grade||'').replace(/"/g, '&quot;') + '" data-m="' + (item.material||'').replace(/"/g, '&quot;') + '" data-std="' + (item.standard||'').replace(/"/g, '&quot;') + '" data-sf="' + (item.surface||'').replace(/"/g, '&quot;') + '">+ Add</button></td>';
    html += '</tr>';
  });
  document.getElementById('tableBody').innerHTML = html;
}

if (document.getElementById('tableBody')) { updateProductTable('bolts'); }
