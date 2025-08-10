import React, { useEffect } from 'react'
import { SignUpForm } from "@/pages/signup/components/SignUpForm"
import { doesSessionExist } from '@/lib/utils';
import { useNavigate } from 'react-router';
interface Props { }

function SignUp(props: Props) {
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
    const { } = props

    return (
        <div className='flex justify-center items-center w-full h-[100vh]'>
            <SignUpForm className='w-1/4' />
        </div>
    )
}

export default SignUp;
