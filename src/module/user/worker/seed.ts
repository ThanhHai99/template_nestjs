import { parentPort, workerData } from 'worker_threads'
import { AppDataSource } from '../../../config/data-source'
import { User } from '../user.entity'

async function seedUsers(users: any[]) {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize()
  }
  const repo = AppDataSource.getRepository(User)
  await repo.save(users)
}

;(async () => {
  try {
    await seedUsers(workerData)
    parentPort.postMessage({ success: true })
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message })
  }
})()
