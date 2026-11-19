import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

const normalizeEmail = (email) => email.trim().toLowerCase();

export function AuthScreen({ accounts, currentUser, onLogin, onRegister }) {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [recoveryMethod, setRecoveryMethod] = useState('email');
  const [contact, setContact] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  if (currentUser && pathname !== '/recovery') {
    return <Navigate to="/" replace />;
  }

  const isRegister = pathname === '/register';
  const isRecovery = pathname === '/recovery';
  const title = isRegister ? 'Crear cuenta' : isRecovery ? 'Recuperar acceso' : 'Iniciar sesión';

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (isRecovery) {
      if (!generatedCode) {
        const phoneDigits = contact.replace(/\D/g, '');
        const validContact =
          recoveryMethod === 'email'
            ? accounts.some((account) => account.email === normalizeEmail(contact))
            : /^\+?[\d\s()-]+$/.test(contact) && phoneDigits.length >= 8 && phoneDigits.length <= 15;

        if (!validContact) {
          setError(
            recoveryMethod === 'email'
              ? 'No encontramos una cuenta registrada con ese correo.'
              : 'Ingresá un número de teléfono válido.'
          );
          return;
        }

        const values = new Uint32Array(1);
        window.crypto.getRandomValues(values);
        setGeneratedCode(String(values[0] % 100000000).padStart(8, '0'));
        setEnteredCode('');
        setIsCodeVerified(false);
        return;
      }

      if (enteredCode !== generatedCode) {
        setError('El código ingresado no es correcto.');
        return;
      }

      setIsCodeVerified(true);
      setError('');
      return;
    }

    const normalizedEmail = normalizeEmail(email);
    if (isRegister) {
      const registrationError = onRegister({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        password
      });

      if (registrationError) {
        setError(registrationError);
        return;
      }
      setEmail('');
      setPassword('');
      navigate('/login', { replace: true, state: { registered: true } });
      return;
    } else {
      const loginError = onLogin(normalizedEmail, password);
      if (loginError) {
        setError(loginError);
        return;
      }
    }

    navigate('/', { replace: true });
  };

  const resetRecovery = (method) => {
    setRecoveryMethod(method);
    setContact('');
    setGeneratedCode('');
    setEnteredCode('');
    setIsCodeVerified(false);
    setError('');
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <div className="auth-brand" aria-label="ExpenseTracker">
          <span className="brand-mark">€</span>
          <span>ExpenseTracker</span>
        </div>

        <header className="auth-heading">
          <p className="eyebrow">{isRecovery ? 'Ayuda con tu cuenta' : 'Tu dinero, más claro'}</p>
          <h1 id="auth-title">{title}</h1>
          <p className="screen-copy">
            {isRegister
              ? 'Registrate para empezar a organizar tus gastos.'
              : isRecovery
                ? 'Elegí cómo querés verificar tu identidad.'
                : 'Ingresá a tu cuenta para continuar.'}
          </p>
        </header>

        {isRecovery ? (
          <div className="auth-recovery">
            <div className="auth-methods" aria-label="Método de recuperación">
              <button
                type="button"
                className={`auth-method ${recoveryMethod === 'email' ? 'is-selected' : ''}`}
                onClick={() => resetRecovery('email')}
                aria-pressed={recoveryMethod === 'email'}
              >
                Por Gmail
              </button>
              <button
                type="button"
                className={`auth-method ${recoveryMethod === 'sms' ? 'is-selected' : ''}`}
                onClick={() => resetRecovery('sms')}
                aria-pressed={recoveryMethod === 'sms'}
              >
                Por SMS
              </button>
            </div>

            {isCodeVerified ? (
              <div className="auth-success" role="status">
                Código verificado. En una versión conectada a un servicio real, acá podrías cambiar tu
                contraseña.
              </div>
            ) : (
              <form className="auth-form" onSubmit={handleSubmit}>
                <label className="field">
                  <span>{recoveryMethod === 'email' ? 'Correo de tu cuenta' : 'Número de teléfono'}</span>
                  <input
                    type={recoveryMethod === 'email' ? 'email' : 'tel'}
                    inputMode={recoveryMethod === 'email' ? 'email' : 'tel'}
                    autoComplete={recoveryMethod === 'email' ? 'email' : 'tel'}
                    placeholder={recoveryMethod === 'email' ? 'nombre@gmail.com' : '+54 9 11 1234 5678'}
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    required
                    disabled={Boolean(generatedCode)}
                  />
                </label>

                {generatedCode ? (
                  <>
                    <p className="auth-demo-code">
                      Código de demostración: <strong>{generatedCode}</strong>
                    </p>
                    <label className="field">
                      <span>Código de 8 números</span>
                      <input
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="[0-9]{8}"
                        maxLength={8}
                        placeholder="00000000"
                        value={enteredCode}
                        onChange={(event) => setEnteredCode(event.target.value.replace(/\D/g, ''))}
                        required
                      />
                    </label>
                  </>
                ) : null}

                {error ? <p className="auth-error" role="alert">{error}</p> : null}
                <button className="primary-button auth-submit" type="submit">
                  {generatedCode ? 'Verificar código' : 'Generar código de prueba'}
                </button>
              </form>
            )}

            <p className="auth-switch">
              <Link to="/login">Volver a iniciar sesión</Link>
            </p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} autoComplete={isRegister ? 'on' : 'off'}>
            {!isRegister && state?.registered ? (
              <p className="auth-success" role="status">
                Tu cuenta fue creada. Ahora podés iniciar sesión.
              </p>
            ) : null}

            {isRegister ? (
              <div className="auth-name-fields">
                <label className="field">
                  <span>Nombre</span>
                  <input
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                  />
                </label>
                <label className="field">
                  <span>Apellido</span>
                  <input
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </label>
              </div>
            ) : null}

            <label className="field">
              <span>Gmail</span>
              <input
                type="email"
                autoComplete={isRegister ? 'email' : 'off'}
                placeholder="nombre@gmail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="field">
              <span>Contraseña</span>
              <input
                type="password"
                autoComplete={isRegister ? 'new-password' : 'off'}
                minLength={isRegister ? 8 : undefined}
                placeholder={isRegister ? 'Al menos 8 caracteres' : 'Tu contraseña'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            {!isRegister && (
              <Link className="auth-help-link" to="/recovery">
                ¿Problemas al iniciar?
              </Link>
            )}

            {error ? <p className="auth-error" role="alert">{error}</p> : null}
            <button className="primary-button auth-submit" type="submit">
              {isRegister ? 'Registrarme' : 'Iniciar sesión'}
            </button>

            <p className="auth-switch">
              {isRegister ? (
                <>
                  ¿Ya tenés una cuenta? <Link to="/login">Iniciá sesión</Link>
                </>
              ) : (
                <>
                  ¿No tenés una cuenta? <Link to="/register">Registrate</Link>
                </>
              )}
            </p>
          </form>
        )}
      </section>
    </main>
  );
}
