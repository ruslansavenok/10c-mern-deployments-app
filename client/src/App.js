import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Provider as StoreProvider } from 'react-redux';
import store from './store';
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  return (
    <StoreProvider store={store}>
      <div className="container">
        <Form />
        <Table />
      </div>
    </StoreProvider>
  );
}

export default App;
