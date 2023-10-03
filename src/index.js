import  express from 'express'
import {router as categoriesRouter} from './routes/categories.routes.js'
import {router as productsRouter} from './routes/products.routes.js'

const app = express()

app.use(express.json())

app.use("/api",productsRouter)
app.use("/api",categoriesRouter)


const port = 3000;
app.listen(port, () => {
    console.log('Server is running on port', port)

}
)