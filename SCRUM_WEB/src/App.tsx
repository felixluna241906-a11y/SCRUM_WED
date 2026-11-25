import { ToastContainer } from './components/ui/ToastContainer';
import { ToastProvider } from './context/ToastContext';
import { LoginPage } from './pages/LoginPage';

export function App() {
  return (
    <ToastProvider>
      <LoginPage />
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
