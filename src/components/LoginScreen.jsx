import {GoogleLogin} from '@react-oauth/google';
import {useNavigate} from "react-router-dom";
import { useAuth } from "./Auth";

function LoginScreen() {
    const navigate = useNavigate()
    const {login} = useAuth();

    return (
        <div className={"flex items-center justify-center h-screen"}>
            <GoogleLogin
                onSuccess={credentialResponse => {
                    console.log(credentialResponse);

                    login(credentialResponse);

                    navigate("/chat");
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                // useOneTap
            />
        </div>
    )
}

export default LoginScreen