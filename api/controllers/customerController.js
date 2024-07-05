import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'

import CustomerModel from '../models/customerModel.js'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)
dotenv.config({ path: path.join(__dirname, '.env') })

// --------------------------------------------------
// API Endpoints
// --------------------------------------------------

export {}
