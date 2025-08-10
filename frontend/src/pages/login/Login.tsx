import React, { useEffect } from 'react'
import { LoginForm } from "@/pages/login/components/LoginForm"
import { useNavigate } from 'react-router';
import { doesSessionExist } from '@/lib/utils';
interface Props { }

function SignUp(props: Props) {
    const { } = props
    const navigate = useNavigate();
    useEffect(() => {
        async function check() {
            const hasSession = await doesSessionExist();
            if (hasSession) {
                navigate('/dashboard')
            }
        }
        check();
    }, []);
    return (
        <div className='flex justify-center items-center w-full h-[100vh]'>
            <LoginForm className='w-1/4' />
        </div>
    )
}

export default SignUp;
