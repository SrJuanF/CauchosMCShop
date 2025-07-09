# Usa una imagen oficial de Node como base
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Actualiza repositorios e instala netcat
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de tu aplicación
COPY . .

# Da permisos de ejecución a los scripts
RUN chmod +x ./wait-for-it.sh ./start.sh

EXPOSE 3000

# Usa el script personalizado para iniciar
CMD ["./start.sh"]

# Expone el puerto en el que corre tu app (ajusta según tu app)
#EXPOSE 3000

# Comando para iniciar el backend con nodemon (npm run dev)
#CMD ["npm", "run", "dev"]

