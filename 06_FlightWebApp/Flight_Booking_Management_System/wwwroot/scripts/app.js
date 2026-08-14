/**
 * Flight Management System — app.js
 * Connects directly to your Web API.
 * Set API_BASE to your actual endpoint before use.
 */

// ─── CONFIGURATION ────────────────────────────────────────────────
const API_BASE = '/api/Flight';
// ──────────────────────────────────────────────────────────────────

let allFlights   = [];
let currentResult = null;   // flight loaded in "Find by ID"
let currentUpdId  = null;   // flight ID loaded in "Update"

// ── Initialise ────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  checkApiStatus();
  loadAllFlights();
});

// ── Navigation ────────────────────────────────────────────────────

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab, btn);
    });
  });
}

function switchTab(name, clickedBtn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));

  document.getElementById('panel-' + name).classList.add('active');
  (clickedBtn || document.querySelector(`[data-tab="${name}"]`)).classList.add('active');

  if (name === 'all') loadAllFlights();
}

// ── API Status Ping ───────────────────────────────────────────────

async function checkApiStatus() {
  const dot  = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  try {
    const res = await fetch(API_BASE, { method: 'HEAD', signal: AbortSignal.timeout(4000) });
    if (res.ok || res.status === 405) {   // 405 = API exists, method not allowed
      dot.className  = 'status-dot online';
      text.textContent = 'API Online';
    } else {
      throw new Error('non-2xx');
    }
  } catch {
    dot.className  = 'status-dot offline';
    text.textContent = 'API Offline';
  }
}

// ── 1. Get All Flights ────────────────────────────────────────────

async function loadAllFlights() {
  const tbody = document.getElementById('flightTableBody');
  tbody.innerHTML = `
    <tr>
      <td colspan="7">
        <div class="table-empty">
          <div class="spinner-lg"></div>
          <span>Fetching flights…</span>
        </div>
      </td>
    </tr>`;

  try {
    const res = await fetch(API_BASE);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    allFlights = await res.json();
    renderTable(allFlights);
  } catch (err) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="table-empty">
            <span>⚠ Failed to load flights — ${escHtml(err.message)}</span>
          </div>
        </td>
      </tr>`;
    showToast('Could not load flights: ' + err.message, 'error');
  }
}

function renderTable(flights) {
  const tbody = document.getElementById('flightTableBody');
  const badge = document.getElementById('flightCount');
  const nav   = document.getElementById('navCount');

  badge.textContent = `${flights.length} flight${flights.length !== 1 ? 's' : ''}`;
  nav.textContent   = flights.length;

  if (!flights.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7">
          <div class="table-empty">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.35"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/></svg>
            <span>No flights found</span>
          </div>
        </td>
      </tr>`;
    return;
  }

  tbody.innerHTML = flights.map(f => {
    const dt      = f.departureTime ? new Date(f.departureTime) : null;
    const timeStr = dt
      ? dt.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
      : '–';
    const maxSeats = 200;
    const pct = f.availableSeats > 0
      ? Math.min(100, Math.round((f.availableSeats / maxSeats) * 100))
      : 0;
    const barColor = f.availableSeats === 0
      ? 'var(--red)'
      : f.availableSeats < 30
        ? 'var(--amber)'
        : 'var(--accent)';

    return `
      <tr>
        <td><span class="flight-num-cell">${escHtml(f.flightNumber)}</span></td>
        <td>${escHtml(f.sourceCity)}</td>
        <td>
          <span class="route-arrow">→</span>${escHtml(f.destinationCity)}
        </td>
        <td><span class="time-cell">${timeStr}</span></td>
        <td><span class="price-cell">₹${Number(f.price).toLocaleString('en-IN')}</span></td>
        <td>
          <div class="seats-wrap">
            <div class="seats-bar">
              <div class="seats-bar-fill" style="width:${pct}%;background:${barColor}"></div>
            </div>
            <span class="seats-num">${f.availableSeats}</span>
          </div>
        </td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" title="Edit" onclick="quickEdit(${f.flightId})">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
            </button>
            <button class="icon-btn del" title="Delete" onclick="quickDelete(${f.flightId})">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
            </button>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function filterTable() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!q) { renderTable(allFlights); return; }
  const filtered = allFlights.filter(f =>
    f.flightNumber.toLowerCase().includes(q)   ||
    f.sourceCity.toLowerCase().includes(q)      ||
    f.destinationCity.toLowerCase().includes(q)
  );
  renderTable(filtered);
}

// ── 2. Get Flight by ID ───────────────────────────────────────────

async function getFlightById() {
  const id = document.getElementById('getFlightId').value.trim();
  if (!id) { showToast('Please enter a Flight ID', 'error'); return; }

  setSpinner('getSpinner', true);
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (res.status === 404) throw new Error('Flight not found');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const f = await res.json();
    renderResult(f);
    showToast('Flight found', 'success');
  } catch (err) {
    document.getElementById('resultCard').classList.remove('visible');
    showToast(err.message, 'error');
  } finally {
    setSpinner('getSpinner', false);
  }
}

function renderResult(f) {
  currentResult = f;
  const dt = f.departureTime
    ? new Date(f.departureTime).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short' })
    : '–';

  document.getElementById('res-flightNumber').textContent = f.flightNumber;
  document.getElementById('res-id').textContent           = `Flight ID: ${f.flightId}`;
  document.getElementById('res-source').textContent       = f.sourceCity;
  document.getElementById('res-dest').textContent         = f.destinationCity;
  document.getElementById('res-time').textContent         = dt;
  document.getElementById('res-price').textContent        = `₹${Number(f.price).toLocaleString('en-IN')}`;
  document.getElementById('res-seats').textContent        = f.availableSeats;
  document.getElementById('resultCard').classList.add('visible');
}

function editFromResult() {
  if (!currentResult) return;
  quickEdit(currentResult.flightId);
}

// ── 3. Insert Flight ──────────────────────────────────────────────

async function insertFlight() {
  const fields = ['flightNumber','sourceCity','destinationCity','departureTime','price','availableSeats'];
  if (!validateFields('ins', fields)) return;

  const body = {
    flightNumber:    document.getElementById('ins-flightNumber').value.trim(),
    sourceCity:      document.getElementById('ins-sourceCity').value.trim(),
    destinationCity: document.getElementById('ins-destinationCity').value.trim(),
    departureTime:   document.getElementById('ins-departureTime').value,
    price:           parseFloat(document.getElementById('ins-price').value),
    availableSeats:  parseInt(document.getElementById('ins-availableSeats').value),
  };

  setSpinner('insertSpinner', true);
  try {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const msg = await extractError(res);
      throw new Error(msg);
    }
    showToast(`Flight "${body.flightNumber}" added successfully`, 'success');
    clearForm('ins');
  } catch (err) {
    showToast('Insert failed: ' + err.message, 'error');
  } finally {
    setSpinner('insertSpinner', false);
  }
}

function clearForm(prefix) {
  ['flightNumber','sourceCity','destinationCity','departureTime','price','availableSeats'].forEach(f => {
    const el = document.getElementById(`${prefix}-${f}`);
    el.value = '';
    el.classList.remove('is-error');
    document.getElementById(`${prefix}-${f}-err`).classList.remove('visible');
  });
}

// ── 4. Update Flight ──────────────────────────────────────────────

async function loadFlightForUpdate() {
  const id = document.getElementById('upd-flightId').value.trim();
  if (!id) { showToast('Enter a Flight ID first', 'error'); return; }

  setSpinner('loadSpinner', true);
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (res.status === 404) throw new Error('Flight not found');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const f = await res.json();
    populateUpdateForm(f);
    showToast('Flight loaded — edit and save', 'info');
  } catch (err) {
    showToast(err.message, 'error');
  } finally {
    setSpinner('loadSpinner', false);
  }
}

function populateUpdateForm(f) {
  currentUpdId = f.flightId;

  document.getElementById('upd-flightNumber').value    = f.flightNumber;
  document.getElementById('upd-sourceCity').value      = f.sourceCity;
  document.getElementById('upd-destinationCity').value = f.destinationCity;
  document.getElementById('upd-departureTime').value   = f.departureTime
    ? f.departureTime.slice(0, 16)
    : '';
  document.getElementById('upd-price').value           = f.price;
  document.getElementById('upd-availableSeats').value  = f.availableSeats;

  document.getElementById('updFields').style.display     = 'grid';
  document.getElementById('updFormDivider').style.display = 'flex';
  document.getElementById('updFooter').style.display     = 'flex';
}

async function updateFlight() {
  if (!currentUpdId) { showToast('No flight loaded', 'error'); return; }

  const fields = ['flightNumber','sourceCity','destinationCity','departureTime','price','availableSeats'];
  if (!validateFields('upd', fields)) return;

  const body = {
    flightId:        currentUpdId,
    flightNumber:    document.getElementById('upd-flightNumber').value.trim(),
    sourceCity:      document.getElementById('upd-sourceCity').value.trim(),
    destinationCity: document.getElementById('upd-destinationCity').value.trim(),
    departureTime:   document.getElementById('upd-departureTime').value,
    price:           parseFloat(document.getElementById('upd-price').value),
    availableSeats:  parseInt(document.getElementById('upd-availableSeats').value),
  };

  setSpinner('updateSpinner', true);
  try {
    const res = await fetch(`${API_BASE}/${currentUpdId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const msg = await extractError(res);
      throw new Error(msg);
    }
    showToast(`Flight "${body.flightNumber}" updated successfully`, 'success');
    clearUpdatePanel();
  } catch (err) {
    showToast('Update failed: ' + err.message, 'error');
  } finally {
    setSpinner('updateSpinner', false);
  }
}

