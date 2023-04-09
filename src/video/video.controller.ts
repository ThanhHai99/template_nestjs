import { Res, Query, StreamableFile, UploadedFile, UploadedFiles, UseInterceptors, Controller, Get, Post } from '@nestjs/common'
import { VideoService } from './video.service'
import { CreateVideoDto, UpdateVideoDto } from './video.dto'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import * as uuid from 'uuid'
import { videoFilter } from './video.helper'
import { createReadStream } from 'fs'
import { join } from 'path'
import { Response } from 'express'

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('single')
  @UseInterceptors(
    FileInterceptor('video', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          callback(null, `${uuid.v4()}.${file.fieldname}.${file.originalname.split('.')[1]}`)
        },
      }),
      fileFilter: videoFilter,
    }),
  )
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      originalname: file.originalname,
      filename: file.filename,
    }
  }

  @Post('multi')
  @UseInterceptors(
    FilesInterceptor('videos', 100, {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          callback(null, `${uuid.v4()}.${file.fieldname}.${file.originalname.split('.')[1]}`)
        },
      }),
      fileFilter: videoFilter,
    }),
  )
  public async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return files.map((f) => {
      return {
        originalname: f.originalname,
        filename: f.filename,
      }
    })
  }

  @Get()
  downloadFile(@Res({ passthrough: true }) res: Response, @Query('video') video: string) {
    res.set({
      'Content-Type': 'video/mp4',
      'Content-Disposition': `attachment; filename="${video}"`,
    })
    const filePath = createReadStream(join(`${process.cwd()}`, 'files', video))
    return new StreamableFile(filePath)
  }

  @Get('streaming')
  streamingVideo() {}
}
