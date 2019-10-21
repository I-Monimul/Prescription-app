import App from './App.html';
import store from './services/store';

var app = new App({
	store,
	target: document.getElementById('app')
})

export default app;