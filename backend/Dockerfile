FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm install

COPY prisma ./prisma

RUN pnpm exec prisma generate

COPY . .

EXPOSE 8000

CMD ["pnpm", "run", "start:dev"]