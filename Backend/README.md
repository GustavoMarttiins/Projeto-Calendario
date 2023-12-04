# Projeto de Microserviços com Node.js, Sequelize e Barramento de Eventos

Este projeto consiste em quatro microserviços em JavaScript, cada um desempenhando um papel específico: Lembretes, Observações, Eventos (barramento de eventos) e Base (conexão com o banco de dados).

Instruções para Configuração e Execução
Siga as etapas abaixo para configurar e executar cada microserviço:

## 1. Lembretes
- Navegue até o diretório do microserviço Lembretes: cd lembretes.
- Instale as dependências: npm install axios cors express nodemon.
- Inicie o microserviço: npm start.

## 2. Observações
- Navegue até o diretório do microserviço Observações: cd observacoes.
- Instale as dependências: npm install axios cors express nodemon.
- Inicie o microserviço: npm start.

## 3. Eventos (Barramento de Eventos)
- Navegue até o diretório do microserviço Eventos: cd eventos.
- Instale as dependências: npm install axios cors express nodemon.
- Inicie o microserviço: npm start.

## 4. Base (Conexão com o Banco)
- Navegue até o diretório do microserviço Base: cd base.
- Instale as dependências: npm install express mysql2 sequelize.
- Inicie o microserviço: npm start.
- Nota: Certifique-se de ter um servidor MySQL em execução e atualize as configurações de conexão no arquivo banco.js no microserviço Base conforme necessário.

## Execução Geral
1. Certifique-se de que todos os microserviços estão em execução.
2. Explore e teste os endpoints fornecidos por cada microserviço conforme necessário.

## Tecnologias Utilizadas
- Node.js
- Sequelize (ORM para interação com o banco de dados)
- Barramento de Eventos (para comunicação entre microserviços)

## Estrutura do Projeto
A estrutura do projeto é organizada em diretórios para cada microserviço, facilitando a manutenção e escalabilidade.

Este README fornece uma visão geral do projeto e instruções básicas para começar. Consulte os READMEs específicos de cada microserviço para obter informações detalhadas sobre sua funcionalidade e endpoints.

