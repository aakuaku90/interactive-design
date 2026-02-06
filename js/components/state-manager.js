const TRANSITIONS = {
  idle:       { SUBMIT: 'submitting' },
  submitting: { SUCCESS: 'success', ERROR: 'error' },
  success:    { RESET: 'idle' },
  error:      { RESET: 'idle' },
};

export function createStateMachine() {
  let currentState = 'idle';
  const listeners = [];

  function subscribe(fn) {
    listeners.push(fn);
  }

  function notify(prev, next, data) {
    for (const fn of listeners) {
      fn(next, prev, data);
    }
  }

  function transition(action, data) {
    const allowed = TRANSITIONS[currentState];
    if (!allowed || !allowed[action]) {
      console.warn(`Invalid transition: ${currentState} + ${action}`);
      return false;
    }
    const prev = currentState;
    currentState = allowed[action];
    notify(prev, currentState, data);
    return true;
  }

  function getState() {
    return currentState;
  }

  return { subscribe, transition, getState };
}
