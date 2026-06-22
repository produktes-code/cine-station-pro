import { request } from './client';

export async function applyFilter(videoPath, filterName, outputPath, intensity = 1.0) {
  const params = new URLSearchParams({
    video_path: videoPath,
    filter_name: filterName,
    output_path: outputPath,
    intensity: intensity.toString(),
  });
  return request(`/effects/filter?${params.toString()}`, {
    method: 'POST',
  });
}

export async function applyTransition(video1Path, video2Path, transitionName, duration, offset, outputPath) {
  const params = new URLSearchParams({
    video1_path: video1Path,
    video2_path: video2Path,
    transition_name: transitionName,
    duration: duration.toString(),
    offset: offset.toString(),
    output_path: outputPath,
  });
  return request(`/effects/transition?${params.toString()}`, {
    method: 'POST',
  });
}

export async function enhancePrompt(prompt) {
  return request('/effects/enhance-prompt', {
    method: 'POST',
    body: { prompt },
  });
}
