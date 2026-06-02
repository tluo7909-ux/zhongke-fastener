/**
 * ZhongKe Fastener — Quote Cart System
 * localStorage-driven shopping / quote cart
 */
var ZKCart = (function () {
  var KEY = 'zk_quote_cart';

  function _read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  function _write(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
  }

  /**
   * Add a product to the cart.  `p` must have fields: name, spec, material, standard, surface
   */
  function add(p) {
    var items = _read();
    var id = p.name + '|' + p.spec; // simple deterministic key
    var existing = items.find(function (i) { return i.id === id; });
    if (existing) {
      existing.qty += (p.qty || 1);
    } else {
      items.push({
        id: id,
        name: p.name,
        spec: p.spec,
        grade: p.grade || '',
        material: p.material || '',
        standard: p.standard || '',
        surface: p.surface || '',
        qty: p.qty || 1
      });
    }
    _write(items);
    _updateBadge();
  }

  function remove(id) {
    var items = _read().filter(function (i) { return i.id !== id; });
    _write(items);
    _updateBadge();
  }

  function updateQty(id, qty) {
    var items = _read();
    var item = items.find(function (i) { return i.id === id; });
    if (!item) return;
    var q = parseInt(qty, 10);
    if (isNaN(q) || q < 1) { remove(id); return; }
    item.qty = q;
    _write(items);
  }

  function getAll()  { return _read(); }
  function count()   { return _read().reduce(function (s, i) { return s + i.qty; }, 0); }
  function clear()   { _write([]); _updateBadge(); }

  function _updateBadge() {
    var badges = document.querySelectorAll('.cart-badge');
    var c = count();
    for (var i = 0; i < badges.length; i++) {
      badges[i].textContent = c;
      badges[i].style.display = c > 0 ? 'inline-flex' : 'none';
    }
  }

  // Initialise badge on page load
  document.addEventListener('DOMContentLoaded', _updateBadge);

  return { add: add, remove: remove, updateQty: updateQty, getAll: getAll, count: count, clear: clear };
})();
