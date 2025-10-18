# Api creada con node version 18. gestor de base de datos sequelize postgres

### Ejecutar las migraciones y comandos de sequelize
- Inicializar Sequelize en el proyecto
npx sequelize-cli init

- Crear una nueva migración
npx sequelize-cli migration:generate --name create-user-table

- Ejecutar migraciones específicas
npx sequelize-cli db:migrate --name 20231010101010-create-user-table.js

- Ejecutar todas las migraciones pendientes
npx sequelize-cli db:migrate

- Revertir la última migración
npx sequelize-cli db:migrate:undo

- Revertir todas las migraciones
npx sequelize-cli db:migrate:undo:all

- Ejecutar seders para poblar la data.
npx sequelize-cli seed:generate --name 0000_status_pagos
npx sequelize-cli db:seed:all

