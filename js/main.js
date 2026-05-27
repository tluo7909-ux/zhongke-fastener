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
      var btn = form.querySelector('button[type="submit"]');
      var orig = btn.textContent;
      btn.textContent = 'Sending...'; btn.disabled = true; btn.style.opacity = '0.7';
      setTimeout(function() {
        btn.textContent = 'Sent Successfully!'; btn.style.background = '#0ea95a'; btn.style.opacity = '1';
        form.reset();
        setTimeout(function() { btn.textContent = orig; btn.style.background = ''; btn.disabled = false; }, 2500);
      }, 1000);
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
      { name: 'Low Head Socket Screw', spec: 'M3 – M16', grade: '8.8 / 10.9 / A2-70', material: 'Alloy / Stainless', standard: 'DIN 7984', surface: 'Black Oxide / Passivated' }
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
      { name: 'Round Nut', spec: 'M10 – M80', grade: '8', material: 'Carbon / 45#', standard: 'DIN 1804', surface: 'Black Oxide / Zinc' }
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
      { name: 'Lifting Eye Screw', spec: 'M8 – M36', grade: '—', material: '20# / Stainless', standard: 'GB/T 825', surface: 'Zinc / Passivated' }
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
      { name: 'Countersunk Washer', spec: 'M3 – M12', grade: '200HV', material: 'Carbon / Stainless', standard: 'GB/T 848', surface: 'Zinc / Passivated' }
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
      { name: 'Button Head Rivet', spec: '2 – 16mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 660', surface: 'Plain / Zinc' }
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
      { name: 'U-Clevis Pin', spec: '3 – 25mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 1434', surface: 'Zinc / Passivated' }
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
    html += '<td><a href="contact.html" class="inquiry-link">Inquire &#x2192;</a></td>';
    html += '</tr>';
  });
  document.getElementById('tableBody').innerHTML = html;
}

if (document.getElementById('tableBody')) { updateProductTable('bolts'); }
