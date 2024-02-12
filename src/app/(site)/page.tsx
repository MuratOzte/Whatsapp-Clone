import AuthForm from '@/components/auth/AuthForm';
import Background from '@/components/auth/Background';
export default function Home() {
    return (
        <div className="h-full w-full">
            <Background />
            <AuthForm />
        </div>
    );
}
