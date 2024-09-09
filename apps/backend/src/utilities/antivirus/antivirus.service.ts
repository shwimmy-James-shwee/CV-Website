import { env } from '../../config/env';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Readable } from 'node:stream';

@Injectable()
export class AntivirusService {
  NodeClam = require('clamscan');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clamscan: any = undefined;
  async scanVirusBuffer(uploadFile: Express.Multer.File) {
    if (!this.clamscan) {
      this.clamscan = await new this.NodeClam().init({
        removeInfected: false, // If true, removes infected files
        debugMode: false, // Whether or not to log info/debug/error msgs to the console
        scanRecursively: true, // If true, deep scan folders recursively
        clamdscan: {
          host: env.AV_HOST, // IP of host to connect to TCP interface
          port: Number(env.AV_PORT), // Port of host to use when connecting via TCP interface
          timeout: 30000, // seconds
          localFallback: false, // Use local preferred binary to scan if socket/tcp fails
          multiscan: true, // Scan using all available cores! Yay!
          active: true, // If true, this module will consider using the clamdscan binary
          bypassTest: false, // Check to see if socket is available when applicable
        },
        preference: 'clamdscan', // If clamdscan is found and active, it will be used by default
      });
    }
    const { isInfected, ...vals } = await this.clamscan.scanStream(Readable.from(uploadFile.buffer));

    if (isInfected) {
      throw new BadRequestException(`File ${uploadFile.originalname} failed to pass antivirus check`);
    }
    return { isInfected, ...vals };
  }
}
