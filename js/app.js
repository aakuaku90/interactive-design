import { createStateMachine } from './components/state-manager.js';
import { initForm } from './components/form.js';
import { initFeedback } from './components/feedback.js';

const stateMachine = createStateMachine();

initFeedback(stateMachine);
initForm(stateMachine);
