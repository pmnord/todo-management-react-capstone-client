## Collab

Collab is a lightweight kanban issue tracker supporting concurrent users over web sockets.

[Demo](https://wedo.pmnord.now.sh/)

[Backend Documentation](https://github.com/pmnord/todo-management-react-capstone-server)

|                 |         |         |            |          |
| --------------- | ------- | ------- | ---------- | -------- |
| **Front-End**   | React   | HTML5   | ES10       | CSS3     |
| **Back-End**    | Node.js | Express | PostgreSQL | REST API |
| **Development** | Jest    | Mocha   | Heroku     | Vercel   |
|                 |         |         |            |          |

### Example Project View

Create categories, tasks, tag your tasks, drag and drop everything, and share your board with others in real time.

![Application View](./resources/screenshot1.png)

## User Flow

- Create board or get link to an existing project
  - Interact with categories
    - Create categories
    - Move categories
    - Delete categories
  - Interact with tasks
    - Create tasks
    - Set tags
    - Set comments
    - Move tasks
    - Delete tasks
  - Other
    - Copy invite link and invite more users
    - Style the app

## Conceptual Mockups

![Desktop Wireframe](./resources/cap3wireframes.png)

## Developer Roadmap

1. Users can set colors on tasks and categories
1. Users can set a due date on tasks
1. Users have unique names that are visible in a users container
1. Users can see when other users are moving a draggable
1. Optimization and Refactoring

- Enable session affinity on Heroku if you expand to more than one dyno
