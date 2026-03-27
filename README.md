# NLW Node - API de NPS

API REST em Node.js + TypeScript para cadastro de usuários e pesquisas, envio de e-mails para avaliação e cálculo de **NPS (Net Promoter Score)**.

## 🚀 Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- SQLite
- Nodemailer + Handlebars
- Jest + Supertest

## 📁 Estrutura do projeto

```bash
src/
  controllers/
  database/
    migrations/
  models/
  repositories/
  services/
  views/
    emails/
  __tests__/
```

## ✅ Pré-requisitos

- Node.js 18+
- npm (ou yarn)

## ⚙️ Instalação

```bash
# 1) Clonar o repositório
git clone <URL_DO_SEU_REPOSITORIO>

# 2) Entrar na pasta
cd nlw_node

# 3) Instalar dependências
npm install
```

## 🔐 Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
URL_MAIL=http://localhost:3000/answers
```

> `URL_MAIL` é usada no template de e-mail para montar o link de resposta da pesquisa.

## 🗄️ Banco de dados e migrations

O projeto usa SQLite com TypeORM.

```bash
# Executar migrations
npm run migration:run

# Reverter última migration
npm run migration:revert

# Criar nova migration
npm run migration:create -- src/database/migrations/NomeDaMigration
```

## ▶️ Executando o projeto

```bash
npm run dev
```

Servidor disponível em:

- `http://localhost:3000`

## 🧪 Testes

```bash
npm test
```

## 📬 Fluxo principal da aplicação

1. Cadastrar usuário.
2. Cadastrar pesquisa.
3. Enviar pesquisa por e-mail (`/sendMail`).
4. Usuário responde via link (`/answers/:value?u=<survey_user_id>`).
5. Consultar NPS da pesquisa (`/nps/:survey_id`).

## 📌 Endpoints

### `POST /users`
Cria um usuário.

**Body**

```json
{
  "name": "User Example",
  "email": "user@example.com"
}
```

**Resposta**
- `201 Created` em caso de sucesso.
- `400` se o usuário já existir ou validação falhar.

---

### `POST /surveys`
Cria uma pesquisa.

**Body**

```json
{
  "title": "Sua experiência foi boa?",
  "description": "De 0 a 10, o quanto você recomendaria nosso serviço?"
}
```

**Resposta**
- `201 Created`

---

### `GET /surveys`
Lista todas as pesquisas.

**Resposta**
- `200 OK`

---

### `POST /sendMail`
Envia e-mail de pesquisa para um usuário.

**Body**

```json
{
  "email": "user@example.com",
  "survey_id": "uuid-da-survey"
}
```

**Resposta**
- `200 OK` com o vínculo `survey_user` criado (ou já existente).
- `400` se usuário ou pesquisa não existirem.

---

### `GET /answers/:value?u=<survey_user_id>`
Registra a nota da resposta da pesquisa.

**Exemplo**

```http
GET /answers/10?u=uuid-do-survey-user
```

**Resposta**
- `200 OK` com o registro atualizado.
- `400` se o token `u` não for enviado.

---

### `GET /nps/:survey_id`
Calcula o NPS de uma pesquisa.

**Resposta (exemplo)**

```json
{
  "detractors": 1,
  "promoters": 4,
  "passives": 2,
  "totalAnswers": 7,
  "nps": 42.86
}
```

## 🧠 Regra de cálculo do NPS

- **Detratores**: notas de 0 a 6
- **Passivos**: notas de 7 a 8
- **Promotores**: notas de 9 a 10

Fórmula:

```text
NPS = ((promoters - detractors) / totalAnswers) * 100
```
---