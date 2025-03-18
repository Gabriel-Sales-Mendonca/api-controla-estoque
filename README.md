# 📦 API Controla Estoque
# Sobre o projeto

[https://controlaestoque.netlify.app/](https://controlaestoque.netlify.app/)

Acesse também o repositório do front-end desse projeto em: https://github.com/Gabriel-Sales-Mendonca/controlaestoque

É uma API feita com **Node JS**, que possui:
- Sistema de login com **JWT**
- **Criptografia de SENHA** com o pacote **bcryptjs**
- **CRUD** com validação dos dados
- Configuração de política **CORS**
- Configuração do banco de dados MongoDB através do pacote **mongoose**

Permite um usuário controlar um estoque, gerenciando **PRODUTOS**, **CATEGORIAS DE PRODUTOS** e a quantidade no **ESTOQUE**.

# 🚀 Tecnologias utilizadas
## Backend
- Node.js / JavaScript
- Express.js
- JWT / jsonwebtoken
- Criptografia de SENHA / bcryptjs
- MongoDB / mongoose
- dotenv / .ENV

# 🔧 Funcionalidades

- Cadastro de produtos
- Listagem de produtos
- Atualização de informações dos produtos
- Remoção de produtos
- Registro de entrada e saída de estoque
- Validação de dados

# Implantação em produção
- Backend: Vercel
- Banco de dados: MongoDB Atlas

# Como executar o projeto

```bash
# clonar repositório
git clone https://github.com/Gabriel-Sales-Mendonca/api-controla-estoque.git

# entrar na pasta raiz do projeto

# instalar dependências
npm install

# configurar o arquivo .env
CONNECTIONSTRING= sua connection string vem aqui
PRIVATEKEY= sua private key vem aqui

# executar o projeto
npm run dev

```
