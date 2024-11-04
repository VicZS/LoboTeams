export interface LoginResponse {
    message: string;
    user: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
    };
    token: string;
}

export interface UsuarioActividad{
    id: number;
    idOnwer:number;
    entregado: boolean;
    linkActividadCompletada: string;
}

export interface Actividad{
    id: number;
    idOnwer:number;
    title: string;
    indicaciones: string;
    fecha: string;
    usuariosAsignados:UsuarioActividad[];
}
