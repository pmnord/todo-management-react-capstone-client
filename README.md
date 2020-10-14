## Collab

Collab is a light-weight kanban issue tracker supporting concurrent users.

[Demo](https://wedo.now.sh/)

[Backend Documentation](https://github.com/pmnord/todo-management-react-capstone-server)

|                 |         |         |            |             |
| --------------- | ------- | ------- | ---------- | ----------- |
| **Front-End**   | React   | HTML5   | ES10       | CSS3        |
| **Back-End**    | Node.js | Express | PostgreSQL | RESTful API |
| **Development** | Jest    | Mocha   | Chai       | Heroku      | Vercel |
|                 |         |         |            |             |

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

1. Implement Socket.io
   - Enable session affinity on Heroku
1. Users can set colors on individual tasks and categories
1. Add a due date to the task cards
1. Review react-beautiful-dnd docs for optimizations
1. Refactor to use the React Context API
1. Refactor for more React Hooks
