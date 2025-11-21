// --- Application State and Data ---
let currentScreen = 'login';

// Simulated Registered User for Sign-In Test
const SIMULATED_USER_CREDENTIALS = {
  email: 'user@example.com',
  password: 'password123',
  name: 'Shinei'
};

// Registration Data collected across steps
let registrationData = {
  name: '',
  email: '',
  password: ''
};

// --- Utility Functions ---

function clearErrors() {
  document.getElementById('login-error-box').classList.add('hidden');
  document.getElementById('password-error-box').classList.add('hidden');
}

function goToScreen(targetScreen, resetState = false) {
  clearErrors();

  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  const targetElement = document.getElementById(`screen-${targetScreen}`);
  if (targetElement) {
    targetElement.classList.add('active');
  }

  currentScreen = targetScreen;

  if (resetState) {
    registrationData = { name: '', email: '', password: '' };
    document.getElementById('login-form').reset();
    document.getElementById('register-step1-form')?.reset();
    document.getElementById('register-step2-form')?.reset();
    document.getElementById('register-step3-form')?.reset();
  }
}

window.onload = () => {
  goToScreen('login');
};

function showSimulatedMessage(content) {
  document.getElementById('message-content').textContent = content;
  document.getElementById('message-box').classList.remove('hidden');
}

function hideSimulatedMessage() {
  document.getElementById('message-box').classList.add('hidden');
}

// --- Sign-In Logic ---

function handleLogin(event) {
  event.preventDefault();
  clearErrors();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const errorBox = document.getElementById('login-error-box');
  const errorMessage = document.getElementById('login-error-message');

  if (email === SIMULATED_USER_CREDENTIALS.email && password === SIMULATED_USER_CREDENTIALS.password) {
    document.getElementById('welcome-user-name').textContent = SIMULATED_USER_CREDENTIALS.name;
    goToScreen('welcome');
  } else {
    errorMessage.textContent = 'The email or password you entered is incorrect. Please try again.';
    errorBox.classList.remove('hidden');
  }
}

// --- Registration Flow Logic ---

function handleRegistrationStep(event, step) {
  event.preventDefault();
  clearErrors();

  if (step === 1) {
    registrationData.name = document.getElementById('reg-name').value;
    registrationData.email = document.getElementById('reg-email').value;

    if (registrationData.email === SIMULATED_USER_CREDENTIALS.email) {
      showSimulatedMessage(`The email "${registrationData.email}" is already registered. Please sign in.`);
      return;
    }

    goToScreen('register_step2');
  } else if (step === 2) {
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const errorBox = document.getElementById('password-error-box');

    if (password !== confirmPassword) {
      errorBox.classList.remove('hidden');
      return;
    }

    registrationData.password = password;

    goToScreen('register_step3');
  } else if (step === 3) {
    // Terms checkbox required handled by form

    document.getElementById('welcome-user-name').textContent = registrationData.name;

    console.log("Registration Successful (Simulated):", registrationData);

    goToScreen('welcome');
  }
}


window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");

    loader.classList.add("loader-hidden");

    loader.addEventListener("transitionend", () => {
        document.body.removeChild("loader");
    })

})
