// firebase-init.js - Configuração do Firebase
// ===================================================
// INSTRUÇÕES DE CONFIGURAÇÃO:
// 1. Vá para https://console.firebase.google.com
// 2. Abra seu projeto PCM System
// 3. Clique em ⚙️ > Configurações do Projeto
// 4. Vá para "Seus apps" > </> (Web)
// 5. Copie o firebaseConfig completo
// 6. Cole abaixo, substituindo os valores
// 7. No Console Firebase, habilite:
//    - Authentication > Método de Login > E-mail/Senha
//    - Authentication > Método de Login > Google
// ===================================================

// 🔐 CONFIGURAÇÃO DO FIREBASE - PROJETO PCM SYSTEM
const firebaseConfig = {
  apiKey: "AIzaSyAe5vcJe5mUUxAX5mXWFjCwL26esbxLvbo",
  authDomain: "projeto-p-c672e.firebaseapp.com",
  databaseURL: "https://projeto-p-c672e-default-rtdb.firebaseio.com",
  projectId: "projeto-p-c672e",
  storageBucket: "projeto-p-c672e.firebasestorage.app",
  messagingSenderId: "474078684255",
  appId: "1:474078684255:web:d7b603028fbe0713e0a7ea",
  measurementId: "G-ZCKVM5HW4G"
};

/**
 * Inicializa o Firebase com tratamento de erros robusto
 * Usa a API Compat (firebase-app-compat.js, firebase-auth-compat.js)
 */
function initializeFirebase() {
  try {
    // Verifica se Firebase já foi inicializado
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      console.log('✅ Firebase inicializado com sucesso');
      console.log('📌 Projeto:', firebaseConfig.projectId);
      
      // Configurações adicionais de segurança
      firebase.auth().settings.appVerificationDisabledForTesting = false;
      
      return true;
    } else {
      console.log('⚠️ Firebase já estava inicializado');
      return true;
    }
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    return false;
  }
}

// Inicializar assim que o script carregar
if (typeof firebase !== 'undefined') {
  initializeFirebase();
} else {
  console.warn('⚠️ Firebase não foi carregado ainda. Verifique se os scripts foram incluídos no HTML na ordem correta.');
}
