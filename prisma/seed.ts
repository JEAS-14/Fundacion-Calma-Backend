import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Sembrando la base de datos de Fundación Calma...');

  // 1. Crear Roles
  const rolDirector = await prisma.roles.upsert({
    where: { nombre: 'Director' },
    update: {},
    create: { nombre: 'Director' },
  });
  
  await prisma.roles.upsert({ where: { nombre: 'Analista' }, update: {}, create: { nombre: 'Analista' }});
  await prisma.roles.upsert({ where: { nombre: 'Practicante' }, update: {}, create: { nombre: 'Practicante' }});

  // 2. Crear Área Principal (Padre)
  const areaPadre = await prisma.areas.create({
    // ACORTADO: De 'Estrategia y Desarrollo Comercial' (33) a 'Área Comercial' (14)
    data: { nombre: 'Área Comercial' }, 
  });

  // 3. Crear Sub-áreas
  await prisma.areas.createMany({
    data: [
      { nombre: 'Estrategia', padre_id: areaPadre.id }, // Acortado
      { nombre: 'Análisis de Datos', padre_id: areaPadre.id },
      { nombre: 'Desarrollo', padre_id: areaPadre.id }, // Acortado
    ],
  });

  // 4. Crear Usuario Admin (Deivi)
  const deivi = await prisma.usuarios.upsert({
    where: { email: 'dflores@calma.org' },
    update: {},
    create: {
      nombre_completo: 'Deivi',
      apellido_completo: 'Flores',
      email: 'dflores@calma.org',
      password_hash: '$2b$10$1wz7zVfAlnwR/YFNeg4QM.L/YzqhdWiw/ZcTYEi4ECQmtkOkhgF4e', // Hash de: calma123
      // ACORTADO: De 'Dir. de Estrategia y Desarrollo Comercial' (41) a 'Director Comercial' (18)
      puesto: 'Director Comercial', 
      estado: 'ACTIVO',
      rol_id: rolDirector.id,
    },
  });

  // 5. Darle Permisos Totales a Deivi sobre el Área Padre
  await prisma.permisos_area.create({
    data: {
      usuario_id: deivi.id,
      area_id: areaPadre.id,
      permitir_subareas: true,
      puede_publicar: true,
      puede_editar: true,
    }
  });

  console.log('✅ Base de datos sembrada con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });