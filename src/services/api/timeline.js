import { request } from './client';

export async function getTimeline(projectId) {
  return request(`/timeline/${projectId}`);
}

export async function addTrack(projectId, trackData) {
  return request(`/timeline/${projectId}/tracks`, {
    method: 'POST',
    body: trackData,
  });
}

export async function addClip(projectId, clipData) {
  return request(`/timeline/${projectId}/clips`, {
    method: 'POST',
    body: clipData,
  });
}
