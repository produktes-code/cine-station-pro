import { request } from './client';

export async function createRenderJob(projectId, timelineData, exportConfig) {
  return request('/export/jobs', {
    method: 'POST',
    body: {
      project_id: projectId,
      timeline_data: timelineData,
      export_config: exportConfig,
    },
  });
}

export async function startRenderJob(jobId, projectId, timelineData, exportConfig) {
  return request(`/export/jobs/${jobId}/start`, {
    method: 'POST',
    body: {
      project_id: projectId,
      timeline_data: timelineData,
      export_config: exportConfig,
    },
  });
}

export async function cancelRenderJob(jobId) {
  return request(`/export/jobs/${jobId}/cancel`, {
    method: 'POST',
  });
}

export async function getRenderProgress(jobId) {
  return request(`/export/jobs/${jobId}/progress`);
}
