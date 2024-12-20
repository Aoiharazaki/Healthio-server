import express, { Request, Response, Express } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors"

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient(); 

app.get("/allTodos", async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany();
    return res.json(allTodos);
});
app.post("/createTodo", async (req: Request, res: Response) => {
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
        data:{
            title,
            isCompleted,
        },
    });
    return res.json(createTodo);
});
app.put("/editTodo/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = await prisma.todo.update({
        where: { id },
        data:{
            title,
            isCompleted,
        },
    });
    return res.json(editTodo);
});
app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
        where: { id },
    });
    return res.json(deleteTodo);
});



app.get("/allShops", async (req: Request, res: Response) => {
    const allShops = await prisma.shop.findMany({
        include: {
            location: true, 
            genre: true,
            photos: true,
        },
    });
    return res.json(allShops);
});

app.get("/shop/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
        const shop = await prisma.shop.findUnique({
            where: {id},
            include: {
                location: true, 
                genre: true,
                photos: true,
            },
        });
        if (!shop) {
            return res.status(404).json({ message: "お店が見つかりませんでした。" });
        }
        return res.json(shop);
    } catch (error) {
        console.error("エラー:", error);
        return res.status(500).json({ message: "サーバーエラーが発生しました。" });
    }
});




app.listen(PORT, () => console.log("server is running"));
