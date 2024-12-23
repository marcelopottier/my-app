"use client";
import { useSession, signIn } from "next-auth/react";
import React, { useEffect } from "react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        signIn(); // Redireciona para a página de login
      }
    }, [status]);

    if (status === "loading") {
      return <p>Carregando...</p>; // Renderiza algo enquanto carrega
    }

    if (session) {
      // Se o usuário estiver autenticado, renderiza o componente protegido
      return <WrappedComponent {...props} />;
    }

    return null; // Não renderiza nada enquanto redireciona
  };
};

export default withAuth;
