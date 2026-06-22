import { request } from './client';

export async function uploadMedia(projectId, file) {
  const formData = new FormData();
  formData.append('file', file);

  const params = new URLSearchParams({ project_id: projectId });
  return request(`/media/upload?${params.toString()}`, {
    method: 'POST',
    body: formData,
  });
}

export async function listProjectMedia(projectId, query = '') {
  const params = new URLSearchParams({ query });
  return request(`/media/${projectId}?${params.toString()}`);
}

export async function generateThumbnails(videoPath, count = 5) {
  const params = new URLSearchParams({ video_path: videoPath, count: count.toString() });
  return request(`/media/thumbnails?${params.toString()}`, {
    method: 'POST',
  });
}

export async function detectScenes(videoPath) {
  const params = new URLSearchParams({ video_path: videoPath });
  return request(`/media/detect-scenes?${params.toString()}`, {
    method: 'POST',
  });
}

export async function deleteMedia(projectId, mediaId) {
  return request(`/media/${projectId}/${mediaId}`, {
    method: 'DELETE',
  });
}
