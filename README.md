
# API de NPS (Net Promoter Score)

API REST para gestão de pesquisas de satisfação, envio de e-mails transacionais e cálculo de métricas de lealdade do cliente.

## 🛠️ Tech Stack & Arquitetura
* **Runtime:** Node.js + TypeScript
* **Framework:** Express
* **ORM:** TypeORM (com Migrations)
* **DB:** SQLite (Desenvolvimento/Testes)
* **Testes:** Jest & Supertest (Testes de Integração)
* **E-mail:** Nodemailer + Handlebars (Templates dinâmicos)

## 🎯 Diferenciais Técnicos (O que importa)
* **Clean Code:** Separação clara entre Controllers, Repositories e Services.
* **Integridade:** Testes de integração cobrindo os fluxos de cadastro, envio de e-mail e cálculo do NPS.
* **UX Transacional:** Integração com Ethereal Mail para preview de e-mails em ambiente de dev.
* **Validations:** Tratamento de erros customizados e validação de duplicidade.

## ⚙️ Instalação e Execução

```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco (Migrations)
npm run migration:run

# 3. Rodar API
npm run dev
```

## 🧪 Testes
```bash
# Executa a suíte de testes de integração
npm test
```

## 📬 Endpoints Principais
* `POST /users` - Cadastro de usuário.
* `POST /surveys` - Criação de pesquisas.
* `POST /sendMail` - Disparo de e-mail (Verifica se já foi enviado antes).
* `GET /answers/:value?u={id}` - Captura de nota (0-10).
* `GET /nps/:survey_id` - Retorna o cálculo real do NPS.
