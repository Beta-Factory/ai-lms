// ? ============ example component ============

export interface ExampleData {
  id: number;
  name: string;
  body: string;
  // ...other properties
}

import React from "react";

const Example = ({ example }: { example: ExampleData }) => {
  return (
    <div>
      <h1>Example</h1>
      <p>{example.name}</p>
      <p>{example.body}</p>
    </div>
  );
};

export default Example;
