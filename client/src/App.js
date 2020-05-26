import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { addDeployment, deleteDeployment } from "./store/actions";
import GlobalMessage from "./components/GlobalMessage";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  const dispatch = useDispatch();

  const deployments = useSelector((state) => state.deployments);
  const newDeployment = useSelector((state) => state.newDeployment);
  const isDeletingDeploymentWithId = useSelector(
    (state) => state.isDeletingDeploymentWithId
  );
  const templates = useSelector((state) => state.templates);
  const isGlobalError = useSelector((state) => state.appLoadError);

  return (
    <div className="container">
      {deployments && templates ? (
        <>
          <Form
            templates={templates}
            isAdding={newDeployment.isSubmitting}
            errors={newDeployment.errors}
            onAdd={(data) => dispatch(addDeployment(data))}
          />
          <Table
            deployments={deployments}
            onDelete={(id) => dispatch(deleteDeployment(id))}
            isDeletingDeploymentWithId={isDeletingDeploymentWithId}
          />
        </>
      ) : (
        <GlobalMessage>
          {isGlobalError
            ? "Unknown Error. Please try again later."
            : "Loading..."}
        </GlobalMessage>
      )}
    </div>
  );
}

export default App;
