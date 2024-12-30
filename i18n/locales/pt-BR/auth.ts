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
      },
      errors: {
        credentials: 'E-mail ou senha inválidos',
        emailNotVerified: 'E-mail não verificado. Por favor, verifique seu e-mail.',
        oauthAccount:
          'Esta conta está vinculada ao {provider}. Por favor, faça login usando {provider}.'
      }
    },
    register: {
      title: 'Criar minha conta!',
      socialDivider: 'ou digite seus dados abaixo',
      form: {
        name: 'Digite seu nome',
        email: 'Seu melhor e-mail',
        password: 'Uma senha forte',
        submit: 'Cadastrar'
      },
      terms: {
        text: 'Ao criar uma conta, você concorda com os',
        termsLink: 'termos de uso',
        and: 'e a',
        privacyLink: 'política de privacidade'
      },
      hasAccount: 'Já tem uma conta?',
      login: 'Faça login',
      messages: {
        success: 'Usuário criado com sucesso!'
      },
      errors: {
        exists: 'E-mail já cadastrado!',
        create: 'Erro ao criar usuário. Por favor, tente novamente mais tarde.'
      }
    },
    confirmRegister: {
      title: 'Verificar cadastro!',
      description:
        'Para finalizar o cadastro, é necessário inserir o código de verificação enviado para o e-mail',
      submit: 'Confirmar cadastro!',
      messages: {
        success: 'Cadastro confirmado com sucesso!'
      },
      errors: {
        invalidEmail: 'E-mail inválido!',
        invalidCode: 'Código de verificação inválido!',
        expiredCode: 'Código de verificação expirado!'
      }
    },
    forgotPassword: {
      title: 'Recuperar senha',
      description: 'Digite seu e-mail para receber as instruções de recuperação de senha:',
      form: {
        email: 'Seu e-mail cadastrado',
        submit: 'Enviar instruções'
      },
      rememberPassword: 'Lembrou sua senha?',
      login: 'Faça login',
      messages: {
        success: 'Instruções enviadas para seu e-mail!'
      },
      errors: {
        oauthAccount:
          'Esta conta está vinculada ao {provider}. Então não é possível redefinir a senha.'
      }
    },
    resetPassword: {
      title: 'Redefinir senha',
      description: 'Digite o código de verificação enviado para o e-mail',
      form: {
        password: 'Nova senha',
        submit: 'Redefinir senha'
      },
      messages: {
        success: 'Senha alterada com sucesso!'
      },
      errors: {
        invalidData: 'Dados inválidos!',
        invalidCode: 'Código de verificação inválido!',
        expiredCode: 'Código de verificação expirado! Solicite um novo código.'
      }
    }
  }
}
