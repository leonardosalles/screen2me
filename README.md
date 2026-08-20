# screen2.me

App simples para compartilhar tela pelo navegador: quem apresenta clica em compartilhar, copia o link `/watch?roomId=...`, e quem recebe o link assiste.

## Rodar local

```bash
npm install
npm run dev
```

Depois abra `http://localhost:3000`.

Para expor na rede local:

```bash
HOST=0.0.0.0 npm run dev
```

## Railway + Postgres

No Railway, crie um Postgres no projeto e exponha `DATABASE_URL` para o app.
O `npm start` roda `prisma db push` automaticamente quando `DATABASE_URL` existe, criando/atualizando as tabelas `users`, `user_events` e `stream_usages`.
A conta usa cookie `HttpOnly` com `SameSite=Lax`; nome, email e senha nao ficam salvos em `localStorage`.
Senhas sao salvas somente como hash `bcrypt` com cost 12, nunca em texto puro.

Use:

```bash
npm start
```

O servidor usa `PORT` da Railway e escuta em `0.0.0.0` por padrao.

## Local com Postgres

```bash
docker compose up postgres
cp .env.example .env
npm run db:push
npm run dev
```

Para subir app + banco em containers:

```bash
docker compose up --build
```

## Como funciona

- Nest entrega os arquivos estáticos, serve `/`, `/watch` e `/account`, e mantém salas temporárias via WebSocket.
- O navegador usa `getDisplayMedia` para capturar a tela.
- WebRTC envia o vídeo direto do apresentador para cada pessoa assistindo.
- O servidor não grava tela e não retransmite vídeo; ele só troca mensagens de conexão.
- Auth fica em `/api/auth/register`, `/api/auth/login`, `/api/auth/logout` e `/api/auth/me`.
- Usuarios anonimos podem transmitir ou assistir por ate 15 minutos cumulativos por sessao anonima.
- Reload nao reseta o limite quando `DATABASE_URL` esta configurada: o saldo e calculado por `session_id` em `stream_usages`.

## Próximos passos bons

- Colocar em um servidor HTTPS público para o link funcionar fora da sua rede.
- Adicionar TURN server para redes restritas onde WebRTC direto falha.
- Empacotar como app Windows com Tauri ou Electron se você quiser abrir pela bandeja/atalho.
