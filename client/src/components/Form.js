import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import classnames from "classnames";
import get from "lodash/get";

const Container = styled.form`
  padding-top: 20px;
  padding-bottom: 40px;

  .form-row {
    margin-bottom: 15px;
  }
`;

function Form({ templates, isAdding, errors, onAdd }) {
  const urlInput = useRef(null);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const versions = selectedTemplate
    ? templates.find((t) => t.name === selectedTemplate).versions
    : [];

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({
      url: urlInput.current.value,
      templateName: selectedTemplate,
      version: selectedVersion,
    });
  }

  return (
    <Container onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-md-12">
          <label>Url</label>
          <input
            ref={urlInput}
            className={classnames("form-control", {
              "is-invalid": get(errors, "url"),
            })}
            placeholder="Url"
            required
          />
          <div className="invalid-feedback">
            {get(errors, "url.properties.message")}
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-6">
          <label>Template</label>
          <select
            className={classnames("form-control", {
              "is-invalid": get(errors, "templateName"),
            })}
            required
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">-- select --</option>
            {templates.map((template) => (
              <option key={template.name} value={template.name}>
                {template.name}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {get(errors, "url.properties.templateName")}
          </div>
        </div>
        <div className="col-md-6">
          <label>Version</label>
          <select
            className={classnames("form-control", {
              "is-invalid": get(errors, "templateName"),
            })}
            required
            disabled={!selectedTemplate}
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
          >
            <option value="">-- select --</option>
            {versions.map((version) => (
              <option key={version} value={version}>
                {version}
              </option>
            ))}
          </select>
          <div className="invalid-feedback">
            {get(errors, "url.properties.version")}
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="col-md-12">
          <button className="btn btn-primary" disabled={isAdding}>
            {isAdding ? "..." : "Add Deployment"}
          </button>
        </div>
      </div>
    </Container>
  );
}

Form.propTypes = {
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      versions: PropTypes.array.isRequired,
    })
  ),
  onAdd: PropTypes.func.isRequired,
  isAdding: PropTypes.bool.isRequired,
  errors: PropTypes.object,
};

export default Form;
