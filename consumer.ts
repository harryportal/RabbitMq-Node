import express, {Request,  Response} from 'express';
import RabbitMq from './rabbitmq';

const app = express();
const PORT = process.env.PORT || 4002;
const rabbitmq = new RabbitMq();

rabbitmq.createConnection();

app.get('/get-msg', (req: Request, res: Response)=>{
    rabbitmq.consumeData();
});


app.listen(PORT, ()=>{
    console.log(`Server Running on Port ${PORT}`)
});







