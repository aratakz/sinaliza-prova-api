# Referência da API - Sinaliza Prova

Documentação de todos os endpoints da API.

## Evaluation

### Evaluation - Exams
- `POST /evaluation/exams/create` - Cria um novo exame
- `GET /evaluation/exams/list` - Lista todos os exames
- `GET /evaluation/exams/find/{id}` - Busca um exame pelo ID
- `DELETE /evaluation/exams/remove/{id}` - Remove um exame pelo ID

### Evaluation - Questions
- `POST /evaluation/questions/register` - Registra uma nova questão
- `GET /evaluation/questions/list` - Lista todas as questões
- `GET /evaluation/questions/find/{id}` - Busca uma questão pelo ID
- `GET /evaluation/questions/search` - Procura por questões
- `POST /evaluation/questions/fieldVideo` - Salva o vídeo de um campo da questão
- `PATCH /evaluation/questions/update/{id}` - Atualiza uma questão
- `DELETE /evaluation/questions/{id}` - Remove uma questão

### Evaluation - Question Options
- `POST /evaluation/questionOption/register` - Cria uma opção para uma questão
- `GET /evaluation/questionOption/find/question/{id}` - Busca opções de uma questão pelo ID da questão

### Evaluation - Question Tags
- `POST /evaluation/questionTags/create` - Cria uma tag para uma questão

---

## Management

### Management - Rooms
- `GET /management/room` - Lista todas as salas
- `GET /management/room/{id}` - Busca uma sala pelo ID
- `DELETE /management/room/{id}` - Remove uma sala pelo ID
- `POST /management/room/register` - Registra uma nova sala
- `PATCH /management/room/update/{id}` - Atualiza uma sala

### Management - Courses
- `GET /management/course/data{id}` - Obtém informações de um curso
- `PATCH /management/course/update{id}` - Atualiza um curso

### Management - Institutes
- `GET /management/institute` - Lista todos os institutos
- `GET /management/institute/find/{id}` - Busca um instituto pelo ID
- `GET /management/institute/search/{text}` - Procura um instituto por texto
- `POST /management/institute/create` - Cria um novo instituto
- `PUT /management/institute/update/{id}` - Atualiza um instituto
- `DELETE /management/institute/remove/{id}` - Remove um instituto

### Management - Disciplines
- `GET /management/discipline` - Lista todas as disciplinas
- `GET /management/discipline/{id}` - Busca uma disciplina pelo ID
- `PATCH /management/discipline/update/{id}` - Atualiza uma disciplina
- `POST /management/discipline/create` - Cria uma nova disciplina
- `DELETE /management/discipline/remove/{id}` - Remove uma disciplina

### Management - Curriculums
- `GET /management/curriculum/{id}` - Busca um currículo pelo ID da disciplina

---

## Security

### Security - Auth
- `GET /security/auth/checkTwoFactorToken/{token}` - Verifica um token de dois fatores
- `GET /security/auth/checkAuthToken/{token}` - Verifica um token de autenticação
- `PATCH /security/auth/activate/{token}` - Ativa um usuário com um token
- `PATCH /security/auth/updatePass/{token}` - Atualiza a senha com um token
- `POST /security/auth/signin` - Realiza o login
- `POST /security/auth/student/firstLogin` - Realiza o primeiro login de um estudante
- `POST /security/auth/requestPassChange` - Solicita a mudança de senha
- `DELETE /security/auth/logout` - Realiza o logout

---

## System

### System - Media
- `GET /system/media/field/video/{id}` - Carrega o vídeo de um campo

---

## Users

### Users - General
- `GET /users` - Lista todos os usuários
- `GET /users/userdata/{userId}` - Obtém informações de um usuário
- `GET /users/checkUsername/{username}` - Verifica se um nome de usuário existe
- `POST /users/avatarLink` - Obtém o link do avatar
- `POST /users/create` - Cria um novo usuário
- `PATCH /users/update/{id}` - Atualiza um usuário

### Users - Students
- `GET /users/students` - Lista todos os estudantes
- `GET /users/students/{id}` - Busca um estudante pelo ID
- `DELETE /users/students/remove/{id}` - Remove um estudante
- `PATCH /users/students/update/{id}` - Atualiza um estudante

### Users - Professionals
- `POST /users/professionals/create` - Cria um novo profissional
