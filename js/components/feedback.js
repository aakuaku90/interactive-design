const RESET_DELAY = 3000;

export function initFeedback(stateMachine) {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('submit-btn');

  stateMachine.subscribe((state) => {
    // Update form class
    form.classList.toggle('is-submitting', state === 'submitting');

    // Update button
    btn.classList.toggle('is-submitting', state === 'submitting');
    btn.classList.toggle('is-success', state === 'success');
    btn.disabled = state === 'submitting' || state === 'success';

    // Toast & auto-reset
    if (state === 'success') {
      showToast('Submission saved successfully!', 'success');
      setTimeout(() => stateMachine.transition('RESET'), RESET_DELAY);
    } else if (state === 'error') {
      showToast('Something went wrong. Please try again.', 'error');
      setTimeout(() => stateMachine.transition('RESET'), RESET_DELAY);
    }
  });
}

export function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type} animate-slide-in`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('animate-slide-in');
    toast.classList.add('animate-fade-out');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  }, RESET_DELAY);
}

