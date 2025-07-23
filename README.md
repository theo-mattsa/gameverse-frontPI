# GameVerse


## Diagrama de classes do domínio do problema


## Ferramentas escolhidas para o front-end

- Versionamento de código: Git
- Teste unitários e de integração: Jest
- Issue tracking: Jira
- CI/CD: Github Actions
- Deploy: Vercel

## Frameworks utilizados

Este é um projeto criado com o framework [Next.js](https://nextjs.org), utilizando o gerador oficial

## Como gerar a documentação do código
- Ferramenta utlizada: TypeDoc

Para gerar a documentação do projeto, execute o seguinte comando:

```bash
npx typedoc
```

Isso fará o TypeDoc ler o código Typescript do projeto, interpretar os comentários e os tipos do TS e gerar um arquivo (na pasta docs) contendo a documentação. 

## Como executar o projeto


### Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (recomenda-se a versão LTS)
- [pnpm](https://pnpm.io/)

Para instalar o pnpm:

```bash
npm install -g pnpm
```

### Instalação

Instale as dependências com `pnpm`:

```bash
pnpm install
```

### Configuração do ambiente

Crie um arquivo `.env.local` na raiz do projeto com o seguinte conteúdo:

```env
NEXT_PUBLIC_API_URL=localhost:8080
```

> ⚠️ Certifique-se de que sua API backend esteja rodando na porta 8080.

### Executando o servidor de desenvolvimento

Inicie o servidor com o comando:

```bash
pnpm dev
```

Abra o navegador em [http://localhost:3000](http://localhost:3000) para ver o projeto em execução.

### Como gerar build de produção

Para gerar o build otimizado do projeto, execute:

```bash
pnpm build
```

Esse comando irá:

- Compilar os arquivos TypeScript/JavaScript
- Otimizar as páginas e rotas do Next.js
- Preparar tudo para deploy em produção

### Como rodar a build localmente

Após gerar o build, você pode rodar o projeto em modo produção com:

```bash
pnpm start
```

O servidor será iniciado em: http://localhost:3000

> ⚠️ Certifique-se de que o arquivo `.env.local` está corretamente configurado antes de rodar o build.
