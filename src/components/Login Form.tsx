"use client";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const data = { email, password };
        signIn('credentials',
        {
            ...data,
            callbackUrl: '/'

        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
        >
            <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter">Bem-vindo de volta</h1>
                    <p className="text-muted-foreground">Coloque suas credenciais para acessar sua conta.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="seuemail@seuemail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <div className="relative">
                            <Input
                                name="password"
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-6 w-6" />
                                ) : (
                                    <Eye className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2"></div>
                        <a href="#" className="text-sm text-primary-500 hover:text-primary-600">
                            Esqueceu sua senha?
                        </a>
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Entrar
                    </Button>
                </form>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center mb-4">
                        <span className="w-full border-t"></span>
                    </div>
                </div>
                <div className="text-center text-sm mt-6">
                    Não tem uma conta?
                    <a href="#" className="text-primary-500 hover:text-primary-600 font-medium ml-1">Registre-se</a>
                </div>
            </div>
        </motion.div>
    )
}