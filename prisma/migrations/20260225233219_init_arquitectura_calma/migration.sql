-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "comercial";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "core";

-- CreateTable
CREATE TABLE "comercial"."analisis_tareas" (
    "id" SERIAL NOT NULL,
    "area_id" INTEGER,
    "categoria" VARCHAR(50) NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "subtitulo" VARCHAR(200),
    "estado" VARCHAR(30) DEFAULT 'EN PROCESO',
    "creador_id" INTEGER,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analisis_tareas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comercial"."convenio_archivos" (
    "id" SERIAL NOT NULL,
    "convenio_id" INTEGER,
    "subido_por_id" INTEGER,
    "nombre_archivo" VARCHAR(255) NOT NULL,
    "url_archivo" TEXT NOT NULL,
    "fecha_subida" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "convenio_archivos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comercial"."convenio_comentarios" (
    "id" SERIAL NOT NULL,
    "convenio_id" INTEGER,
    "usuario_id" INTEGER,
    "comentario" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "convenio_comentarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comercial"."convenios" (
    "id" SERIAL NOT NULL,
    "area_id" INTEGER,
    "entidad_nombre" VARCHAR(150) NOT NULL,
    "logo_url" TEXT,
    "ruc" VARCHAR(20),
    "rubro" VARCHAR(100),
    "contacto_nombre" VARCHAR(150),
    "telefono_contacto" VARCHAR(20),
    "estado" VARCHAR(50) DEFAULT 'PENDIENTE',
    "fecha_expiracion" DATE,
    "creador_id" INTEGER,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "convenios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comercial"."estrategia_tareas" (
    "id" SERIAL NOT NULL,
    "area_id" INTEGER,
    "titulo" VARCHAR(255) NOT NULL,
    "descripcion" TEXT,
    "estado" VARCHAR(50) DEFAULT 'PENDIENTE',
    "prioridad" VARCHAR(20),
    "fecha_vencimiento" DATE,
    "creador_id" INTEGER,
    "asignado_a_id" INTEGER,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estrategia_tareas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."areas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(30) NOT NULL,
    "padre_id" INTEGER,
    "es_externa" BOOLEAN DEFAULT false,
    "config_conexion" JSONB,
    "config_visual" JSONB,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."canales" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100),
    "area_id" INTEGER,
    "es_grupo" BOOLEAN DEFAULT true,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "canales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."mensajes" (
    "id" SERIAL NOT NULL,
    "canal_id" INTEGER,
    "emisor_id" INTEGER,
    "contenido" TEXT NOT NULL,
    "archivo_url" TEXT,
    "leido" BOOLEAN DEFAULT false,
    "creado_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensajes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."notificaciones" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "titulo" VARCHAR(150) NOT NULL,
    "mensaje" TEXT,
    "leido" BOOLEAN DEFAULT false,
    "tipo" VARCHAR(50),
    "creado_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."participantes_canal" (
    "canal_id" INTEGER NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "participantes_canal_pkey" PRIMARY KEY ("canal_id","usuario_id")
);

-- CreateTable
CREATE TABLE "core"."permisos_area" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER,
    "area_id" INTEGER,
    "permitir_subareas" BOOLEAN DEFAULT true,
    "puede_publicar" BOOLEAN DEFAULT false,
    "puede_editar" BOOLEAN DEFAULT false,

    CONSTRAINT "permisos_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."proyectos" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "tipo" VARCHAR(50),
    "estado" VARCHAR(50) DEFAULT 'EN EJECUCION',
    "fecha_inicio" DATE,
    "fecha_fin" DATE,
    "area_id" INTEGER,
    "responsable_id" INTEGER,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "proyectos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."publicaciones" (
    "id" SERIAL NOT NULL,
    "area_id" INTEGER,
    "autor_id" INTEGER,
    "titulo" VARCHAR(200) NOT NULL,
    "contenido" TEXT,
    "imagen_url" TEXT,
    "fecha_publicacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "publicaciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."recursos_area" (
    "id" SERIAL NOT NULL,
    "area_id" INTEGER,
    "nombre_recurso" VARCHAR(100) NOT NULL,
    "url_recurso" TEXT NOT NULL,
    "tipo_recurso" VARCHAR(50),
    "icono" VARCHAR(50),

    CONSTRAINT "recursos_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."repositorio_bloques" (
    "id" SERIAL NOT NULL,
    "area_id" INTEGER,
    "titulo" VARCHAR(150) NOT NULL,
    "subtitulo" VARCHAR(150),
    "icono" VARCHAR(50),
    "url_drive_principal" TEXT,
    "creado_por" INTEGER,
    "fecha_creacion" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repositorio_bloques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."repositorio_enlaces" (
    "id" SERIAL NOT NULL,
    "bloque_id" INTEGER,
    "nombre_documento" VARCHAR(255) NOT NULL,
    "url_drive" TEXT NOT NULL,
    "fecha_agregado" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "repositorio_enlaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."roles" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "core"."usuarios" (
    "id" SERIAL NOT NULL,
    "nombre_completo" VARCHAR(30) NOT NULL,
    "apellido_completo" VARCHAR(30) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "telefono" VARCHAR(20),
    "password_hash" TEXT NOT NULL,
    "foto_url" TEXT,
    "puesto" VARCHAR(40),
    "estado" VARCHAR(50),
    "rol_id" INTEGER,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_archivos_convenio" ON "comercial"."convenio_archivos"("convenio_id");

-- CreateIndex
CREATE INDEX "idx_comentarios_convenio" ON "comercial"."convenio_comentarios"("convenio_id");

-- CreateIndex
CREATE INDEX "idx_convenio_area" ON "comercial"."convenios"("area_id");

-- CreateIndex
CREATE INDEX "idx_convenios_estado" ON "comercial"."convenios"("estado");

-- CreateIndex
CREATE INDEX "idx_tareas_estrategia_estado" ON "comercial"."estrategia_tareas"("estado");

-- CreateIndex
CREATE INDEX "idx_areas_padre" ON "core"."areas"("padre_id");

-- CreateIndex
CREATE INDEX "idx_mensaje_canal" ON "core"."mensajes"("canal_id");

-- CreateIndex
CREATE INDEX "idx_mensajes_fecha" ON "core"."mensajes"("creado_at");

-- CreateIndex
CREATE INDEX "idx_notificaciones_usuario" ON "core"."notificaciones"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_permiso_area" ON "core"."permisos_area"("area_id");

-- CreateIndex
CREATE INDEX "idx_permiso_usuario" ON "core"."permisos_area"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "permisos_area_usuario_id_area_id_key" ON "core"."permisos_area"("usuario_id", "area_id");

-- CreateIndex
CREATE INDEX "idx_recursos_area" ON "core"."recursos_area"("area_id");

-- CreateIndex
CREATE INDEX "idx_repositorio_area" ON "core"."repositorio_bloques"("area_id");

-- CreateIndex
CREATE INDEX "idx_enlaces_bloque" ON "core"."repositorio_enlaces"("bloque_id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_nombre_key" ON "core"."roles"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "core"."usuarios"("email");

-- CreateIndex
CREATE INDEX "idx_usuario_email" ON "core"."usuarios"("email");

-- CreateIndex
CREATE INDEX "idx_usuarios_rol" ON "core"."usuarios"("rol_id");

-- AddForeignKey
ALTER TABLE "comercial"."analisis_tareas" ADD CONSTRAINT "analisis_tareas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."analisis_tareas" ADD CONSTRAINT "analisis_tareas_creador_id_fkey" FOREIGN KEY ("creador_id") REFERENCES "core"."usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."convenio_archivos" ADD CONSTRAINT "convenio_archivos_convenio_id_fkey" FOREIGN KEY ("convenio_id") REFERENCES "comercial"."convenios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."convenio_archivos" ADD CONSTRAINT "convenio_archivos_subido_por_id_fkey" FOREIGN KEY ("subido_por_id") REFERENCES "core"."usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."convenio_comentarios" ADD CONSTRAINT "convenio_comentarios_convenio_id_fkey" FOREIGN KEY ("convenio_id") REFERENCES "comercial"."convenios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."convenio_comentarios" ADD CONSTRAINT "convenio_comentarios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "core"."usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."convenios" ADD CONSTRAINT "convenios_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."convenios" ADD CONSTRAINT "convenios_creador_id_fkey" FOREIGN KEY ("creador_id") REFERENCES "core"."usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."estrategia_tareas" ADD CONSTRAINT "estrategia_tareas_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."estrategia_tareas" ADD CONSTRAINT "estrategia_tareas_asignado_a_id_fkey" FOREIGN KEY ("asignado_a_id") REFERENCES "core"."usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "comercial"."estrategia_tareas" ADD CONSTRAINT "estrategia_tareas_creador_id_fkey" FOREIGN KEY ("creador_id") REFERENCES "core"."usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."areas" ADD CONSTRAINT "areas_padre_id_fkey" FOREIGN KEY ("padre_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."canales" ADD CONSTRAINT "canales_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."mensajes" ADD CONSTRAINT "mensajes_canal_id_fkey" FOREIGN KEY ("canal_id") REFERENCES "core"."canales"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."mensajes" ADD CONSTRAINT "mensajes_emisor_id_fkey" FOREIGN KEY ("emisor_id") REFERENCES "core"."usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."notificaciones" ADD CONSTRAINT "notificaciones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "core"."usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."participantes_canal" ADD CONSTRAINT "participantes_canal_canal_id_fkey" FOREIGN KEY ("canal_id") REFERENCES "core"."canales"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."participantes_canal" ADD CONSTRAINT "participantes_canal_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "core"."usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."permisos_area" ADD CONSTRAINT "permisos_area_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."permisos_area" ADD CONSTRAINT "permisos_area_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "core"."usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."proyectos" ADD CONSTRAINT "proyectos_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."proyectos" ADD CONSTRAINT "proyectos_responsable_id_fkey" FOREIGN KEY ("responsable_id") REFERENCES "core"."usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."publicaciones" ADD CONSTRAINT "publicaciones_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."publicaciones" ADD CONSTRAINT "publicaciones_autor_id_fkey" FOREIGN KEY ("autor_id") REFERENCES "core"."usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."recursos_area" ADD CONSTRAINT "recursos_area_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."repositorio_bloques" ADD CONSTRAINT "repositorio_bloques_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "core"."areas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."repositorio_bloques" ADD CONSTRAINT "repositorio_bloques_creado_por_fkey" FOREIGN KEY ("creado_por") REFERENCES "core"."usuarios"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."repositorio_enlaces" ADD CONSTRAINT "repositorio_enlaces_bloque_id_fkey" FOREIGN KEY ("bloque_id") REFERENCES "core"."repositorio_bloques"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "core"."usuarios" ADD CONSTRAINT "usuarios_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "core"."roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
