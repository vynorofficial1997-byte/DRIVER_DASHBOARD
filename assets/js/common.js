/* Shared behaviour: profile panel, name sync, placeholder links, card links, detail modal, row menu */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---- profile panel (same on every page) ---- */
  document.body.insertAdjacentHTML('beforeend', "<div class=\"profile-backdrop\" id=\"profile-backdrop\" hidden></div>\n  <aside class=\"profile-editor\" id=\"profile-editor\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"profile-editor-title\" hidden>\n    <h2 id=\"profile-editor-title\">EDIT PROFILE</h2>\n    <button class=\"photo-button\" type=\"button\" aria-label=\"Change profile photo\"><svg viewBox=\"0 0 80 80\" aria-hidden=\"true\"><circle cx=\"40\" cy=\"40\" r=\"34\"/><circle cx=\"40\" cy=\"29\" r=\"9\"/><path d=\"M20 61c2.5-10 9-15 20-15s17.5 5 20 15\"/></svg></button>\n    <label class=\"photo-label\" for=\"photo-input\">Change Profile Photo</label><input id=\"photo-input\" type=\"file\" accept=\"image/*\" hidden>\n    <form id=\"profile-form\">\n      <div class=\"profile-fields\">\n        <label>Full Name<input name=\"fullName\" value=\"GUGAN\" autocomplete=\"name\"></label>\n        <label>User ID<input name=\"userId\" value=\"FEG-1234\"></label>\n        <label>Email Address<input name=\"email\" type=\"email\" value=\"gugan123@gmail.com\" autocomplete=\"email\"></label>\n        <label>Phone Number<input name=\"phone\" type=\"tel\" value=\"123456789\" autocomplete=\"tel\"></label>\n        <label>Date Of Birth<input name=\"dob\" placeholder=\"DD/MM/YYYY\" onfocus=\"this.type='date'\" onblur=\"if(!this.value)this.type='text'\"></label>\n        <label>Gender<select name=\"gender\"><option value=\"\" selected>Select Gender</option><option>Female</option><option>Male</option><option>Other</option><option>Prefer not to say</option></select></label>\n      </div>\n      <button class=\"save-profile\" type=\"submit\">Save Changes</button>\n    </form>\n  </aside>");
  var toggle = $('#profile-toggle'), backdrop = $('#profile-backdrop'), editor = $('#profile-editor'),
      form = $('#profile-form'), label = $('#profile-display-name');
  var saved = store.get('ausway.name');
  if (saved) { label.textContent = saved; form.elements.fullName.value = saved; }
  function openP() { backdrop.hidden = editor.hidden = false; toggle.setAttribute('aria-expanded', 'true'); }
  function closeP() { backdrop.hidden = editor.hidden = true; toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', openP);
  backdrop.addEventListener('click', closeP);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !editor.hidden) closeP(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var n = form.elements.fullName.value.trim();
    if (n) { label.textContent = n; store.set('ausway.name', n); }
    closeP();
  });
  $('.photo-button').addEventListener('click', function () { $('#photo-input').click(); });
  $('#photo-input').addEventListener('change', function (e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      var b = $('.photo-button'); b.innerHTML = '';
      var im = document.createElement('img'); im.src = r.result; im.alt = 'Selected profile photo';
      im.style.cssText = 'width:82px;height:82px;border-radius:50%;object-fit:cover;border:5px solid #900d12';
      b.appendChild(im);
    };
    r.readAsDataURL(f);
  });

  /* ---- links ---- */
  document.querySelectorAll('a[href="#"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); }); });
  document.querySelectorAll('[data-href]').forEach(function (el) { el.addEventListener('click', function () { location.href = el.dataset.href; }); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.pager button'); if (!b || /[<>]/.test(b.textContent)) return;
    b.parentNode.querySelectorAll('button').forEach(function (x) { x.classList.remove('on'); }); b.classList.add('on');
  });

  /* ---- shared icons, modal and row menu used by Trips and Drivers ---- */
  var esc = function (v) { return String(v).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var DOC = '<svg viewBox="0 0 24 24"><path d="M6 2.5h8l4 4v15H6zM14 2.5v4h4M9 12h6M9 16h6"/></svg>';
  window.Ausway = {
    esc: esc,
    userIcon: '<svg class="uic" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17"/><circle cx="20" cy="14" r="5"/><path d="M10.5 30c1.2-5 4.3-7.5 9.5-7.5s8.3 2.5 9.5 7.5"/></svg>',
    viewIcon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    moreIcon: '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="currentColor" stroke="none"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></g></svg>',
    openDetails: function (title, fields) {
      var m = $('#details');
      if (!m) {
        m = document.createElement('div'); m.id = 'details'; m.className = 'modal-backdrop'; document.body.appendChild(m);
        m.addEventListener('click', function (e) {
          var v = e.target.closest('a[data-doc]');
          if (v) { e.preventDefault(); alert(v.dataset.doc + ' preview'); return; }
          if (e.target === m || e.target.closest('.close')) m.classList.remove('on');
        });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') m.classList.remove('on'); });
      }
      m.innerHTML = '<div class="modal" role="dialog" aria-modal="true"><div class="modal-inner"><h2>' + esc(title) +
        '</h2><button class="close" aria-label="Close">&times;</button><dl class="info">' +
        fields.map(function (f) { return '<div' + (f[3] ? ' class="wide"' : '') + '><dt>' + f[0] + '</dt><dd class="' + (f[2] || '') + '">' + esc(f[1]) + '</dd></div>'; }).join('') +
        '</dl><p class="docs-title">Documents:</p>' +
        ['ID Proof', 'Address Proof', 'Drivers Licence'].map(function (d) {
          return '<div class="doc"><span class="label">' + DOC + d + '</span><span class="ok">Verified</span><a href="#" data-doc="' + d + '">View</a></div>';
        }).join('') + '</div></div>';
      m.classList.add('on');
    },
    menu: function (e, items) {
      e.stopPropagation();
      var m = $('#menu');
      if (!m) { m = document.createElement('div'); m.id = 'menu'; m.className = 'menu'; document.body.appendChild(m);
        document.addEventListener('click', function () { m.style.display = 'none'; }); }
      m.innerHTML = '';
      items.forEach(function (it) {
        var b = document.createElement('button'); b.textContent = it[0]; if (it[2]) b.className = it[2];
        b.addEventListener('click', it[1]); m.appendChild(b);
      });
      var r = e.currentTarget.getBoundingClientRect(); m.style.display = 'block';
      m.style.top = (r.bottom + scrollY + 6) + 'px';
      m.style.left = Math.max(8, r.right + scrollX - m.offsetWidth) + 'px';
    }
  };
})();
