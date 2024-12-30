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
      },
      errors: {
        credentials: 'Invalid email or password',
        emailNotVerified: 'Email not verified. Please check your email.',
        oauthAccount: 'This account is linked to {provider}. Please login using {provider}.'
      }
    },
    register: {
      title: 'Create my account!',
      socialDivider: 'or enter your details below',
      form: {
        name: 'Enter your name',
        email: 'Your best email',
        password: 'A strong password',
        submit: 'Sign up'
      },
      terms: {
        text: 'By creating an account, you agree to our',
        termsLink: 'terms of use',
        and: 'and',
        privacyLink: 'privacy policy'
      },
      hasAccount: 'Already have an account?',
      login: 'Sign in',
      messages: {
        success: 'User created successfully!'
      },
      errors: {
        exists: 'Email already registered!',
        create: 'Error creating user. Please try again later.'
      }
    },
    confirmRegister: {
      title: 'Verify registration!',
      description:
        'To complete the registration, you need to enter the verification code sent to the email',
      submit: 'Confirm registration!',
      messages: {
        success: 'Registration confirmed successfully!'
      },
      errors: {
        invalidEmail: 'Invalid email!',
        invalidCode: 'Invalid verification code!',
        expiredCode: 'Verification code expired!'
      }
    },
    forgotPassword: {
      title: 'Recover password',
      description: 'Enter your email to receive password recovery instructions:',
      form: {
        email: 'Your registered email',
        submit: 'Send instructions'
      },
      rememberPassword: 'Remembered your password?',
      login: 'Sign in',
      messages: {
        success: 'Instructions sent to your email!'
      },
      errors: {
        oauthAccount:
          'This account is linked to {provider}. So it is not possible to reset the password.'
      }
    },
    resetPassword: {
      title: 'Reset password',
      description: 'Enter the verification code sent to the email',
      form: {
        password: 'New password',
        submit: 'Reset password'
      },
      messages: {
        success: 'Password changed successfully!'
      },
      errors: {
        invalidData: 'Invalid data!',
        invalidCode: 'Invalid verification code!',
        expiredCode: 'Verification code expired! Request a new code.'
      }
    }
  }
}
