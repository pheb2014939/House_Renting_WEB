'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues,
    SubmitHandler,
    useForm
 } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import LoginModal from './LoginModal';
import useLoginModal from '@/app/hooks/useLoginModal';


const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const{
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('api/register',data)
            .then(() => {
                toast.success('Success!')
                registerModal.onClose();
                loginModal.onOpen();

            })
            .catch((error) => {
            toast.error('Something went wrong!');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
         loginModal.onOpen();
  }, [registerModal, loginModal]);

    const bodyContent =(
        <div className='flex flex-col gap-4'>
            <Heading
            title="Welcome to Airbnbi"
            subtitle="Create an account!"
            />
            <Input 
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
             <Input 
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
             <Input 
            id="password"
            type="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                icon={FcGoogle}
                outline
                label="Continue with Google"
                onClick={() => signIn('google')}

            />
             <Button
                icon={AiFillGithub}
                outline
                label="Continue with Github"
                onClick={() => signIn('github')}

            />
            <div
            className="
            text-neutral-500
            text-center
            mt-4
            font-light
            "
            >
                <div className="justify-center flex flex-row items-center gap-2">
                <div>
                    Already have an account?
                </div>                
                <div
                onClick={toggle}
                className="
                text-neutral-800
                cursor-pointer
                hover:underline
                "
                >
                    Login
                </div>
                </div>
            </div>

        </div>
    )

    return ( 
        <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
     );
}
 
export default RegisterModal;