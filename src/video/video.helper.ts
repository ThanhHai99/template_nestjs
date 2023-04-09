export const videoFilter = (req: any, file: any, callback: any) => {
  if (!file.originalname.match(/\.(mp4|mov)$/)) {
    req.fileValidationError = 'only video files allowed'
    return callback(null, false)
  }
  callback(null, true)
}
