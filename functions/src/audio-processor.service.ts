import Mux from '@mux/mux-node';

import { MuxConfig } from './mux.config';

export class AudioProcessorService {
  constructor(private config: MuxConfig) {}

  async createStreamAsync(url: string): Promise<string> {
    var result = null;

    if (!url) {
      return null;
    }

    try {
      var mux = new Mux(this.config.accesstoken, this.config.secret);

      var asset = await mux.Video.Assets.create({ input: url, playback_policy: 'public' });

      result = `https://stream.mux.com/${asset.playback_ids[0].id}.m3u8`;
    } catch (ex) {
      console.log(`Unable to process audio: ${url} with exception: ${JSON.stringify(ex)}`);
    }

    return result;
  }
}
