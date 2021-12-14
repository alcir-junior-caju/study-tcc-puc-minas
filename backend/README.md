<!-- Info Header -->
<table>
  <tr>
    <td>
      <img alt="Caju" src="https://www.cajucomunica.com.br/logo-caju.png" width="250px" />
    </td>
    <td>
      <h3>
        Projeto criado no Gostack Bootcamp: API Gobarber
      </h3>
      <p>Pequena API criada em Node, usando Typescript com a abordagem SOLID, DDD e TDD.</p>
      <p>
        <a href="https://cajucomunica.com.br">
          <img alt="Criado por Alcir Junior [Caju]" src="https://img.shields.io/badge/criado%20por-Alcir Junior [Caju]-%23f08700">
        </a>
        <img alt="License" src="https://img.shields.io/badge/license-MIT-%23f08700">
      </p>
      <p">
        <a href="#telas-do-sistema">Print da API sendo consumida pelo Insomnia:</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <a href="#descrição">Descrição</a>
      </p>
    </td>
  </tr>
</table>

#### Telas do Sistema

<p align="center">
    <img alt="Tela 01" src="_images/insomnia.png" width="75%" style="margin: 15px 0" />
</p>

---

#### Descrição

Pequena API criada em Node, usando Typescript com a abordagem SOLID, DDD e TDD, essa API gerencia agendamentos de uma Barbearia, pode-se criar Usuários, Recuperar Senha, criar e consultar agendamentos.

Para quem quiser utilizar o projeto execute os comandos para criar as migrations e popular:

yarn typeorm migration:run

yarn seed:run

Isso irá criar alguns dados de exemplos, com dois e-mails para testes:

client@gobarber.com.br

provider@gobarber.com.br

A senha para todos usuários são 123456

---

#### Visualizar o projeto na IDE:

Para quem quiser visualizar o projeto na IDE esse recurso do GitHub é bem bacana:

https://github1s.com/alcir-junior-caju/study-js-node-gostack-gobarber

---

#### Configuração Insomnia:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=GoBarberAPI&uri=https%3A%2F%2Fraw.githubusercontent.com%2Falcir-junior-caju%2Fstudy-js-node-gostack-gobarber%2Fmaster%2Fgobarber-api-insomnia.json)
