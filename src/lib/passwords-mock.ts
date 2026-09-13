// ─── Mock SOLO para el front ────────────────────────────────────────────────
// TODO(practica): borra este archivo y carga las contraseñas desde tu back
// (base de datos + server actions / API routes).
export type PasswordEntry = {
  id: string;
  sitio: string;
  usuario: string;
  correo: string;
  contrasena: string;
  link: string;
  comentario: string;
};

export const mockPasswords: PasswordEntry[] = [
  {
    id: "1",
    sitio: "GitHub",
    usuario: "samael-dev",
    correo: "samael@dev.io",
    contrasena: "Gh$9kL2#mQw8!",
    link: "https://github.com/login",
    comentario: "Cuenta principal de trabajo, con 2FA activado.",
  },
  {
    id: "2",
    sitio: "Gmail",
    usuario: "samael.personal",
    correo: "samael@gmail.com",
    contrasena: "Gm@2024$xY7z!",
    link: "https://mail.google.com",
    comentario: "Correo personal, recuperación de la mayoría de cuentas.",
  },
  {
    id: "3",
    sitio: "Netflix",
    usuario: "familia_perfil",
    correo: "familia@correo.com",
    contrasena: "Nf#Stream88!q",
    link: "https://www.netflix.com/login",
    comentario: "Plan familiar compartido, se renueva cada mes.",
  },
  {
    id: "4",
    sitio: "Banco Nacional",
    usuario: "204510987",
    correo: "samael@dev.io",
    contrasena: "Bn$Clave*4521!",
    link: "https://bancaenlinea.example.com",
    comentario: "Solo banca web, nunca compartir por chat.",
  },
  {
    id: "5",
    sitio: "AWS",
    usuario: "admin-root",
    correo: "infra@dev.io",
    contrasena: "Aw$Cl0ud#99!x",
    link: "https://console.aws.amazon.com",
    comentario: "Consola de producción, acceso restringido.",
  },
  {
    id: "6",
    sitio: "Universidad",
    usuario: "B12345",
    correo: "samael@estudiante.edu",
    contrasena: "Un#Campus77!a",
    link: "https://campus.estudiante.edu",
    comentario: "Portal de notas y matrícula.",
  },
  {
    id: "7",
    sitio: "Spotify",
    usuario: "samael_music",
    correo: "samael@gmail.com",
    contrasena: "Sp$Beats55!m",
    link: "https://accounts.spotify.com/login",
    comentario: "Plan individual, pago con tarjeta terminada en 4242.",
  },
  {
    id: "8",
    sitio: "Wi-Fi Casa",
    usuario: "Casa_5G",
    correo: "—",
    contrasena: "Wf#Casa2024!z",
    link: "",
    comentario: "Router del pasillo, clave pegada detrás del módem.",
  },
];
