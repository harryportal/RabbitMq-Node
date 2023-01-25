import express, {Request,  Response} from 'express';
import RabbitMq from './rabbitmq';

const app = express();
const PORT = process.env.PORT || 4001;
const rabbitmq = new RabbitMq();

rabbitmq.createConnection();  // initiate connection

app.use(express.json());

app.get("/send-msg", async(req: Request, res: Response)=>{
    const data = "This is a simple message sent by the provider";
    rabbitmq.sendData(data);
    console.log("Message sent to Consumer");
});


app.listen(PORT, ()=>{
    console.log(`Server Running on Port ${PORT}`)
});







