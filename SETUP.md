# 📋 CHECKLIST DE SETUP - PCM System v2.0

## ✅ Pré-Requisitos

- [ ] Node.js instalado (não obrigatório para frontend)
- [ ] Navegador moderno (Chrome, Firefox, Safari, Edge)
- [ ] Acesso ao Firebase Console
- [ ] Conta Google para testes

---

## 🔧 Configuração do Firebase Console

### 1. Projeto Firebase
- [ ] Projeto criado: `projeto-p-c672e`
- [ ] Plano: Spark (gratuito) ou Blaze (pay-as-you-go)

### 2. Autenticação - Métodos de Login
- [ ] **E-mail/Senha** - Habilitado ✓
  - Vá em: Authentication > Métodos de Login
  - Clique em "E-mail/Senha"
  - Habilite "E-mail/Senha" e "Permitir inscrição de usuários"

- [ ] **Google** - Habilitado ✓
  - Vá em: Authentication > Métodos de Login
  - Clique em "Google"
  - Habilite "Google"
  - Configure "Nome do projeto" e "E-mail de suporte"

### 3. Banco de Dados Realtime
- [ ] Criado (Spark plan)
- [ ] Localização: us-central1
- [ ] Modo de segurança: Teste (dev) ou Regras customizadas (prod)

### 4. Regras de Segurança (Importante!)

**Produção - Modo restrito:**
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

---

## 📁 Estrutura de Arquivos

```
✓ login.html              - Interface de login
✓ auth.js                 - Lógica de autenticação
✓ firebase-init.js        - Configuração Firebase
✓ index.html              - Dashboard (existente)
✓ README.md               - Documentação
✓ SETUP.md                - Este arquivo
```

---

## 🧪 Testes Locais

### 1. Testar em Servidor Local

```bash
# Python 3
python -m http.server 8000

# Node.js (com http-server)
npx http-server -p 8000

# Se usar VS Code
# Use: Live Server extension
```

### 2. Acessar
```
http://localhost:8000/login.html
```

### 3. Testar Funcionalidades

**Login com E-mail:**
- [ ] Campo e-mail aceita entrada
- [ ] Campo senha aceita entrada
- [ ] Botão mostrar/ocultar funciona
- [ ] Validação funciona (campos vazios)
- [ ] Mensagem de erro aparece
- [ ] Redirecionamento funciona

**Google Login:**
- [ ] Botão do Google aparece
- [ ] Popup de login abre
- [ ] Criação automática de conta
- [ ] Redirecionamento funciona

**Registro:**
- [ ] Link "Solicitar nova conta" funciona
- [ ] Campos aparecem
- [ ] Validação de senhas diferentes
- [ ] Validação de força de senha
- [ ] Mensagem informativa aparece
- [ ] Confirmação de sucesso

**Notificações:**
- [ ] Toast aparece no canto
- [ ] Cores corretas (verde/vermelho)
- [ ] Desaparece após 3 segundos
- [ ] Múltiplas notificações funcionam

---

## 🔐 Segurança - Checklist

### Antes de Publicar

- [ ] Verificar regras Firebase no modo produção
- [ ] Habilitar reCAPTCHA v3 (opcional)
- [ ] Habilitar 2FA para admin
- [ ] Configurar custom domain (opcional)
- [ ] Ativar monitoramento de segurança
- [ ] Testar com HTTPS
- [ ] Revisar política de senhas

### Em Produção

- [ ] HTTPS ativado em todos os domínios
- [ ] CSP headers configurados
- [ ] CORS restringido
- [ ] Rate limiting ativado
- [ ] Backups automáticos
- [ ] Logs de auditoria
- [ ] Alertas de segurança

---

## 🚀 Deploy

### Opção 1: Firebase Hosting (Recomendado)

```bash
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Inicializar projeto
firebase init hosting

# 4. Deploy
firebase deploy
```

### Opção 2: Servidor Web Próprio

```bash
# 1. Copiar arquivos para servidor
scp login.html auth.js firebase-init.js user@server:/var/www/pcm/

# 2. Configurar SSL/TLS
# ...

# 3. Acessar
https://seudominio.com/login.html
```

---

## 📊 Monitoramento

### Métricas a Acompanhar

- [ ] Taxa de sucesso de login
- [ ] Tempo médio de resposta
- [ ] Erros mais comuns
- [ ] Picos de tráfego
- [ ] Taxa de retenção de usuários

### Ferramentas

- Firebase Analytics
- Google Analytics 4
- CloudWatch (se AWS)
- Sentry (rastreamento de erros)

---

## 🆘 Troubleshooting

### Problema: "Firebase não foi carregado"

**Solução:**
```html
<!-- Verifique se os scripts estão em ordem -->
1. firebase-app-compat.js (primeiro)
2. firebase-auth-compat.js (segundo)
3. firebase-init.js (terceiro)
4. auth.js (quarto)
```

### Problema: Popup de Google bloqueado

**Solução:**
- Navegador bloqueou popup
- Libere em Configurações > Privacidade e segurança
- Tente em navegador diferente

### Problema: "E-mail já cadastrado com outro método"

**Solução:**
- Usuário usou Google, depois tentou e-mail/senha
- Solução: Combinar contas no Firebase Console

### Problema: Erro 401 ao fazer login

**Solução:**
- Credenciais incorretas
- Conta não existe
- Autenticação desabilitada no Firebase

---

## 📚 Recursos Úteis

- [Firebase Docs](https://firebase.google.com/docs)
- [JavaScript Compat SDK](https://firebase.google.com/docs/web/compat)
- [Authentication](https://firebase.google.com/docs/auth)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 👥 Contato

**Equipe de Desenvolvimento:**
- Icaro55v (GitHub)

**Suporte Técnico:**
- E-mail: suporte@empresa.com
- Slack: #pcm-system
- Telefone: +55 (11) XXXX-XXXX

---

## 📅 Versionamento

```
v2.0 - 13/11/2025
├── ✨ Arquitetura OOP (AuthManager)
├── ✨ Validações melhoradas
├── ✨ Tratamento de erros robusto
├── ✨ UI/UX otimizado
├── ✨ Acessibilidade melhorada
└── ✨ Performance otimizada

v1.0 - Data anterior
└── Versão inicial
```

---

**Última atualização:** 13 de Novembro de 2025
**Status:** ✅ Pronto para Deploy
