import http from "http";
import { url } from "inspector";

const food = ["Rice", "Beans", "Yam", "Tea", "Eba", "Fufu", "Bread"];
const data: any = [];
Array.from({ length: 5 }, () => {
  let numb = Math.floor(Math.random() * food.length);
  let cost = Math.floor(Math.random() * 1000);
  data.push({ item: food[numb], cost });
});

// console.log(data); 
//This is JSON

const port: number = 5544;
const server: http.Server<
  typeof http.IncomingMessage,
  typeof http.ServerResponse
> = http.createServer(
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    // Reading the server
    // const { method, url } = req;
    // if (method === "GET" && url === "/") {
    //     res.writeHead(200, {"content-type": "application/json"})
    //   res.write("We are good!\n");
    //   res.write(JSON.stringify(data)); //convert from JSON to String...Server...
    //   console.log(req)
    //   res.end();
    // } else {
    // }
    //writing to server...
    let body: string = "";
    let newData: {}[] = [];

    req.on("data", (chunk: Buffer) => {
      body += chunk;
    //   console.log(chunk)
    //   console.log(body)
    });

    req.on("data", () => {
        let result: {} = JSON.parse(body);
        newData.push(result);
        console.log(newData);
        res.write(JSON.stringify(newData));
        res.end();
    })
  }
);

server.listen(port, () => {
  console.log("server is now listening");
});
