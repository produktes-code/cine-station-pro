import { request } from './client';

export async function createProject(projectData) {
  return request('/projects', {
    method: 'POST',
    body: projectData,
  });
}

export async function listProjects() {
  return request('/projects');
}

export async function getProject(projectId) {
  return request(`/projects/${projectId}`);
}

export async function deleteProject(projectId) {
  return request(`/projects/${projectId}`, {
    method: 'DELETE',
  });
}
