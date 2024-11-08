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

export interface respuestaAgregarUnirmeClase{
    message: string;
}


export interface respuestaCrearClase{
    message:string;
    clase:{
        name:string;
        descripcion:string;
        icono: string;
        code :string;
        updated_at: string;
        created_at: string;
        id: number;
    };
    Docente:string;
    Nombre:string;
}

export interface respuestaMisClasesCreadas {
    message: string;
    Clases: DetallesClase[];
}

export interface DetallesClase {
    id: number;
    clase_id: number;
    student_id: number;
    created_at: string;
    updated_at: string;
    clase: InfoClase;
}

export interface InfoClase {
    id: number;
    name: string;
    descripcion: string;
    icono: string;
    code: string;
    created_at: string;
    updated_at: string;
}
