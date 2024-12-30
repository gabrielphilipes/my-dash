export default {
  auth: {
    login: {
      title: 'Entrar',
      welcome: 'Bem-vindo de volta!',
      socialDivider: 'ou digite seus dados abaixo',
      form: {
        email: 'Seu e-mail',
        password: 'Sua senha',
        forgotPassword: 'Esqueceu sua senha?',
        submit: 'Entrar'
      },
      noAccount: 'Não tem uma conta?',
      signUp: 'Cadastre-se',
      messages: {
        unauthorized: 'Você precisa estar logado para acessar esta página',
        logoutSuccess: 'Você saiu com sucesso!',
        loginSuccess: 'Login realizado com sucesso!'
      }
    },
    errors: {
      credentials: 'E-mail ou senha inválidos',
      emailNotVerified: 'E-mail não verificado. Por favor, verifique seu e-mail.',
      oauthAccount:
        'Esta conta está vinculada ao {provider}. Por favor, faça login usando {provider}.'
    }
  }
}
