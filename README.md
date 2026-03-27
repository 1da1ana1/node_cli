# API de NPS (Net Promoter Score)

API REST para gestão de pesquisas de satisfação, envio de e-mails transacionais e cálculo de métricas de lealdade do cliente.

## Tech Stack & Arquitetura
* **Runtime:** Node.js + TypeScript
* **Framework:** Express
* **ORM:** TypeORM (com Migrations)
* **DB:** SQLite (Desenvolvimento/Testes)
* **Testes:** Jest & Supertest (Testes de Integração)
* **E-mail:** Nodemailer + Handlebars (Templates dinâmicos)

## Instalação e Execução

```bash
# 1) Instalar dependências
npm install

# 2) Configurar variáveis locais
cp .env.example .env

# 3) Executar migrations
npm run migration:run

# 4) Rodar API
npm run dev
```

Servidor disponível em:

- `http://localhost:3000`

## Variáveis de ambiente

Edite o arquivo `.env` com os valores do seu ambiente:

```env
URL_MAIL=http://localhost:3000/answers
```

> `URL_MAIL` é usada no template de e-mail para montar o link de resposta da pesquisa.

## Como ver o e-mail na web (Ethereal)

O projeto usa `nodemailer.createTestAccount()`, então os e-mails **não são enviados para uma caixa real**. Em vez disso, o Nodemailer gera um link de visualização web.

### Passo a passo

1. Inicie a API:

```bash
npm run dev
```

2. Crie um usuário (`POST /users`):

```json
{
  "name": "Usuário Teste",
  "email": "teste@exemplo.com"
}
```

3. Crie uma pesquisa (`POST /surveys`):

```json
{
  "title": "Como foi sua experiência?",
  "description": "De 0 a 10, quanto você recomendaria nosso serviço?"
}
```

4. Envie o e-mail (`POST /sendMail`) usando o `email` do usuário e o `id` da survey:

```json
{
  "email": "teste@exemplo.com",
  "survey_id": "UUID_DA_SURVEY"
}
```

5. Veja o terminal da API. Você verá algo como:

```txt
Message sent: <id-da-mensagem>
Preview URL: https://ethereal.email/message/...
```

6. Abra a `Preview URL` no navegador para visualizar o e-mail renderizado.

### Observações

- O link é de ambiente de teste (Ethereal), ideal para desenvolvimento.
- Se não aparecer `Preview URL`, verifique se a requisição para `/sendMail` retornou sucesso e se a API está rodando sem erros.
- O template usado no e-mail está em `src/views/emails/npsMail.hbs`.

## Testes

```bash
npm test
```

## 📬 Endpoints Principais
* `POST /users` - Cadastro de usuário.
* `POST /surveys` - Criação de pesquisas.
* `POST /sendMail` - Disparo de e-mail (com reutilização do vínculo quando já existir).
* `GET /answers/:value?u={id}` - Captura de nota (0-10).
* `GET /nps/:survey_id` - Retorna o cálculo do NPS.
