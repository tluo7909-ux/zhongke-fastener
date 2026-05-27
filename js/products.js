/**
 * ZhongKe Fastener — Products Page Script
 */

// SVG icon per category
var catIcons = {
  bolts: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="20" r="10"/><rect x="22" y="8" width="4" height="8" rx="1"/><path d="M18 28l-6 10h24l-6-10"/></svg>',
  nuts: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="8"/><path d="M24 4v12M4 24h12M44 24H32"/></svg>',
  screws: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M24 40V8l16 10v12L24 40z"/><path d="M8 18l16-10v32L8 30V18z"/></svg>',
  washers: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="6"/><path d="M14 24h20"/></svg>',
  rivets: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><rect x="18" y="8" width="12" height="32" rx="3"/><circle cx="24" cy="14" r="4"/></svg>',
  pins: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="10" r="6"/><path d="M24 16v22"/><path d="M14 22h20"/></svg>'
};

// Metallic gradients for product cards
var metalGradients = ['metal-1','metal-2','metal-3','metal-4','metal-5','metal-6'];
function getMetalClass(i) { return metalGradients[i % metalGradients.length]; }

var allProducts = [
  // Bolts
  { cat: 'bolts', name: 'Hex Head Bolt', spec: 'M6 – M64', grade: '8.8 / 10.9 / 12.9', material: 'Carbon / Alloy / Stainless', standard: 'GB/T 5782, DIN 931, ISO 4014', surface: 'Black Oxide / Zinc / Dacromet', moq: '1,000', delivery: '7 days' },
  { cat: 'bolts', name: 'Flange Bolt', spec: 'M5 – M20', grade: '8.8 / 10.9', material: 'Carbon Steel / SS304', standard: 'GB/T 5789, DIN 6921', surface: 'Zinc / Dacromet / Chrome', moq: '1,000', delivery: '7 days' },
  { cat: 'bolts', name: 'Carriage Bolt', spec: 'M5 – M24', grade: '4.8 / 8.8', material: 'Carbon Steel / Stainless', standard: 'GB/T 14, DIN 603', surface: 'Zinc / Hot-Dip Galv.', moq: '500', delivery: '5 days' },
  { cat: 'bolts', name: 'Socket Head Cap Screw', spec: 'M3 – M36', grade: '8.8 / 10.9 / 12.9 / A2-70', material: 'Alloy Steel / Stainless', standard: 'DIN 912, ISO 4762', surface: 'Black Oxide / Zinc / Passivated', moq: '1,000', delivery: '7 days' },
  { cat: 'bolts', name: 'U-Bolt', spec: 'M6 – M30', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'GB/T 2329, DIN 3570', surface: 'Zinc / HDG', moq: '200', delivery: '10 days' },
  { cat: 'bolts', name: 'Double-End Stud', spec: 'M6 – M48', grade: '8.8 / 10.9 / A2-70', material: 'Carbon / Alloy / Stainless', standard: 'DIN 938-939', surface: 'Black Oxide / Zinc', moq: '500', delivery: '7 days' },
  { cat: 'bolts', name: 'Anchor Bolt', spec: 'M12 – M48', grade: '35# / 45# Steel', material: 'Carbon Steel', standard: 'GB/T 799', surface: 'HDG / Dacromet', moq: '100', delivery: '10 days' },
  { cat: 'bolts', name: 'T-Bolt', spec: 'M5 – M24', grade: '8.8 / 10.9', material: 'Carbon / Stainless', standard: 'DIN 188', surface: 'Black Oxide / Zinc', moq: '1,000', delivery: '7 days' },
  { cat: 'bolts', name: 'Eye Bolt (Hinged)', spec: 'M6 – M24', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'DIN 444', surface: 'Zinc / Black Oxide', moq: '500', delivery: '7 days' },
  { cat: 'bolts', name: 'Lifting Eye Bolt', spec: 'M6 – M48', grade: '8.8 / 10.9', material: 'Alloy / Stainless', standard: 'DIN 580', surface: 'Zinc / Passivated', moq: '200', delivery: '7 days' },
  { cat: 'bolts', name: 'Weld Bolt', spec: 'M4 – M16', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'GB/T 902', surface: 'Zinc / Copper Plated', moq: '2,000', delivery: '5 days' },
  { cat: 'bolts', name: 'Low Head Socket Screw', spec: 'M3 – M16', grade: '8.8 / 10.9 / A2-70', material: 'Alloy / Stainless', standard: 'DIN 7984', surface: 'Black Oxide / Passivated', moq: '1,000', delivery: '7 days' },
  // Nuts
  { cat: 'nuts', name: 'Hex Nut', spec: 'M3 – M64', grade: '8 / 10 / 12', material: 'Carbon / Stainless / Brass', standard: 'DIN 934, ISO 4032', surface: 'Zinc / Black Oxide', moq: '2,000', delivery: '5 days' },
  { cat: 'nuts', name: 'Nylon Insert Lock Nut', spec: 'M3 – M36', grade: '8 / 10', material: 'Carbon / Stainless', standard: 'DIN 985', surface: 'Zinc / Passivated', moq: '1,000', delivery: '7 days' },
  { cat: 'nuts', name: 'Flange Nut', spec: 'M5 – M20', grade: '8 / 10', material: 'Carbon / Stainless', standard: 'DIN 6923', surface: 'Zinc / Dacromet', moq: '2,000', delivery: '5 days' },
  { cat: 'nuts', name: 'Cap Nut (Acorn)', spec: 'M4 – M24', grade: '6 / 8', material: 'Carbon / Stainless', standard: 'DIN 1587', surface: 'Zinc / Chrome', moq: '1,000', delivery: '7 days' },
  { cat: 'nuts', name: 'Wing Nut', spec: 'M4 – M20', grade: '4 / 5', material: 'Carbon / Stainless / Zn Alloy', standard: 'DIN 315', surface: 'Zinc / Chrome', moq: '1,000', delivery: '5 days' },
  { cat: 'nuts', name: 'Self-Locking Nut', spec: 'M4 – M30', grade: '8 / 10', material: 'Carbon / Stainless', standard: 'DIN 980', surface: 'Zinc / Dacromet', moq: '1,000', delivery: '7 days' },
  { cat: 'nuts', name: 'Weld Nut', spec: 'M4 – M16', grade: '8', material: 'Carbon Steel', standard: 'DIN 929', surface: 'Zinc', moq: '2,000', delivery: '5 days' },
  { cat: 'nuts', name: 'Square Nut', spec: 'M3 – M12', grade: '6 / 8', material: 'Carbon / Stainless', standard: 'DIN 557', surface: 'Plain / Zinc', moq: '3,000', delivery: '5 days' },
  { cat: 'nuts', name: 'T-Nut', spec: 'M4 – M16', grade: '6 / 8', material: 'Carbon / Stainless', standard: 'DIN 508', surface: 'Zinc / Black Oxide', moq: '2,000', delivery: '7 days' },
  { cat: 'nuts', name: 'Round Nut', spec: 'M10 – M80', grade: '8', material: 'Carbon / 45# Steel', standard: 'DIN 1804', surface: 'Black Oxide / Zinc', moq: '500', delivery: '10 days' },
  // Screws
  { cat: 'screws', name: 'Pan Head Self-Tapping', spec: 'ST2.2 – ST6.3', grade: '—', material: 'Carbon Steel / SS410', standard: 'GB/T 845, DIN 968', surface: 'Zinc / Passivated', moq: '5,000', delivery: '5 days' },
  { cat: 'screws', name: 'CSK Self-Tapping Screw', spec: 'ST2.2 – ST6.3', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 969', surface: 'Zinc / Black Oxide', moq: '5,000', delivery: '5 days' },
  { cat: 'screws', name: 'Pan Head Machine Screw', spec: 'M2 – M12', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'DIN 7985', surface: 'Zinc / Passivated', moq: '5,000', delivery: '5 days' },
  { cat: 'screws', name: 'Countersunk Machine Screw', spec: 'M2 – M12', grade: '4.8 / 8.8', material: 'Carbon / Stainless', standard: 'DIN 965', surface: 'Zinc / Passivated', moq: '5,000', delivery: '5 days' },
  { cat: 'screws', name: 'Socket Set Screw', spec: 'M2 – M24', grade: '12.9 / A2-70', material: 'Alloy / Stainless', standard: 'DIN 913', surface: 'Black Oxide / Passivated', moq: '2,000', delivery: '7 days' },
  { cat: 'screws', name: 'Hex Wood Screw', spec: 'M4 – M16', grade: '—', material: 'Carbon Steel', standard: 'DIN 571', surface: 'Zinc', moq: '3,000', delivery: '5 days' },
  { cat: 'screws', name: 'Hex Flange Self-Tap', spec: 'ST3.5 – ST6.3', grade: '—', material: 'Carbon / Stainless', standard: 'GB/T 16824', surface: 'Zinc / Passivated', moq: '5,000', delivery: '5 days' },
  { cat: 'screws', name: 'Lifting Eye Screw', spec: 'M8 – M36', grade: '—', material: '20# Steel / Stainless', standard: 'GB/T 825', surface: 'Zinc / Passivated', moq: '200', delivery: '7 days' },
  // Washers
  { cat: 'washers', name: 'Flat Washer', spec: 'M2 – M64', grade: '200HV / 300HV', material: 'Carbon / Stainless / Copper', standard: 'DIN 125A, ISO 7089', surface: 'Zinc / Plain', moq: '5,000', delivery: '3 days' },
  { cat: 'washers', name: 'Spring Lock Washer', spec: 'M2 – M48', grade: '—', material: '65Mn / SS304', standard: 'DIN 127B', surface: 'Black Oxide / Zinc', moq: '5,000', delivery: '3 days' },
  { cat: 'washers', name: 'Serrated Lock Washer', spec: 'M3 – M20', grade: '—', material: '65Mn / Stainless', standard: 'DIN 6797', surface: 'Black Oxide', moq: '3,000', delivery: '5 days' },
  { cat: 'washers', name: 'Belleville Spring Washer', spec: 'M3 – M30', grade: '—', material: '50CrVA / Stainless', standard: 'DIN 2093', surface: 'Phosphate', moq: '2,000', delivery: '7 days' },
  { cat: 'washers', name: 'Tab Washer', spec: 'M3 – M36', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 463', surface: 'Black Oxide', moq: '2,000', delivery: '5 days' },
  { cat: 'washers', name: 'Sealing Washer', spec: 'M3 – M24', grade: '—', material: 'Cu / Al / Rubber+Metal', standard: 'JB/ZQ 4403', surface: 'Plain', moq: '3,000', delivery: '5 days' },
  { cat: 'washers', name: 'Heavy Flat Washer', spec: 'M5 – M48', grade: '300HV', material: '45# / Alloy Steel', standard: 'DIN 6916', surface: 'Zinc / Dacromet', moq: '2,000', delivery: '5 days' },
  { cat: 'washers', name: 'Countersunk Washer', spec: 'M3 – M12', grade: '200HV', material: 'Carbon / Stainless', standard: 'GB/T 848', surface: 'Zinc / Passivated', moq: '5,000', delivery: '5 days' },
  // Rivets
  { cat: 'rivets', name: 'Open-End Blind Rivet', spec: '2.4 – 6.4mm', grade: '—', material: 'Al / Steel / Stainless', standard: 'DIN 7337', surface: 'Plain / Zinc', moq: '5,000', delivery: '5 days' },
  { cat: 'rivets', name: 'Closed-End Blind Rivet', spec: '3.2 – 6.4mm', grade: '—', material: 'Al / Steel / Stainless', standard: 'GB/T 12616', surface: 'Plain / Zinc', moq: '5,000', delivery: '5 days' },
  { cat: 'rivets', name: 'Solid Rivet', spec: '2 – 20mm', grade: '—', material: 'Steel / Copper / Al', standard: 'DIN 660-662', surface: 'Plain / Zinc', moq: '2,000', delivery: '7 days' },
  { cat: 'rivets', name: 'Drive Rivet', spec: '3.2 – 6.4mm', grade: '—', material: 'Al / Steel', standard: 'DIN 7338', surface: 'Plain / Zinc', moq: '5,000', delivery: '5 days' },
  { cat: 'rivets', name: 'Lockbolt (Huck Bolt)', spec: '4.0 – 12.0mm', grade: '10.9 / 12.9', material: 'Carbon / Alloy Steel', standard: 'GB/T 26565', surface: 'Zinc / Dacromet', moq: '1,000', delivery: '10 days' },
  { cat: 'rivets', name: 'Peel-Type Blind Rivet', spec: '3.2 – 6.4mm', grade: '—', material: 'Al / Stainless', standard: 'GB/T 12618', surface: 'Passivated', moq: '5,000', delivery: '5 days' },
  { cat: 'rivets', name: 'Round Head Rivet', spec: '1.5 – 10mm', grade: '—', material: 'Steel / Copper / Al', standard: 'GB/T 867', surface: 'Plain / Zinc', moq: '3,000', delivery: '7 days' },
  { cat: 'rivets', name: 'Button Head Rivet', spec: '2 – 16mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 660', surface: 'Plain / Zinc', moq: '3,000', delivery: '7 days' },
  // Pins
  { cat: 'pins', name: 'Cylindrical Dowel Pin', spec: '1 – 50mm', grade: '—', material: 'Carbon / Stainless / Bearing Steel', standard: 'DIN 7, ISO 2338', surface: 'Hardened / Passivated', moq: '1,000', delivery: '5 days' },
  { cat: 'pins', name: 'Taper Pin', spec: '2 – 40mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 1', surface: 'Black Oxide', moq: '1,000', delivery: '5 days' },
  { cat: 'pins', name: 'Cotter Pin (Split)', spec: '0.8 – 20mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 94', surface: 'Zinc / Passivated', moq: '5,000', delivery: '3 days' },
  { cat: 'pins', name: 'Spring Pin (Roll)', spec: '1 – 20mm', grade: '—', material: '65Mn / SS301', standard: 'DIN 1481', surface: 'Black Oxide', moq: '2,000', delivery: '5 days' },
  { cat: 'pins', name: 'Clevis Pin w/ Hole', spec: '6 – 60mm', grade: '40Cr / 45#', material: 'Carbon / Alloy / Stainless', standard: 'Custom', surface: 'Zinc / Chrome / Hardened', moq: '200', delivery: '15 days' },
  { cat: 'pins', name: 'Threaded Pin', spec: 'M3 – M20', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 258', surface: 'Black Oxide / Passivated', moq: '1,000', delivery: '7 days' },
  { cat: 'pins', name: 'Parallel Key', spec: '2×2 – 50×28mm', grade: '—', material: '45# / Stainless', standard: 'GB/T 1096', surface: 'Black Oxide', moq: '500', delivery: '5 days' },
  { cat: 'pins', name: 'Locating Pin', spec: '3 – 30mm', grade: '—', material: 'GCr15 / 40Cr', standard: 'DIN 6325', surface: 'Hardened / Zinc', moq: '500', delivery: '7 days' },
  { cat: 'pins', name: 'Circlip (Retaining Ring)', spec: '5 – 100mm', grade: '—', material: '65Mn / Stainless', standard: 'DIN 471-472', surface: 'Black Oxide', moq: '3,000', delivery: '5 days' },
  { cat: 'pins', name: 'U-Clevis Pin', spec: '3 – 25mm', grade: '—', material: 'Carbon / Stainless', standard: 'DIN 1434', surface: 'Zinc / Passivated', moq: '2,000', delivery: '5 days' }
];

var currentFilter = 'all';

function renderProductCards(products) {
  var container = document.getElementById('productCards');
  if (!container) return;

  if (products.length === 0) {
    container.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--gray-500);"><p style="font-size:1.2rem;">No products found</p><p>Try a different search or contact us for custom orders</p></div>';
    return;
  }

  var html = '';
  products.forEach(function(p, i) {
    var icon = catIcons[p.cat] || '';
    var mc = getMetalClass(i);
    html += '<div class="prod-detail-card">';
    html += '<div class="prod-thumb ' + mc + '" style="position:relative;overflow:hidden;border-radius:var(--radius);">';
    html += '<div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(0,0,0,0.4) 100%);"></div>';
    html += '<div style="position:relative;z-index:1;">' + icon + '</div>';
    html += '</div>';
    html += '<div class="prod-info">';
    html += '<h3>' + p.name + '</h3>';
    html += '<p>Size: ' + p.spec + ' | Standard: ' + p.standard + '</p>';
    html += '<div class="prod-specs">';
    html += '<span class="spec-tag">Material: ' + p.material + '</span>';
    html += '<span class="spec-tag">Grade: ' + p.grade + '</span>';
    html += '<span class="spec-tag">Finish: ' + p.surface + '</span>';
    html += '</div>';
    html += '<div class="prod-meta">';
    html += '<span>MOQ: ' + p.moq + ' pcs</span>';
    html += '<span>Delivery: ' + p.delivery + '</span>';
    html += '<a href="contact.html" class="inquiry-link" style="margin-left:auto;">Inquire &#x2192;</a>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
  });
  container.innerHTML = html;
}

function filterProducts() {
  var searchTerm = document.getElementById('productSearch') ? document.getElementById('productSearch').value.toLowerCase() : '';
  var filtered = allProducts;
  if (currentFilter !== 'all') { filtered = filtered.filter(function(p) { return p.cat === currentFilter; }); }
  if (searchTerm) {
    filtered = filtered.filter(function(p) {
      return p.name.toLowerCase().indexOf(searchTerm) !== -1 ||
             p.spec.indexOf(searchTerm) !== -1 ||
             p.material.toLowerCase().indexOf(searchTerm) !== -1 ||
             p.standard.toLowerCase().indexOf(searchTerm) !== -1;
    });
  }
  renderProductCards(filtered);
}

document.addEventListener('DOMContentLoaded', function() {
  var filterTags = document.querySelectorAll('.filter-tag[data-filter]');
  if (filterTags.length > 0) {
    filterTags.forEach(function(tag) {
      tag.addEventListener('click', function() {
        filterTags.forEach(function(t) { t.classList.remove('active'); });
        tag.classList.add('active');
        currentFilter = tag.getAttribute('data-filter');
        filterProducts();
      });
    });
  }
  var searchInput = document.getElementById('productSearch');
  if (searchInput) { searchInput.addEventListener('input', filterProducts); }
  if (document.getElementById('productCards')) { renderProductCards(allProducts); }
});
