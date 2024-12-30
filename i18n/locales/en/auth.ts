export default {
  auth: {
    login: {
      title: 'Login',
      welcome: 'Welcome back!',
      socialDivider: 'or enter your details below',
      form: {
        email: 'Your email',
        password: 'Your password',
        forgotPassword: 'Forgot password?',
        submit: 'Sign in'
      },
      noAccount: "Don't have an account?",
      signUp: 'Sign up',
      messages: {
        unauthorized: 'You need to be logged in to access this page',
        logoutSuccess: 'You have been successfully logged out!',
        loginSuccess: 'Successfully logged in!'
      }
    },
    errors: {
      credentials: 'Invalid email or password',
      emailNotVerified: 'Email not verified. Please check your email.',
      oauthAccount: 'This account is linked to {provider}. Please login using {provider}.'
    }
  }
}
