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

export interface InfoClase{
    id: number;
    name: string;
    descripcion: string;
    icono: string;
    code: string;
    docente?: string;
    created_at?: string;
    updated_at?: string;
}

export interface respuestaCreacionAsignacion {
    message: string;
    Asignacion: MiAsignacionCreada;
}

export interface MiAsignacionCreada {
    id: number;
    name: string;
    descripcion: string;
    date: string;
    time: string;
    created_at: string;
    updated_at: string;
}

////////////////////////////////////////

export interface RespuestaAsignacionClase {
    message: string;
    Clases: ClaseAsignacion[];
}

export interface ClaseAsignacion {
    id: number;
    clase_id: number;
    asignacione_id: number;
    created_at: string;
    updated_at: string;
    asignacione: Asignacion;
}

export interface Asignacion {
    id: number;
    name: string;
    descripcion: string;
    date: string;
    time?: string;
    created_at?: string;
    updated_at?: string;
}

export interface RespuestaActividadEntregada{
    message:string;
    entregaInfo:ArchivoInfo;
}

export interface ArchivoInfo{
    id:number;
    archivo:string;
    created_at:string;
}

export interface RespuestaObtenerDocente{
    message:string;
    Docente:nombreDocente[];
}

export interface nombreDocente{
    name:string;
}

export interface RespuestaTodasMisAsignaciones{
    message: string;
    Clases: ClaseMisAsignaciones[];
}

export interface ClaseMisAsignaciones {
    Asignacion_id: number;
    Nombre: string;
    Descripción: string;
    Fecha: string;
    Clase: ClaseMiAsignacion[];
}

export interface ClaseMiAsignacion {
    id_clase: number;
    Name: string;
    Descripcion: string;
    Code: string;
}

///////////////////////////////////////

export interface RespuestaAsignacionesEntregadasDeMiClaseCreada {
    student: InfoEstudianteEntrega;
    archivo: string;
}

export interface InfoEstudianteEntrega{
    id: number;
    name: string;
    email: string;
}

//////////////////////////////////////////
export interface RespuestaVerChatCompleto {
    id: number;
    chat: string;
    student_id: number;
    created_at: string;
    updated_at: string;
    student: InfoEstudianteEntrega;
}

export interface RespuestaMiPerfil{
    id: number;
    name: string;
    email:string;
    password: string;
    created_at: string;
    updated_at: string;
}
