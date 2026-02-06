import { show as showSheet } from './bottom-sheet.js';

export function initFeedback(stateMachine) {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('submit-btn');

  stateMachine.subscribe((state, prev, data) => {
    form.classList.toggle('is-submitting', state === 'submitting');
    btn.classList.toggle('is-submitting', state === 'submitting');
    btn.classList.toggle('is-success', state === 'success');
    btn.disabled = state === 'submitting' || state === 'success';

    const resetFn = () => stateMachine.transition('RESET');

    if (state === 'success') {
      const name = data?.name || '';
      showSheet(`Thanks ${name}, your submission was saved!`, 'success', { autoDismiss: 0, onDismiss: resetFn });
    } else if (state === 'error') {
      showSheet('Something went wrong. Please try again.', 'error', { autoDismiss: 0, onDismiss: resetFn });
    }
  });
}
