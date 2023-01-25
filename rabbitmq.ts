import client, {Channel, Connection} from 'amqplib';

export default class RabbitMq{
    channel: Channel
    connection: Connection
    
    createConnection = async()=>{
        try{ 
            this.connection = await client.connect('amqp://username:password@localhost:5673') // establishes connection with rabbitmq
            this.channel = await this.connection.createChannel() // allow us to communicate with the message broker
            await this.channel.assertQueue("test-queue") // create a queue if it does not already exist
        }catch(error){
            console.log(error);
    }};

    sendData = async(data: string)=>{
        // sends a message to the queue
        await this.channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)))
    
        // close the connection and channel
        await this.channel.close();
        await this.connection.close();
    }

    consumeData = async()=>{
        this.channel.consume("test-queue", data=>{
            console.log(`${Buffer.from(data!.content)}`);
            this.channel.ack;
        });    
    }
};