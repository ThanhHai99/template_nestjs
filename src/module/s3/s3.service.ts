import { Injectable } from '@nestjs/common'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { ConfigService } from '@nestjs/config'
import * as fs from 'fs'

@Injectable()
export class S3Service {
  private s3Client: S3Client
  private bucketName: string

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    })
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME')
  }

  /**
   * Upload file từ local lên S3 bucket
   * @param localFilePath Đường dẫn file trên local
   * @param s3Key Đường dẫn file trên S3 (VD: folder/filename.ext)
   */
  async uploadFile(localFilePath: string, s3Key: string): Promise<string> {
    try {
      const fileStream = fs.createReadStream(localFilePath)
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: s3Key,
        Body: fileStream,
      })

      await this.s3Client.send(command)
      console.log(`File uploaded successfully to S3: ${s3Key}`)

      return `https://${this.bucketName}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${s3Key}`
    } catch (error) {
      console.error('Error uploading file to S3:', error)
      throw new Error('File upload failed')
    }
  }
}
