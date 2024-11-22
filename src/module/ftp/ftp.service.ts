import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Client } from 'basic-ftp'
import * as fs from 'fs'

@Injectable()
export class FtpService {
  private ftpClient: Client

  constructor(private readonly configService: ConfigService) {
    this.ftpClient = new Client()
  }

  /**
   * Kết nối đến FTP Server
   */
  async connectToFtp(): Promise<void> {
    try {
      await this.ftpClient.access({
        host: this.configService.get<string>('ftp.host'),
        user: this.configService.get<string>('ftp.user'),
        password: this.configService.get<string>('ftp.pass'),
        secure: false, // Đặt thành true nếu server yêu cầu FTP qua TLS
      })
      console.log('Connected to FTP server')
    } catch (error) {
      console.error('Error connecting to FTP server:', error)
      throw new Error('Could not connect to FTP server')
    }
  }

  /**
   * Upload file lên FTP server
   */
  async uploadFile(localFilePath: string, remoteFilePath: string): Promise<void> {
    try {
      const fileExists = fs.existsSync(localFilePath)
      if (!fileExists) {
        throw new Error(`File not found: ${localFilePath}`)
      }

      await this.ftpClient.uploadFrom(localFilePath, remoteFilePath)
      console.log(`File uploaded successfully to ${remoteFilePath}`)
    } catch (error) {
      console.error('Error uploading file:', error)
      throw error
    }
  }

  /**
   * Ngắt kết nối khỏi FTP server
   */
  async disconnect(): Promise<void> {
    try {
      this.ftpClient.close()
      console.log('Disconnected from FTP server')
    } catch (error) {
      console.error('Error disconnecting from FTP server:', error)
    }
  }
}
