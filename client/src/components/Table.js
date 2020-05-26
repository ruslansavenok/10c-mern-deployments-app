import React from "react";
import styled from "styled-components";

const Container = styled.table`
  td:last-child,
  th:last-child {
    width: 1px;
  }
`;

function Table() {
  return (
    <Container className="table">
      <thead>
        <tr>
          <th scope="col">Url</th>
          <th scope="col">Template</th>
          <th scope="col">Version</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>http://10clouds.com</td>
          <td>Natural One</td>
          <td>1.1.0</td>
          <td>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
        <tr>
          <td>http://10clouds.com</td>
          <td>Sporty</td>
          <td>1.2.1</td>
          <td>
            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </Container>
  );
}

export default Table;
