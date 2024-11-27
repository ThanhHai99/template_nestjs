// import { Injectable, Logger } from '@nestjs/common'
// import * as Minio from 'minio'
//
//
// @Injectable()
// export class S3Service {
//   // example (Nutricare)(production)
//   private readonly minioClient: Minio.Client
//   private readonly accessKey = ''
//   private readonly secretKey = ''
//   private readonly endPoint = ''
//   private readonly bucket = ''
//   private readonly logger = new Logger(S3Service.name)
//
//   constructor() {
//     this.minioClient = new Minio.Client({
//       endPoint: this.endPoint,
//       accessKey: this.accessKey,
//       secretKey: this.secretKey,
//       useSSL: false,
//     })
//   }
//
//   public async isExistsFilePath(bucket: string, path: string) {
//     try {
//       return this.minioClient.statObject(bucket, path).then(data => true).catch(() => false)
//     } catch (error) {
//       this.logger.error(error)
//     }
//   }
//
//   public async upload(
//     bucketName: string,
//     relativePathFileDestination: string, // Ex: /uploads/daily/2024/11/17/DS_DangKyCTTB/DS_DangKyCTTB_2024-11-17.xlsx
//     relativePathFileSource: string,
//   ) {
//     try {
//       // Liệt kê các tệp trong bucket
//       const stream = this.minioClient.listObjectsV2(bucketName, '', true)
//       stream.on('data', (obj) => {
//         console.log(obj.name)
//       })
//       stream.on('error', (err) => {
//         console.error('Lỗi khi liệt kê tệp:', err)
//       })
//
//
//       // const isExistsBucket = await this.minioClient.bucketExists(bucketName);
//       // if (!isExistsBucket) {
//       //   await this.minioClient.makeBucket(bucketName);
//       // }
//       // const isExistsFilePath = await this.isExistsFilePath(bucketName, relativePathFileDestination);
//       // if (isExistsFilePath) {
//       //   return;
//       // } else {
//       //   // return this.minioClient.putObject(bucketName, relativePathFile, streamData); // upload by stream
//       //   return this.minioClient.fPutObject(bucketName, relativePathFileDestination, relativePathFileSource); // upload by file path
//       // }
//     } catch (error) {
//       this.logger.error(error)
//     }
//   }
// }
