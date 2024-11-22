import { Controller, Post, Body } from '@nestjs/common'
import { FtpService } from './ftp.service'

@Controller('ftp')
export class FtpController {
  constructor(private readonly ftpService: FtpService) {}

  @Post('upload')
  async uploadFile(@Body('localFilePath') localFilePath: string, @Body('remoteFilePath') remoteFilePath: string): Promise<string> {
    try {
      // Kết nối tới FTP server
      await this.ftpService.connectToFtp()

      // Upload file
      await this.ftpService.uploadFile(localFilePath, remoteFilePath)

      // Ngắt kết nối
      await this.ftpService.disconnect()

      return 'File uploaded successfully'
    } catch (error) {
      console.error('Error during file upload:', error)
      return `File upload failed: ${error.message}`
    }
  }
}
