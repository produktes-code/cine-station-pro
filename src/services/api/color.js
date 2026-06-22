import { request } from './client';

export async function autoWhiteBalance(videoPath, outputPath) {
  const params = new URLSearchParams({ video_path: videoPath, output_path: outputPath });
  return request(`/color/balance?${params.toString()}`, {
    method: 'POST',
  });
}

export async function autoExposure(videoPath, outputPath) {
  const params = new URLSearchParams({ video_path: videoPath, output_path: outputPath });
  return request(`/color/exposure?${params.toString()}`, {
    method: 'POST',
  });
}

export async function adjustColor(videoPath, outputPath, lift = 0, gamma = 1, gain = 1) {
  const params = new URLSearchParams({
    video_path: videoPath,
    output_path: outputPath,
    lift: lift.toString(),
    gamma: gamma.toString(),
    gain: gain.toString(),
  });
  return request(`/color/adjust?${params.toString()}`, {
    method: 'POST',
  });
}

export async function applyPreset(videoPath, presetName, outputPath) {
  const params = new URLSearchParams({
    video_path: videoPath,
    preset_name: presetName,
    output_path: outputPath,
  });
  return request(`/color/preset?${params.toString()}`, {
    method: 'POST',
  });
}
