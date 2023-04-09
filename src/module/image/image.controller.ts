import { Controller, Get, Post, Query, UseInterceptors, UploadedFiles, UploadedFile, StreamableFile, Res } from '@nestjs/common'
import { ImageService } from './image.service'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer'
import { diskStorage } from 'multer'
import { imageFilter } from './image.helper'
import * as uuid from 'uuid'
import { createReadStream } from 'fs'
import { join } from 'path'
import { Response } from 'express'

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          callback(null, `${uuid.v4()}.${file.fieldname}.${file.originalname.split('.')[1]}`)
        },
      }),
      fileFilter: imageFilter,
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
    FilesInterceptor('file', 100, {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          callback(null, `${uuid.v4()}.${file.fieldname}.${file.originalname.split('.')[1]}`)
        },
      }),
      fileFilter: imageFilter,
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
  downloadFile(@Res({ passthrough: true }) res: Response, @Query('file') image: string) {
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${image}"`,
    })
    const filePath = createReadStream(join(`${process.cwd()}`, 'files', image))
    return new StreamableFile(filePath)
  }
}
