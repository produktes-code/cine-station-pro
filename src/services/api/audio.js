import { request } from './client';

export async function normalizeAudio(audioPath, outputPath, targetDb = -16.0) {
  const params = new URLSearchParams({
    audio_path: audioPath,
    output_path: outputPath,
    target_db: targetDb.toString(),
  });
  return request(`/audio/normalize?${params.toString()}`, {
    method: 'POST',
  });
}

export async function mixAudio(trackPaths, outputPath) {
  // Pass tracks as multiple parameters (e.g. track_paths=x&track_paths=y)
  const params = new URLSearchParams();
  trackPaths.forEach(path => params.append('track_paths', path));
  params.append('output_path', outputPath);
  
  return request(`/audio/mix?${params.toString()}`, {
    method: 'POST',
  });
}

export async function compressAudio(audioPath, outputPath, threshold = -20.0, ratio = 4.0) {
  const params = new URLSearchParams({
    audio_path: audioPath,
    output_path: outputPath,
    threshold: threshold.toString(),
    ratio: ratio.toString(),
  });
  return request(`/audio/compress?${params.toString()}`, {
    method: 'POST',
  });
}

export async function reduceNoise(audioPath, outputPath) {
  const params = new URLSearchParams({
    audio_path: audioPath,
    output_path: outputPath,
  });
  return request(`/audio/reduce-noise?${params.toString()}`, {
    method: 'POST',
  });
}
