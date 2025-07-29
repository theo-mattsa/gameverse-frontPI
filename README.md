# GameVerse

## Diagrama de classes do domínio do problema

![Diagrama de classes](readme-imgs/image.png)

## Ferramentas escolhidas

- Versionamento de código: Git
- Teste unitários e de integração: Vitest
- Issue tracking: Jira
- CI/CD: Github Actions
- Deploy front-end: Vercel
- Deploy back-end: Railway
- Containers: Docker
- Armazenamento de arquivos: Cloudfare R2

## Frameworks utilizados

- O front-end é um projeto criado com o framework Next.JS
- O back-end é um projeto criado com o framework Nest.JS

## Como gerar a documentação do código

### Front-end

- Ferramenta utlizada: TypeDoc
  Para gerar a documentação do projeto, execute o seguinte comando:

```bash
npx typedoc
```

Isso fará o TypeDoc ler o código Typescript do projeto, interpretar os comentários e os tipos do TS e gerar um arquivo (na pasta docs) contendo a documentação.

### Back-end

- Ferramenta utilizada: Swagger

Com a API rodando em modo desenvolvimento, acesse no seu navegador:

http://localhost:8080/swagger

Assim, você poderá visualizar e testar os endpoints da API através da interface Swagger.

## Como executar o projeto

### Front-end

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (recomenda-se a versão LTS)
- [pnpm](https://pnpm.io/)

Para instalar o pnpm:

```bash
npm install -g pnpm
```

Instale as dependências com `pnpm`:

```bash
pnpm install
```

#### Configuração do ambiente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=localhost:8080
```

> Certifique-se de que sua API backend esteja rodando na porta 8080.

#### Executando o servidor de desenvolvimento

Inicie o servidor com o comando:

```bash
pnpm dev
```

Abra o navegador em [http://localhost:3000](http://localhost:3000) para ver o projeto em execução.

### Back-end

1. **Instale as dependências:**
   ```
   npm i
   ```
2. **Suba o container Docker (banco de dados):**
   ```
   docker-compose up -d
   ```
3. **Execute as migrations do Prisma (gera tipagens e estrutura do banco):**
   ```
   npx prisma migrate dev
   ```
4. **Inicie a API em modo desenvolvimento:**
   ```
   npm run start:dev
   ```

#### Testes End-to-End (E2E)

- **Rodar os testes em modo watch:**

  ```
  npm run test:e2e:watch
  ```

  > Antes de rodar os testes e2e, é obrigatório ter instalado todas as dependências (`npm i`) e executado `npx prisma migrate dev`.

- **Rodar os testes apenas uma vez:**
  ```
  npm run test:e2e
  ```

#### Parar a aplicação

- **Parar o banco de dados Docker (sem excluir dados):**

  ```
  docker-compose stop
  ```

- **Deletar tudo, incluindo dados das tabelas:**
  ```
  docker-compose down -v
  ```

#### Visualização do banco de dados em tempo real

Com a API rodando (`npm run start:dev`), abra um novo terminal no mesmo diretório e execute:

```
npx prisma studio
```

Você poderá visualizar, editar, apagar e criar dados nas tabelas do banco através da interface web do Prisma Studio.

#### Observação importante

- Crie um arquivo `.env` exatamente igual ao `.env.example` para que tudo funcione corretamente.

```bash
  DATABASE_URL=""
  JWT_PRIVATE_KEY=""
  JWT_PUBLIC_KEY=""

  R2_ACCOUNT_ID=""
  R2_BUCKET_NAME=""
  R2_ACCESS_KEY_ID=""
  R2_SECRET_ACCESS_KEY=""
  R2_PUBLIC_URL=""

  CLOUDFLARE_TOKEN=""
```
