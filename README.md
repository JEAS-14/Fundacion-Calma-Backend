# 🏛️ Fundación Calma - Backend Comercial

Este es el núcleo del sistema de la Fundación Calma, desarrollado con una arquitectura escalable para gestionar inicialmente el área Comercial, con capacidad de expandirse a las áreas Clínica y Educativa.

## 🚀 Tecnologías Principales
* **Framework:** [NestJS](https://nestjs.com/) (Node.js v20)
* **Base de Datos:** [PostgreSQL 15](https://www.postgresql.org/) (Elegido por su flexibilidad con JSONB)
* **ORM:** [Prisma v6](https://www.prisma.io/) (Manejo de base de datos con TypeSafe)
* **Contenedores:** [Docker](https://www.docker.com/) (Para asegurar que el entorno sea idéntico para los 3 devs)

---

## 🛠️ Configuración del Entorno (Para nuevos devs)

Si acabas de clonar el repositorio, sigue estos pasos en orden:

1.  **Instalar dependencias:**
    ```bash
    npm install
    ```

2.  **Configurar variables de entorno:**
    * Copia el archivo `.env.example` y cámbiale el nombre a `.env`.
    * Asegúrate de que la `DATABASE_URL` coincida con tus credenciales de Docker.

3.  **Levantar la infraestructura (Docker):**
    * Abre Docker Desktop y espera a que esté en verde.
    * Ejecuta:
    ```bash
    docker-compose up -d
    ```

4.  **Sincronizar la Base de Datos (Prisma):**
    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

---

## ⚡ Comandos de Uso Diario

### 🐳 Docker (Infraestructura)
* `docker-compose up -d` -> Enciende la base de datos en segundo plano.
* `docker-compose stop` -> Apaga la base de datos sin borrar los datos.
* `docker-compose down` -> Elimina los contenedores (usa con cuidado).

### ◭ Prisma (Base de Datos)
* `npx prisma migrate dev --name descripcion_del_cambio` -> Aplica cambios que hagas en el `schema.prisma`.
* `npx prisma generate` -> Actualiza el cliente para tener autocompletado en el código.
* `npx prisma studio` -> **Panel visual** para ver/editar datos en `localhost:5555`.

### 💻 NestJS (Desarrollo)
* `npm run start:dev` -> Arranca el servidor con recarga automática.


### Dependencias Clave del Proyecto (Referencia)
* Si estás construyendo desde cero o necesitas reinstalar los módulos centrales de seguridad y tiempo real, estos son los comandos exactos que utilizamos en la arquitectura:

### Autenticación y Seguridad (Login, JWT, Passwords):

Bash

npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt
Comunicaciones y Chat (WebSockets):

Bash

npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
---


#### Subir data por seed.ts
npx prisma db seed


## 📂 Estructura del Proyecto
* `/src`: Código fuente de la lógica de negocio (NestJS).
* `/prisma`: Esquemas y migraciones de la base de datos.
* `docker-compose.yml`: Configuración de los servicios (DB, API).
* `.env`: Credenciales sensibles (NUNCA subir a GitHub).

---

## 🤝 Reglas del Equipo de 3
1.  **Nunca subir el `.env`**: El archivo está en el `.gitignore` por seguridad.
2.  **Migraciones**: Si cambias una tabla, ejecuta `migrate dev` y sube la carpeta `prisma/migrations` resultante para que tus compañeros se actualicen.
3.  **Versiones**: Mantener siempre Node v20 y Prisma v6 para evitar conflictos de compatibilidad.