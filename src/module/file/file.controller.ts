import { Controller, Get, Post, Query, UseInterceptors, UploadedFiles, UploadedFile, StreamableFile, Header, Res } from '@nestjs/common'
import { FileService } from './file.service'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer'
import { diskStorage } from 'multer'
import { imageFileFilter } from './file.helper'
import * as uuid from 'uuid'
import { createReadStream } from 'fs'
import { join } from 'path'
import { Response } from 'express'

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('single')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          callback(null, `${uuid.v4()}.${file.fieldname}.${file.originalname.split('.')[1]}`)
        },
      }),
      fileFilter: imageFileFilter,
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
      fileFilter: imageFileFilter,
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
  downloadFile(@Res({ passthrough: true }) res: Response, @Query('file') file: string) {
    res.set({
      'Content-Type': 'image/png',
      'Content-Disposition': `attachment; filename="${file}"`,
    })
    const filePath = createReadStream(join(`${process.cwd()}`, 'files', file))
    return new StreamableFile(filePath)
  }
}
