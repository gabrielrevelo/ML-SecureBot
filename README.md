# ML-SecureBot 🐧🛡️

Bot de WhatsApp conectado con inteligencia artificial utilizando los modelos de OpenAI. Además de mantener conversaciones inteligentes, el bot cuenta con módulos específicos que se pueden acceder a través de comandos.

Este proyecto ha sido desarrollado para la hackathon de creación de producto mínimo viable, organizada por **ConeXSurTIC**, como parte de la propuesta para la empresa **MundoLinux**.

### Sobre MundoLinux

**MundoLinux** es una empresa dedicada a la seguridad de la información, enfocada en brindar soluciones de ciberseguridad que protejan tanto a empresas como a usuarios finales. A través de capacitación, servicios de monitoreo y consultoría en seguridad, MundoLinux ayuda a sus clientes a mantenerse protegidos en un entorno digital cada vez más complejo y amenazante.

## Pasos de Instalación

### 1. Clonar el repositorio

Primero, clona el repositorio del proyecto en tu máquina local. Ejecuta los siguientes comandos en tu terminal:

```bash
git clone https://github.com/gabrielrevelo/ML-SecureBot.git
cd ML-SecureBot
```

### 2. Instalar Node.js v20.10.0

El proyecto requiere la versión específica de Node.js v20.10.0. Para gestionar diferentes versiones de Node en tu máquina, te recomendamos usar nvm (Node Version Manager), que te permite cambiar fácilmente entre versiones de Node sin conflictos.

#### ¿Por qué usar nvm?

Facilita el manejo de múltiples versiones de Node.
Evita problemas de compatibilidad con otros proyectos que utilicen versiones diferentes de Node.js.
Simplifica el proceso de actualización o cambio de versiones de Node.js.
Instalación de nvm:
Si no tienes nvm instalado, puedes instalarlo siguiendo las instrucciones oficiales:

- Linux: [nvm](https://github.com/nvm-sh/nvm)

- Windows: [nvm-windows](https://github.com/coreybutler/nvm-windows)

Una vez que nvm esté instalado, ejecuta el siguiente comando para instalar la versión v20.10.0 de Node.js:

```bash
nvm install 20.10.0
nvm use 20.10.0
```

Verifica que la versión correcta de Node esté activa:

```bash
node -v
```

Debería mostrar: v20.10.0.

### 3. Instalar las dependencias del proyecto

Dentro de la carpeta raíz del proyecto, ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

> ⚠️ **Nota:** En **Windows**, es necesario instalar `sharp` utilizando WebAssembly para evitar problemas de compatibilidad. Ejecuta:
>
> ```bash
> npm install --cpu=wasm32 sharp
> ```

### 4. Configuración de variables de entorno

Configura las variables de entorno necesarias para que el bot funcione correctamente. Estas deben ir en un archivo .env en la raiz del proyecto.

### 5. Ejecutar el proyecto

Usa el siguiente comando para ejecutar el proyecto:

```bash
npm start
```

Este comando ejecuta el bot y queda listo para procesar solicitudes.

#### 👨‍💻 Ejecutar en modo de desarrollo

Durante el desarrollo, es mejor usar:

```bash
npm run dev
```

Esto ejecuta eslint para revisar el código y utiliza nodemon para reiniciar automáticamente la aplicación cada vez que realices cambios, lo que facilita el desarrollo continuo.

### 7. Conectarse al bot

Una vez que hayas iniciado el proyecto con el comando:

```bash
npm start
```

La consola mostrará el siguiente mensaje:

```bash
⚡⚡ ACTION REQUIRED ⚡⚡
You must scan the QR Code
Remember that the QR code updates every minute
```

Cuando aparezca este mensaje, es hora de abrir tu navegador e ir a la ruta:

http://localhost:3000/

> ⚠️ **Nota**: El puerto sera el que pongas en el archivo .env

En esta página aparecerá un código QR, similar al que ves en WhatsApp Web. Debes escanear este código con la app de WhatsApp desde tu teléfono.

> ⚠️ **Nota**: El código QR se actualiza cada minuto. Si te tardas mucho en escanearlo, es necesario recargar la página en el navegador para que aparezca un nuevo código QR.

8. Verificar la conexión
   Después de escanear el código QR exitosamente, la consola mostrará el siguiente mensaje:

```bash
✅ Connected Provider
Tell a contact on your WhatsApp to write "hello"...
```

Esto significa que el bot ya está en funcionamiento. Puedes probarlo enviando cualquier mensaje por WhatsApp a la cuenta conectada, y el bot responderá automáticamente.
