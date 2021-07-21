## Requisitos:

É necessário ter o NodeJS instalado, você pode baixá-lo aqui [NodeJS](https://nodejs.org/en/).

É necessário ter o Docker instalado, você pode baixá-lo aqui [Docker](https://hub.docker.com/).

## Rodando o projeto: 

Para rodar o banco de dados basta executar o seguinte comando no terminal:

- docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5433:5432 -d postgres

Para rodar o projeto basta entrar na pasta raíz e executar os seguintes comandos no terminal: 

 - npm install

Após subir o banco de dados e instalar as dependências deve-se entrar na pasta raíz do projeto e executar o seguinte comando para criar as tabelas do banco de dados.

 - npm run typeorm migration:run 

Após as tabelas estarem criadas deve-se executar o seguinte comando para rodar o projeto:

 - npm start

## Tests:

Esse projeto possui testes unitários, para rodá-los deve-se executar os seguintes comandos no terminal: 

 - npm test

Após o comando ter sido executado será gerada uma pasta de Coverage que possuirá informações sobre a cobertura dos testes.

O projeto também possui lint configurado, deve-se executar o comando abaixo para rodar: 

- npm run lint