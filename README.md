# Proyecto Final de Laboratorio de Bases de Datos II

Esta es una aplicación web desarrollada como proyecto final para el curso de *Bases de Datos II*. La aplicación incluye un temporizador estilo Pomodoro junto con un sistema de gestión de tareas. Está dividida en dos partes principales:

- **Backend:** Desarrollado en Python utilizando FastAPI.
- **Frontend:** Construido con React.

---

## Características Principales

| Funcionalidad | Descripción |
|---------------|-------------|
| ⏱️ Temporizador Pomodoro configurable | Trabajo (25 min), descansos cortos (5 min) y largos (15 min) |
| ✅ Gestión de tareas | Creación, edición y eliminación de tareas |
| 🔔 Notificaciones sonoras | Al finalizar cada sesión del temporizador |
| 💾 Guardado automático | Preferencias del usuario guardadas automáticamente |

---

## Requisitos Previos

Para ejecutar esta aplicación localmente, necesitarás tener instalado lo siguiente:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Python](https://www.python.org/)
- [MongoDB](https://www.mongodb.com/) (debe estar instalado y en ejecución)

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Caalgato98Student/pomodoro_app
```

---

### 2. Configurar el backend

```bash
# Navegar al directorio del backend
cd backend

# Crear un entorno virtual
python -m venv env

# Activar el entorno virtual
# En Windows:
env\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt
```

#### Configuración de MongoDB

Crea el archivo `.env` con la conexión a tu base de datos:

- Si usas **MongoDB Atlas**:

```bash
echo "MONGODB_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_base_de_datos>" > .env
```

- Si usas **MongoDB Local**:

```bash
echo "MONGODB_URL=mongodb://localhost:27017/<nombre_base_de_datos>" > .env
```

---

### 3. Configurar el frontend

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias
npm install
```

---

## Ejecución de la Aplicación

### 1. Iniciar MongoDB

Asegúrate de que MongoDB esté corriendo en tu máquina.

---

### 2. Iniciar el backend

```bash
# Dentro del directorio 'backend', con el entorno virtual activado
uvicorn main:app --reload
```

---

### 3. Iniciar el frontend

```bash
# Dentro del directorio 'frontend'
npm start
```

---

## Uso de la Aplicación

### Temporizador Pomodoro

- **Pomodoro (trabajo):** Períodos de concentración intensa (25 minutos por defecto)
- **Short break:** Descansos cortos entre sesiones (5 minutos por defecto)
- **Long break:** Descansos largos tras varios pomodoros (15 minutos por defecto)
- Usa los botones para iniciar, pausar o reiniciar el temporizador
- Personaliza los tiempos desde el icono de engranaje

---

### Gestión de Tareas

- Crea nuevas tareas con título y descripción
- Edita las tareas existentes
- Elimina las tareas que ya no necesites
- Visualiza todas tus tareas pendientes en tiempo real

---

## Solución de Problemas Comunes

### El backend no se conecta a la base de datos

- Verifica que MongoDB esté en ejecución.
- Asegúrate de que la URL en el archivo `.env` sea correcta.

---

### El frontend no se conecta al backend

- Confirma que el backend esté corriendo.
- Verifica que no haya problemas de CORS (ya está configurado).
- Revisa si algún firewall está bloqueando conexiones locales.
