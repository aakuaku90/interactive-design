import { saveSubmission } from '../db.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields) {
  const errors = {};

  if (!fields.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!fields.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_RE.test(fields.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!fields.message.trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}

function showErrors(form, errors) {
  form.querySelectorAll('.form-group').forEach((group) => {
    const input = group.querySelector('input, textarea');
    const errorEl = group.querySelector('.error-message');
    const name = input.getAttribute('name');
    if (errors[name]) {
      group.classList.add('has-error');
      errorEl.textContent = errors[name];
    } else {
      group.classList.remove('has-error');
      errorEl.textContent = '';
    }
  });
}

function clearErrors(form) {
  showErrors(form, {});
}

export function initForm(stateMachine) {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    const errors = validate(data);

    if (Object.keys(errors).length > 0) {
      showErrors(form, errors);
      // Trigger shake on the form
      form.classList.add('animate-shake');
      form.addEventListener('animationend', () => form.classList.remove('animate-shake'), { once: true });
      stateMachine.transition('SUBMIT');
      stateMachine.transition('ERROR');
      return;
    }

    clearErrors(form);
    stateMachine.transition('SUBMIT');

    try {
      // Simulate slight network delay for UX
      await new Promise((r) => setTimeout(r, 800));
      await saveSubmission(data);
      stateMachine.transition('SUCCESS');
      form.reset();
    } catch (err) {
      console.error('Save failed:', err);
      stateMachine.transition('ERROR');
    }
  });
}
