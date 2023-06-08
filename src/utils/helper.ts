export const getSource = (poster?: string) =>
  poster ? {uri: poster} : require('../assets/music.png');
