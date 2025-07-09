# Usa la imagen oficial de Nginx
FROM nginx:alpine

# Elimina la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu archivo de configuración personalizado
COPY nginx.conf /etc/nginx/conf.d

# Copia la carpeta dist del build de Vue al directorio público de Nginx
COPY dist/ /usr/share/nginx/html

# Expone el puerto por defecto de Nginx
EXPOSE 80

# Inicia Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]