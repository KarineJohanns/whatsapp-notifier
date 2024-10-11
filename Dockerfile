# Usar uma imagem oficial do Node.js como base
FROM node:16

# Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Instalar as dependências do sistema necessárias para o Puppeteer
RUN apt-get update && apt-get install -y \
    libnss3 \
    libxss1 \
    libatk-bridge2.0-0 \
    libasound2 \
    fonts-liberation \
    libappindicator3-1 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libgtk-3-0 \
    libpangocairo-1.0-0 \
    libpango-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdrm2 \
    libdbus-1-3 \
    libxcb-dri3-0 \
    libxkbcommon0 \
    libxshmfence1 \
    ca-certificates \
    fonts-ipafont-gothic \
    fonts-wqy-zenhei \
    fonts-thai-tlwg \
    fonts-kacst \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copiar o arquivo package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar as dependências da aplicação (incluindo o Puppeteer)
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Expor a porta que o app estará escutando
EXPOSE 3000

# Comando para rodar a aplicação
CMD [ "npm", "start", "--no-sandbox" ]
