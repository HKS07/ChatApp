import {GoogleLogin} from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { AccountContext } from '../context/AccountProvider';
import { useContext } from 'react';

const WhatsAppWebLogin = () => {

    const {setAccount} = useContext(AccountContext);
    const onLoginError = (res) => {
        console.log('Login Failed', res);
        
    }
    const onLoginSuccess = (res) => {
        const decoded = jwtDecode(res.credential);
        console.log(decoded);
        setAccount(decoded);
        
        
    }
  return (
    <div className="flex justify-center items-center h-screen bg-[#FCF5EB]">
      <div className="bg-white rounded-lg shadow-md p-8 flex items-center max-w-2xl w-full">
        <div className="mr-8">
          <div>
            <h1 className='text-3xl my-4'>Log into ChatApp Web</h1>
            <h2 className='text-xl my-2'>Message privately with friends and family using Chatapp on your browser.</h2>
            <h2 >Sign up/in using gmail id</h2>
          </div>
        </div>
        <div>
          <GoogleLogin
            onSuccess={onLoginSuccess}
            onError={onLoginError}
          />
        </div>
      </div>
    </div>
  );
};

export default WhatsAppWebLogin;