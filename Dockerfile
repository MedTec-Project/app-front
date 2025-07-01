# Etapa 1: Construção da aplicação
FROM node:18 AS build

# Defina o diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto para dentro do contêiner
COPY . .

# Instalar dependências
RUN npm install

# Construir a aplicação (gerar os arquivos estáticos)
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine

# Copiar os arquivos da construção para o diretório padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expôr a porta 80 (onde o Nginx irá servir os arquivos)
EXPOSE 80

# Iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]