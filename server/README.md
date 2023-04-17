## GraphQL Server

Start with installing packages

```
npm install
```

Use this command to run the GraphQL Server

```
$ npm run dev
```

Open this URL in a browser

```
http://localhost:4000/graphql
```

Example query
```
  {
    steps {
      id
      name
      tasks {
        id
        name
        complete
        stepId
      }
    }
  }
```

Example mutation to save task done
```
  mutation {
    updateTask(id: 1, complete: true) {
      id
      complete
    }
  }
```
