FROM python:3.13-slim

ENV GCLOUD_CONVERSATION_BUCKET $GCLOUD_CONVERSATION_BUCKET
ENV MONGO_CONNECTION_STRING $MONGO_CONNECTION_STRING
ENV PROD_API_URL $PROD_API_URL
ENV PROD_CLIENT_URL $PROD_CLIENT_URL
ENV VITE_PROD_API_URL $VITE_PROD_API_URL
ENV VITE_PROD_CLIENT_URL $VITE_PROD_CLIENT_URL
ENV NODE_ENV $NODE_ENV
ENV PORT $PORT
ENV VITE_DEBUG $VITE_DEBUG

WORKDIR /app

RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    supervisor \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . .

WORKDIR /app/py-example
RUN pip install uv
RUN uv install

WORKDIR /app/shared
RUN npm install -g npm@11.3.0
RUN npm install -g typesync
RUN npm install -g typescript
RUN npm install -g patch-package ts-patch tsx
RUN npm install
RUN npm run build

WORKDIR /app/react-web
RUN npm install -g ../shared
RUN npm install
RUN npm run build

WORKDIR /app/express
RUN npm install
RUN npm install mongodb
RUN npm run build

WORKDIR /app
RUN <<EOF
cat > /etc/supervisor/conf.d/supervisord.conf << HERE
[supervisord]
nodaemon=true

[program:backend]
directory=/app/express
command=tsx ./bin/www.ts

[program:llmbackend]
command=python /app/py-example/main.py

[program:frontend]
command=npx serve -s /app/react-web/dist -l tcp://0.0.0.0:5000
HERE
EOF

EXPOSE 5000 5555 8080

CMD ["/usr/bin/supervisord"]