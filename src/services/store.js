import { Store } from 'svelte/store.js';

class PrescriptionStore extends Store { };

const store = new PrescriptionStore({
  is_loading: true,
  is_logged_in: false,
  user: { name: '', surname: '', email: '', avatar: '' },
  role: null,
  key: null
});

export default store;