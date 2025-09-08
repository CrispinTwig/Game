import './styles/index.scss';

//

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Stop Chrome’s default mini-infobar
    e.preventDefault();

    // Save the event for later
    deferredPrompt = e;

    // Show your install button
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
        installBtn.style.display = 'block';

        installBtn.addEventListener('click', async () => {
            installBtn.style.display = 'none'; // Hide button after click

            deferredPrompt.prompt(); // Show the prompt

            /*
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);
            */

            deferredPrompt = null; // Clear so it doesn’t fire again
        });
    }
});


//

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log('Service Worker registered!'))
        .catch(err => console.error('SW registration failed:', err));
}

import './mechanics/follower';
