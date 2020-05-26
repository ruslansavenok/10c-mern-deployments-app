import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE || "http://localhost:3001/api/",
});

export async function getTemplates() {
  return api.get("templates");
}

export async function getDeployments() {
  return api.get("deployments");
}

export async function createDeployment(data) {
  return api.post("deployments", data);
}

export async function deleteDeployment(id) {
  return api.delete(`deployments/${id}`);
}
