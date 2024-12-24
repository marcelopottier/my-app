export interface User {
  id: string;       // UUID gerado automaticamente
  email: string;    // E-mail do usuário
  password: string; // Senha
  username: string; // Nome de usuário
  isAdmin: boolean; // Indica se o usuário é administrador
  isActive: boolean; // Indica se o usuário está ativo
  createdAt: string; // Data de criação (ISO string)
}
