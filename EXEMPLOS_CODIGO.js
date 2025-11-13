// ARQUIVO DE REFERÊNCIA - Exemplos de Código
// Útil para entender e estender o sistema

// ============================================
// 1. COMO ACESSAR O USUÁRIO LOGADO
// ============================================

// Adicionar isso em index.html (após login bem-sucedido)
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('Usuário logado:', {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            createdAt: user.metadata.creationTime,
            lastSignIn: user.metadata.lastSignInTime
        });
        
        // Guardar dados do usuário no localStorage
        localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: user.displayName || 'Usuário'
        }));
    } else {
        console.log('Nenhum usuário logado');
        // Redirecionar para login
        window.location.href = 'login.html';
    }
});

// ============================================
// 2. LOGOUT DO USUÁRIO
// ============================================

function logout() {
    firebase.auth().signOut()
        .then(() => {
            console.log('✅ Logout bem-sucedido');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        })
        .catch((error) => {
            console.error('❌ Erro ao fazer logout:', error);
        });
}

// Adicionar botão no HTML
// <button onclick="logout()">Sair</button>

// ============================================
// 3. OBTER DADOS DO USUÁRIO LOGADO
// ============================================

function getCurrentUser() {
    const user = firebase.auth().currentUser;
    if (user) {
        return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            phoneNumber: user.phoneNumber
        };
    }
    return null;
}

// Usar:
const usuarioAtual = getCurrentUser();
console.log('Usuário:', usuarioAtual);

// ============================================
// 4. ATUALIZAR PERFIL DO USUÁRIO
// ============================================

function updateUserProfile(nome, foto) {
    const user = firebase.auth().currentUser;
    
    return user.updateProfile({
        displayName: nome,
        photoURL: foto
    })
    .then(() => {
        console.log('✅ Perfil atualizado');
        return true;
    })
    .catch((error) => {
        console.error('❌ Erro ao atualizar:', error);
        return false;
    });
}

// Usar:
// updateUserProfile('João Silva', 'https://...');

// ============================================
// 5. ALTERAR SENHA
// ============================================

function changePassword(senhaAtual, senhaNova) {
    const user = firebase.auth().currentUser;
    
    if (!user || !user.email) {
        showToast('Usuário não autenticado', 'error');
        return;
    }
    
    // Reautenticar
    const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        senhaAtual
    );
    
    return user.reauthenticateWithCredential(credential)
        .then(() => {
            // Alterar senha
            return user.updatePassword(senhaNova);
        })
        .then(() => {
            console.log('✅ Senha alterada com sucesso');
            showToast('Senha alterada!', 'success');
            return true;
        })
        .catch((error) => {
            console.error('❌ Erro:', error);
            handleAuthError(error);
            return false;
        });
}

// ============================================
// 6. ENVIAR E-MAIL DE VERIFICAÇÃO
// ============================================

function sendVerificationEmail() {
    const user = firebase.auth().currentUser;
    
    if (!user) {
        showToast('Nenhum usuário logado', 'error');
        return;
    }
    
    user.sendEmailVerification()
        .then(() => {
            console.log('✅ E-mail de verificação enviado');
            showToast('Verifique seu e-mail', 'success');
        })
        .catch((error) => {
            console.error('❌ Erro ao enviar:', error);
            handleAuthError(error);
        });
}

// ============================================
// 7. RECUPERAÇÃO DE SENHA (Enviar Reset)
// ============================================

function sendPasswordResetEmail(email) {
    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            console.log('✅ E-mail de reset enviado');
            showToast('Verifique seu e-mail para resetar a senha', 'success');
        })
        .catch((error) => {
            console.error('❌ Erro:', error);
            if (error.code === 'auth/user-not-found') {
                showToast('Este e-mail não está cadastrado', 'error');
            } else {
                handleAuthError(error);
            }
        });
}

// Usar em página de "Esqueci minha senha":
// const email = prompt('Digite seu e-mail:');
// sendPasswordResetEmail(email);

// ============================================
// 8. VERIFICAR SE E-MAIL JÁ ESTÁ CADASTRADO
// ============================================

function checkIfEmailExists(email) {
    return firebase.auth().fetchSignInMethodsForEmail(email)
        .then((methods) => {
            return methods && methods.length > 0;
        })
        .catch((error) => {
            console.error('❌ Erro ao verificar:', error);
            return false;
        });
}

// Usar:
// checkIfEmailExists('usuario@empresa.com').then(existe => {
//     if (existe) {
//         console.log('E-mail já cadastrado');
//     }
// });

// ============================================
// 9. LISTAR TODOS OS PROVEDORES DE LOGIN
// ============================================

function getSignInMethods(email) {
    return firebase.auth().fetchSignInMethodsForEmail(email)
        .then((methods) => {
            console.log('Métodos de login:', methods);
            // Retorna: ['password', 'google.com', 'facebook.com', etc]
            return methods;
        });
}

// ============================================
// 10. SINCRONIZAR COM REALTIME DATABASE
// ============================================

function saveUserToDatabase(user) {
    const db = firebase.database();
    
    const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date().toISOString(),
        role: 'user' // 'user', 'admin', 'manager'
    };
    
    return db.ref('users/' + user.uid).set(userData)
        .then(() => {
            console.log('✅ Dados salvos no banco');
        })
        .catch((error) => {
            console.error('❌ Erro ao salvar:', error);
        });
}

// Usar:
// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         saveUserToDatabase(user);
//     }
// });

