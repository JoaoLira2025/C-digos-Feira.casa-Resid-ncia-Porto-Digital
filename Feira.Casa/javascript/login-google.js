// Simulador de Login Google sem necessidade de Client ID
function initializeGoogleSignIn() {
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showGoogleLoginModal();
        });
    }
}

// Função para mostrar a modal de login do Google
function showGoogleLoginModal() {
    // Criar modal HTML
    const modal = document.createElement('div');
    modal.id = 'googleLoginModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 40px;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;

    modalContent.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 30px; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 10px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span style="font-weight: 500; font-size: 14px; color: #202124;">Google</span>
            </div>
            <button onclick="document.getElementById('googleLoginModal').remove()" style="background: none; border: none; font-size: 24px; cursor: pointer; color: #5f6368;">×</button>
        </div>

        <h2 style="font-size: 24px; font-weight: 500; color: #202124; margin: 0 0 8px 0;">Fazer login com sua Conta Google</h2>
        
        <p style="color: #5f6368; font-size: 14px; margin: 0 0 24px 0;">Digite seu email ou número de telefone</p>

        <input type="email" id="googleEmail" placeholder="seu.email@gmail.com" style="
            width: 100%;
            padding: 12px;
            border: 1px solid #dadce0;
            border-radius: 4px;
            font-size: 16px;
            margin-bottom: 24px;
            box-sizing: border-box;
            font-family: inherit;
        ">

        <div style="display: flex; gap: 10px;">
            <button onclick="document.getElementById('googleLoginModal').remove()" style="
                flex: 1;
                padding: 10px;
                background: white;
                border: 1px solid #dadce0;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 500;
                color: #1f2937;
                cursor: pointer;
                transition: background 0.2s;
            " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">Cancelar</button>
            <button onclick="handleGoogleSignIn()" style="
                flex: 1;
                padding: 10px;
                background: #1f2937;
                border: none;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 500;
                color: white;
                cursor: pointer;
                transition: background 0.2s;
            " onmouseover="this.style.background='#111827'" onmouseout="this.style.background='#1f2937'">Próximo</button>
        </div>

        <p style="color: #5f6368; font-size: 12px; margin-top: 24px; text-align: center;">
            <a href="#" style="color: #1f73e8; text-decoration: none;">Criar uma conta</a>
        </p>
    `;

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Focar no input do email
    const emailInput = document.getElementById('googleEmail');
    setTimeout(() => emailInput.focus(), 100);

    // Permitir Enter para confirmar
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleGoogleSignIn();
        }
    });
}

// Função para processar o login
function handleGoogleSignIn() {
    const emailInput = document.getElementById('googleEmail');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
        alert('Por favor, digite um email válido');
        return;
    }

    // Simular login bem-sucedido
    const modal = document.getElementById('googleLoginModal');
    if (modal) modal.remove();

    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.textContent = `Login com Google realizado com sucesso! Email: ${email}`;
        successMessage.style.display = 'block';
        
        // Redirecionar após 2 segundos
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    }
}

// Executar quando a página carrega
document.addEventListener('DOMContentLoaded', initializeGoogleSignIn);

