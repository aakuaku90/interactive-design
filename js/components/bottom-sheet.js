let overlay = null;
let icon = null;
let message = null;
let dismissTimer = null;
let onDismissCallback = null;

function create() {
  overlay = document.createElement('div');
  overlay.className = 'bottom-sheet-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  overlay.innerHTML = `
    <div class="bottom-sheet" role="alert" aria-live="polite">
      <div class="bottom-sheet-handle"></div>
      <div class="bottom-sheet-content">
        <span class="bottom-sheet-icon"></span>
        <p class="bottom-sheet-message"></p>
      </div>
      <button class="bottom-sheet-close" aria-label="Close notification">&times;</button>
    </div>
  `;

  icon = overlay.querySelector('.bottom-sheet-icon');
  message = overlay.querySelector('.bottom-sheet-message');

  overlay.querySelector('.bottom-sheet-close').addEventListener('click', dismiss);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) dismiss();
  });

  document.body.appendChild(overlay);
}

export function show(msg, type = 'success', { autoDismiss = 3000, onDismiss } = {}) {
  if (!overlay) create();

  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }

  onDismissCallback = onDismiss || null;

  icon.className = `bottom-sheet-icon is-${type}`;
  icon.textContent = type === 'success' ? '\u2713' : '!';
  message.textContent = msg;

  overlay.classList.add('is-visible');
  overlay.setAttribute('aria-hidden', 'false');

  if (autoDismiss > 0) {
    dismissTimer = setTimeout(dismiss, autoDismiss);
  }
}

export function dismiss() {
  if (!overlay) return;

  if (dismissTimer) {
    clearTimeout(dismissTimer);
    dismissTimer = null;
  }

  overlay.classList.remove('is-visible');
  overlay.setAttribute('aria-hidden', 'true');

  if (onDismissCallback) {
    const cb = onDismissCallback;
    onDismissCallback = null;
    cb();
  }
}