// ============================================
// 11. MONITORAR MUDANÇAS NO USUÁRIO
// ============================================

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('✅ Usuário logado:', user.email);
        // Mostrar dashboard
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';
    } else {
        console.log('❌ Usuário não logado');
        // Mostrar login
        document.getElementById('login-screen').style.display = 'block';
        document.getElementById('dashboard').style.display = 'none';
    }
});

// ============================================
// 12. PERSISTÊNCIA DE SESSÃO
// ============================================

// Firebase já faz isso automaticamente, mas você pode controlar:

// Manter logado (padrão)
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
        console.log('✅ Sessão persistida localmente');
    });

// Apenas na aba atual
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

// Sem persistência
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

// ============================================
// 13. LIDAR COM EXPIRAÇÃO DE SESSÃO
// ============================================

firebase.auth().onIdTokenChanged((user) => {
    if (user) {
        console.log('🔄 Token atualizado');
        // Token foi renovado
    } else {
        console.log('⚠️ Sessão expirou');
        // Redirecionar para login
        window.location.href = 'login.html';
    }
});

// ============================================
// 14. INTEGRAÇÃO COM LOCALSTORAGE
// ============================================

function saveSessionData() {
    const user = firebase.auth().currentUser;
    
    if (user) {
        const sessionData = {
            uid: user.uid,
            email: user.email,
            timestamp: Date.now(),
            role: 'user'
        };
        
        localStorage.setItem('pcm_session', JSON.stringify(sessionData));
        localStorage.setItem('pcm_session_expires', Date.now() + (24 * 60 * 60 * 1000)); // 24h
    }
}

function getSessionData() {
    const sessionStr = localStorage.getItem('pcm_session');
    const expiresAt = localStorage.getItem('pcm_session_expires');
    
    if (!sessionStr || !expiresAt) return null;
    
    if (Date.now() > parseInt(expiresAt)) {
        clearSessionData();
        return null;
    }
    
    return JSON.parse(sessionStr);
}

function clearSessionData() {
    localStorage.removeItem('pcm_session');
    localStorage.removeItem('pcm_session_expires');
}

// ============================================
// 15. TRATAMENTO AVANÇADO DE ERROS
// ============================================

const authErrorMessages = {
    'auth/invalid-email': 'E-mail inválido',
    'auth/user-not-found': 'Usuário não encontrado',
    'auth/wrong-password': 'Senha incorreta',
    'auth/email-already-in-use': 'E-mail já cadastrado',
    'auth/weak-password': 'Senha muito fraca',
    'auth/too-many-requests': 'Muitas tentativas, tente depois',
    'auth/account-exists-with-different-credential': 'Conta existe com outro método',
    'auth/popup-blocked-by-browser': 'Popup bloqueado',
    'auth/popup-closed-by-user': 'Login cancelado',
    'auth/network-request-failed': 'Erro de conexão',
    'auth/operation-not-allowed': 'Operação não permitida',
    'auth/invalid-api-key': 'Chave API inválida',
    'auth/permission-denied': 'Permissão negada'
};

function getErrorMessage(errorCode) {
    return authErrorMessages[errorCode] || 'Erro desconhecido';
}

// ============================================
// EXEMPLO COMPLETO: Login com E-mail
// ============================================

/*
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showToast('Preencha todos os campos', 'error');
        return;
    }
    
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        console.log('✅ Login bem-sucedido');
        showToast('Bem-vindo!', 'success');
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    } catch (error) {
        console.error('❌ Erro:', error);
        showToast(getErrorMessage(error.code), 'error');
    }
});
*/

// ============================================
// EXEMPLO COMPLETO: Registro de Novo Usuário
// ============================================

/*
async function registerNewUser(email, password, displayName) {
    try {
        // 1. Criar usuário
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log('✅ Usuário criado:', result.user.uid);
        
        // 2. Atualizar perfil
        await result.user.updateProfile({
            displayName: displayName
        });
        console.log('✅ Perfil atualizado');
        
        // 3. Enviar verificação de e-mail
        await result.user.sendEmailVerification();
        console.log('✅ E-mail de verificação enviado');
        
        // 4. Salvar no banco
        await saveUserToDatabase(result.user);
        console.log('✅ Dados salvos');
        
        showToast('Conta criada com sucesso! Verifique seu e-mail.', 'success');
        return result.user;
        
    } catch (error) {
        console.error('❌ Erro:', error);
        showToast(getErrorMessage(error.code), 'error');
        return null;
    }
}
*/

// ============================================
// DICAS IMPORTANTES
// ============================================

/*
✅ BOAS PRÁTICAS:

1. Sempre validar entrada do usuário
2. Usar try/catch para operações async
3. Mostrar feedback ao usuário
4. Nunca expor dados sensíveis no console (prod)
5. Persistir apenas dados não-sensíveis no localStorage
6. Usar HTTPS em produção
7. Implementar rate limiting
8. Monitorar atividades suspeitas
9. Manter bibliotecas atualizadas
10. Testar em múltiplos navegadores

❌ O QUE NÃO FAZER:

1. Armazenar senhas em localStorage
2. Enviar credenciais não criptografadas
3. Expor firebaseConfig em git público
4. Confiar apenas em validação frontend
5. Usar credenciais hardcoded
6. Ignorar erros de autenticação
7. Manter sessões abertas indefinidamente
8. Usar cookies inseguros
9. Fazer requisições diretas ao banco no cliente
10. Esquecer de implementar CORS
*/
