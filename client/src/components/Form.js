import React from "react";
import styled from "styled-components";
import { createDeployment } from "../api";

const Container = styled.form`
  padding-top: 20px;
  padding-bottom: 40px;

  .form-row {
    margin-bottom: 15px;
  }
`;

function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("handle submit");
    createDeployment({
      url: "http://10clouds.com",
    });
  }

  return (
    <Container onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-md-12">
          <label>Url</label>
          <input
            className="form-control is-invalid2"
            placeholder="Url"
            required2
          />
          <div className="invalid-feedback">Error msg</div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-6">
          <label>Template</label>
          <select className="form-control" required2>
            <option value="">-- select --</option>
          </select>
          <div className="invalid-feedback">-</div>
        </div>
        <div className="col-md-6">
          <label>Version</label>
          <select className="form-control" required2 disabled>
            <option value="">-- select --</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-12">
          <button className="btn btn-primary">Add Deployment</button>
        </div>
      </div>
    </Container>
  );
}

export default Form;
