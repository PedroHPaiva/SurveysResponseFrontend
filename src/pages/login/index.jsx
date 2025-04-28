// eslint-disable-next-line react/prop-types
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

//CSS
import './styles.css';

//Primereact
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

//Context
import { AuthContext } from '../../context/auth';

//Assets
import LoginImage from '../../assets/loginImage.jpg';

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);

  const signInAuth = async (email, password) => {
    try {
      setLoading(true);
      await signIn(email, password);

      setLoading(false);
      return navigate(`/dashboard`);
    } catch (err) {
      setError(
        err.response.data.error
          ? err.response.data.error
          : 'Ocorreu um erro inesperado'
      );
      setLoading(false);
    }
  };

  function changeEmail(email) {
    if (Error) setError(null);
    setEmail(email);
  }

  function changeValue(value) {
    if (Error) setError(null);
    setValue(value);
  }

  return (
    <>
      <div className="login flex justify-content-between align-items-center w-full h-screen bg-white">
        {window.innerWidth > 768 ? (
          <>
            <div className="h-screen flex-1 overflow-hidden">
              <img
                className="bg-cover bg-center h-screen w-full"
                src={LoginImage}
                alt={'imagem para o login'}
              />
            </div>
          </>
        ) : null}

        <div
          className={`h-screen ${window.innerWidth > 768 ? 'w-6' : 'w-full'} overflow-hidden`}
        >
          <div
            className={`container relative h-full flex justify-content-center aling-items-center gap-2 flex-column ${window.innerWidth > 768 ? 'w-24rem' : 'w-full p-4'}  mx-auto`}
          >
            <div className="mx-auto mb-4 centeredUp">
              <h1 className="text-6xl text-center">Ilumeo</h1>
            </div>

            <div className="flex justify-content-center aling-items-center flex-column">
              <InputText
                placeholder="Email"
                value={email}
                onChange={(e) => changeEmail(e.target.value)}
                invalid={Error ? true : false}
                className="mb-4"
              />
              <Password
                placeholder="Senha"
                value={value}
                onChange={(e) => changeValue(e.target.value)}
                toggleMask
                feedback={false}
                invalid={Error ? true : false}
                aria-describedby="username-help"
                className={Error ? 'mb=0' : 'mb-4'}
              />
              {Error ? (
                <small id="username-help" className="text-red-500 mb-4">
                  {Error}
                </small>
              ) : null}

              <Button
                className="buttonLogin mb-4"
                disabled={value === '' ? true : false}
                onClick={() => signInAuth(email, value)}
              >
                {loading ? (
                  <ProgressSpinner className="w-1rem h-1rem text-color" />
                ) : (
                  'Entrar'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
