import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_TODOS_USERS = gql`
  query GetAllTodo {
    getTodos {
      title
      completed
      user {
        name
        email
        phone
        website
      }
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(GET_TODOS_USERS);
  console.log("data====>", JSON.stringify(data));

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      {data.getTodos.map((todo) => {
        return (
          <div
            key={todo.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <h3>{todo.title}</h3>
            <p>{todo.completed}</p>
            <p>{todo.user.name}</p>
            <p>{todo.user.email}</p>
            <p>{todo.user.phone}</p>
            <p>{todo.user.website}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
