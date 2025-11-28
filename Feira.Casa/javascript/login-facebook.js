// Simulador de Login Facebook sem necessidade de App ID
function initializeFacebookSignIn() {
    const fbBtn = document.getElementById('facebookLoginBtn');
    if (fbBtn) {
        fbBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showFacebookModal();
        });
    }
}

function showFacebookModal() {
    const modal = document.createElement('div');
    modal.id = 'facebookLoginModal';
    modal.style.cssText = `
        position: fixed;
        top: 0; left: 0; right:0; bottom:0;
        display:flex; align-items:center; justify-content:center;
        background: rgba(0,0,0,0.5); z-index:10000;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background:white; border-radius:8px; padding:32px; width:90%; max-width:420px;
        box-shadow:0 10px 40px rgba(0,0,0,0.3); font-family:inherit;
    `;

    content.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:20px;">
            <div style="display:flex; align-items:center; gap:10px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.86h2.74l-.44 2.9h-2.3v6.99C18.34 21.12 22 16.99 22 12z" fill="#1877F2"/>
                </svg>
                <strong style="font-size:16px; color:#1c1e21;">Entrar com Facebook</strong>
            </div>
            <button onclick="document.getElementById('facebookLoginModal').remove()" style="background:none;border:none;font-size:22px;cursor:pointer;color:#565959">×</button>
        </div>
        <p style="color:#606770; margin:0 0 16px;">Use seu e-mail ou telefone para continuar no Facebook</p>
        <input id="fbIdentifier" type="text" placeholder="Email ou telefone" style="width:100%; padding:10px; border:1px solid #ccd0d5; border-radius:4px; margin-bottom:16px; font-size:14px;">
        <div style="display:flex; gap:10px;">
            <button onclick="document.getElementById('facebookLoginModal').remove()" style="flex:1; padding:10px; background:white; border:1px solid #ccd0d5; border-radius:4px;">Cancelar</button>
            <button onclick="handleFacebookSignIn()" style="flex:1; padding:10px; background:#1877F2; color:white; border:none; border-radius:4px;">Continuar</button>
        </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    const input = document.getElementById('fbIdentifier');
    setTimeout(() => input && input.focus(), 100);

    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') handleFacebookSignIn();
        });
    }
}

function handleFacebookSignIn() {
    const input = document.getElementById('fbIdentifier');
    const val = input ? input.value.trim() : '';
    if (!val) return alert('Digite um email ou telefone válido');

    const modal = document.getElementById('facebookLoginModal');
    if (modal) modal.remove();

    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.textContent = `Login com Facebook realizado com sucesso: ${val}`;
        successMessage.style.display = 'block';
        setTimeout(() => { window.location.href = 'home.html'; }, 1600);
    } else {
        window.location.href = 'home.html';
    }
}

// inicializar
document.addEventListener('DOMContentLoaded', initializeFacebookSignIn);
