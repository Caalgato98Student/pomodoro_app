Proyecto final de laboratorio de bases de datos II

Esta es una web desarrollada para el proyecto final del curso de bases de datos II, que implementa un temporizador estilo Pomodoro y una gestión de tareas. La aplicación está dividida en dos partes: un backend desarrollado en Python con FastAPI y un frontend desarrollado en React.

Características
⏱️ Timer Pomodoro configurable (trabajo, descansos cortos y largos)
✅ Gestión de tareas con creación, edición y eliminación
🔔 Sonido cuando finaliza un temporizador
💾 Guardado automático de preferencias de usuario
Requisitos previos
Para ejecutar esta aplicación necesitarás:

Git
Node.js
Python
MongoDB (instalado y en ejecución)

Instalación
1. Clonar el repositorio
git clone https://github.com/Caalgato98Student/matcha-pomodoro.git
cd matcha-pomodoro

1. Configurar el backend
# Navegar al directorio del backend
cd backend

# Crear un entorno virtual
python -m venv env

# Activar el entorno virtual
# En Windows:
env\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Crear archivo .env con la configuración (si no existe)

# En caso de usar MongoDB Atlas, reemplaza <usuario>, <contraseña>, <cluster> y <nombre_base_de_datos> con tus datos reales
echo "MONGODB_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombre_base_de_datos>" > .env

# Si usas MongoDB local, usa la siguiente línea en su lugar
echo "MONGODB_URL=mongodb://localhost:27017/<nombre_base_de_datos>" > .env

1. Configurar el frontend
# Navegar al directorio del frontend
cd ../frontend

# Instalar dependencias
npm install

Ejecución de la aplicación
1. Iniciar MongoDB
Asegúrate de que MongoDB esté en ejecución en tu sistema.

1. **Iniciar el backend**
```bash
# En el directorio 'backend' con el entorno virtual activado
uvicorn main:app --reload
```

1. **Iniciar el frontend**
```bash
# En el directorio 'frontend'
npm start
```

## Uso de la aplicación

### Timer Pomodoro
- **Pomodoro (trabajo)**: Periodos de concentración intensa (25 min por defecto)
- **Short break**: Descansos cortos entre pomodoros (5 min por defecto)
- **Long break**: Descansos largos después de varios pomodoros (15 min por defecto)
- Usa los botones de control para iniciar, pausar y reiniciar el temporizador
- Configuración personalizable haciendo clic en el ícono de engranaje

### Gestión de tareas
- Agrega nuevas tareas con título y descripción
- Edita tareas existentes
- Elimina tareas cuando ya no las necesites
- Visualiza tu lista completa de tareas pendientes

## Solución de problemas comunes

### El backend no se conecta a la base de datos
- Verifica que MongoDB esté en ejecución
- Comprueba que la URL de MongoDB en el archivo .env sea correcta
- Asegúrate de tener permisos para acceder al directorio de datos de MongoDB

### El frontend no se conecta al backend
- Verifica que el backend esté en ejecución (http://localhost:8000)
- Comprueba que no hay restricciones CORS (ya configurado en el código)
- Asegúrate de que no haya un firewall bloqueando las conexiones