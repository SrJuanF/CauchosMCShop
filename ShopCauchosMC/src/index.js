import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import paymentRoutes from './routes/payment.routes.js'
import {PORT} from './config.js'
import './database/database.js'
import RabbitMQ from './colas/conexionRabbit.js'


var corsOptions = {//origin: '*',
    origin: ['https://shopcauchosmc.com', 'https://dev.shopcauchosmc.com', 'http://localhost:8080'], // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb'}));
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(paymentRoutes);
//app.use(express.static('public'));//app.use(express.static(path.resolve('src/presentacion')));
app.listen(PORT);

console.log('Server on port', PORT)

RabbitMQ.connect();

//docker-compose logs -f backend

//dir
//docker-compose build frontend
//docker-compose up -d

//GIT
/*
git add . && \
rm -rf cauchosmc/.git && \
git rm --cached -rf cauchosmc && \
rm -rf ShopCauchosMC/.git && \
git rm --cached -rf ShopCauchosMC && \
git add cauchosmc && \
git add ShopCauchosMC 
git commit -m "2025"
git push -u origin main

git remote set-url origin https://github.com/usuario/repositorio2.git
git push -u origin main*/

/*
import { encrypt, compare } from "./services/handleBcrypt.js";
let hs = await encrypt("ShopCauchosMC%*07")
console.log(hs)

let kd = await compare("ShopCauchosMC%*07", hs)
console.log(kd)*/

// Test1 : APP_USR-6878764603009760-080420-5f8e85ae4413186528ad4e80e9a81c52-2606461440