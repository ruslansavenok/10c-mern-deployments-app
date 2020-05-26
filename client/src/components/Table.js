import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Countdown from "react-countdown";
import format from "date-fns/format";

const Container = styled.table`
  td:last-child,
  th:last-child {
    width: 1px;
  }

  td:last-child {
    text-align: center;
  }

  tbody {
    tr td {
      transition: all 0.2s;
    }

    tr.fade-enter td {
      background: rgba(183, 225, 205, 0.3);
    }

    tr.fade-exit td {
      background: rgba(244, 199, 195, 0.3);
    }
  }
`;

function Table({ deployments, onDelete, isDeletingDeploymentWithId }) {
  return (
    <Container className="table">
      <thead>
        <tr>
          <th scope="col">Deployed at</th>
          <th scope="col">Url</th>
          <th scope="col">Template</th>
          <th scope="col">Version</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <TransitionGroup component={null}>
          {deployments.map((deployment) => {
            const deployedAt = new Date(deployment.deployedAt);
            const isDeleting = isDeletingDeploymentWithId === deployment._id;

            return (
              <CSSTransition
                key={deployment._id}
                timeout={200}
                classNames="fade"
              >
                <Countdown
                  date={deployedAt}
                  renderer={({ hours, minutes, seconds, completed }) => {
                    return (
                      <tr>
                        <td>
                          {completed ? (
                            format(
                              new Date(deployment.deployedAt),
                              "yyyy-MM-dd kk:mm:ss"
                            )
                          ) : (
                            <span>
                              Ready in {hours.toString().padStart("2", 0)}:
                              {minutes.toString().padStart("2", 0)}:
                              {seconds.toString().padStart("2", 0)}
                            </span>
                          )}
                        </td>
                        <td>
                          <a
                            href={deployment.url}
                            targe="_blank"
                            rel="nofollow"
                          >
                            {deployment.url}
                          </a>
                        </td>
                        <td>{deployment.templateName}</td>
                        <td>{deployment.version}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => onDelete(deployment._id)}
                            disabled={isDeleting}
                          >
                            {isDeleting
                              ? "..."
                              : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  }}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </tbody>
    </Container>
  );
}

Table.propTypes = {
  deployments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      deployedAt: PropTypes.string.isRequired,
      templateName: PropTypes.string.isRequired,
      version: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeletingDeploymentWithId: PropTypes.string,
};

export default Table;