function clearUpdatePanel() {
  document.getElementById('upd-flightId').value          = '';
  document.getElementById('updFields').style.display     = 'none';
  document.getElementById('updFormDivider').style.display = 'none';
  document.getElementById('updFooter').style.display     = 'none';
  clearForm('upd');
  currentUpdId = null;
}

// ── 5. Delete Flight ──────────────────────────────────────────────

async function loadFlightForDelete() {
  const id = document.getElementById('del-flightId').value.trim();
  if (!id) { showToast('Enter a Flight ID', 'error'); return; }

  setSpinner('delLoadSpinner', true);
  try {
    const res = await fetch(`${API_BASE}/${id}`);
    if (res.status === 404) throw new Error('Flight not found');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const f = await res.json();
    document.getElementById('del-flightNumDisplay').textContent = f.flightNumber;
    document.getElementById('del-idDisplay').textContent        = f.flightId;
    document.getElementById('deleteConfirm').classList.add('visible');
  } catch (err) {
    showToast(err.message, 'error');
    document.getElementById('deleteConfirm').classList.remove('visible');
  } finally {
    setSpinner('delLoadSpinner', false);
  }
}

async function deleteFlight() {
  const id = document.getElementById('del-flightId').value.trim();
  const flightNum = document.getElementById('del-flightNumDisplay').textContent;

  setSpinner('deleteSpinner', true);
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const msg = await extractError(res);
      throw new Error(msg);
    }
    showToast(`Flight "${flightNum}" deleted`, 'success');
    cancelDelete();
  } catch (err) {
    showToast('Delete failed: ' + err.message, 'error');
  } finally {
    setSpinner('deleteSpinner', false);
  }
}

function cancelDelete() {
  document.getElementById('deleteConfirm').classList.remove('visible');
  document.getElementById('del-flightId').value = '';
}

// ── Shortcuts from table rows ─────────────────────────────────────

function quickEdit(id) {
  switchTab('update');
  document.getElementById('upd-flightId').value = id;
  loadFlightForUpdate();
}

function quickDelete(id) {
  switchTab('delete');
  document.getElementById('del-flightId').value = id;
  loadFlightForDelete();
}

// ── Helpers ───────────────────────────────────────────────────────

function validateFields(prefix, fields) {
  let valid = true;
  fields.forEach(f => {
    const el  = document.getElementById(`${prefix}-${f}`);
    const err = document.getElementById(`${prefix}-${f}-err`);
    if (!el || !el.value.toString().trim()) {
      el && el.classList.add('is-error');
      err && err.classList.add('visible');
      valid = false;
    } else {
      el.classList.remove('is-error');
      err && err.classList.remove('visible');
    }
  });
  if (!valid) showToast('Please fill in all required fields', 'error');
  return valid;
}

function setSpinner(id, on) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('visible', on);
}

async function extractError(res) {
  try {
    const data = await res.json();
    return data.message || data.title || JSON.stringify(data);
  } catch {
    return `HTTP ${res.status}`;
  }
}

function escHtml(str) {
  return String(str).replace(/[&<>"']/g, c =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])
  );
}

function showToast(msg, type = 'info') {
  const icons = { success: '✓', error: '✕', info: 'i' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="toast-ico">${icons[type]}</span><span>${escHtml(msg)}</span>`;
  document.getElementById('toastContainer').appendChild(el);
  setTimeout(() => el.remove(), 3800);
}


