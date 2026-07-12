// ============================================================
// secciones.ts — Índice centralizado de la revista
// Usado por Nav.astro, índice editorial y navegación entre páginas
// ============================================================

export interface Seccion {
  numero: string;
  titulo: string;
  slug: string;
  href: string;
  pageNum: number;
  descripcion: string;
  categoria: 'apertura' | 'teoria' | 'practica' | 'cierre';
  icono: string;
  density: 'hard' | 'soft';
}

export const secciones: Seccion[] = [
  {
    numero: '00',
    titulo: 'Portada',
    slug: 'portada',
    href: '/',
    pageNum: 0,
    descripcion: 'Presentación de la edición',
    categoria: 'apertura',
    icono: 'cover',
    density: 'hard',
  },
  {
    numero: '01',
    titulo: 'Editorial',
    slug: 'editorial-indice',
    href: '/editorial-indice',
    pageNum: 1,
    descripcion: 'Bienvenida del editor',
    categoria: 'apertura',
    icono: 'edit',
    density: 'soft',
  },
  {
    numero: '02',
    titulo: 'Índice',
    slug: 'indice',
    href: '/editorial-indice#indice',
    pageNum: 2,
    descripcion: 'Mapa de navegación de la edición',
    categoria: 'apertura',
    icono: 'index',
    density: 'soft',
  },
  {
    numero: '03',
    titulo: 'Zona Tech',
    slug: 'zona-tech',
    href: '/zona-tech',
    pageNum: 3,
    descripcion: 'Panorama de tendencias y novedades tecnológicas',
    categoria: 'teoria',
    icono: 'tech',
    density: 'soft',
  },
  {
    numero: '04',
    titulo: 'Fundamentos BDD',
    slug: 'fundamentos-bdd',
    href: '/fundamentos-bdd',
    pageNum: 4,
    descripcion: 'Behavior-Driven Development desde cero',
    categoria: 'teoria',
    icono: 'bdd',
    density: 'soft',
  },
  {
    numero: '05',
    titulo: 'Arquitectura y Modelado',
    slug: 'arquitectura-modelado',
    href: '/arquitectura-modelado',
    pageNum: 5,
    descripcion: 'Principios de diseño y modelado de datos',
    categoria: 'teoria',
    icono: 'arch',
    density: 'soft',
  },
  {
    numero: '06',
    titulo: 'Seguridad',
    slug: 'seguridad',
    href: '/seguridad',
    pageNum: 6,
    descripcion: 'Buenas prácticas de seguridad en bases de datos',
    categoria: 'teoria',
    icono: 'shield',
    density: 'soft',
  },
  {
    numero: '07',
    titulo: 'Caso Práctico: Inicio',
    slug: 'caso-practico-inicio',
    href: '/caso-practico-inicio',
    pageNum: 7,
    descripcion: 'Planteamiento del problema y requisitos',
    categoria: 'practica',
    icono: 'case',
    density: 'soft',
  },
  {
    numero: '08',
    titulo: 'Caso Práctico: Modelado',
    slug: 'caso-practico-modelado',
    href: '/caso-practico-modelado',
    pageNum: 8,
    descripcion: 'Diseño del modelo entidad-relación',
    categoria: 'practica',
    icono: 'model',
    density: 'soft',
  },
  {
    numero: '09',
    titulo: 'Caso Práctico: Normalización',
    slug: 'caso-practico-normalizacion',
    href: '/caso-practico-normalizacion',
    pageNum: 9,
    descripcion: 'De 1NF a 3NF: eliminando redundancias',
    categoria: 'practica',
    icono: 'norm',
    density: 'soft',
  },
  {
    numero: '10',
    titulo: 'Caso Práctico: SQL y Acople',
    slug: 'caso-practico-sql-acople',
    href: '/caso-practico-sql-acople',
    pageNum: 10,
    descripcion: 'Implementación SQL e integración con la app',
    categoria: 'practica',
    icono: 'sql',
    density: 'soft',
  },
  {
    numero: '11',
    titulo: 'Espacimiento Mental',
    slug: 'espacimiento-mental',
    href: '/espacimiento-mental',
    pageNum: 11,
    descripcion: 'Pausa, reflexión y bienestar del desarrollador',
    categoria: 'cierre',
    icono: 'mind',
    density: 'soft',
  },
  {
    numero: '12',
    titulo: 'Contraportada',
    slug: 'contraportada',
    href: '/contraportada',
    pageNum: 12,
    descripcion: 'Créditos, referencias y cierre',
    categoria: 'cierre',
    icono: 'back',
    density: 'hard',
  },
];

export const revista = {
  nombre: 'BDD Revista',
  subtitulo: 'Base de Datos & Desarrollo',
  edicion: 'Edición Nº 1',
  lema: 'Del comportamiento al dato, del dato al modelo.',
  fecha: 'Julio 2026',
  issn: 'ISSN 0000-0000 (online)',
};