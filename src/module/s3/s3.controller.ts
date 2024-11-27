import { Controller, Post, Body } from '@nestjs/common'
import { S3Service } from './s3.service'

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post('upload')
  // async uploadFile(@Body('localFilePath') localFilePath: string, @Body('s3Key') s3Key: string): Promise<string> {
  async uploadFile(): Promise<any> {
    try {
      // const fileUrl = await this.s3Service.uploadFile(localFilePath, s3Key)
      // return `File uploaded successfully: ${fileUrl}`
      // const res = await this.s3Service.upload('finviet', '/upload/test/data.txt', '/tmp/data.txt');
      const res = await this.s3Service.isExistsFilePath('finviet', '/upload/test/data.txt');
      console.log("res..............", res);
      return res;
    } catch (error) {
      console.error('Error during file upload:', error)
      return `File upload failed: ${error.message}`
    }
  }
}
