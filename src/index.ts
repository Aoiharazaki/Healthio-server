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
            location: true, // locationId に紐づく location を取得
            genre: true,    // genreId に紐づく genre を取得
            photos:true,
        },
    });
    return res.json(allShops);
});


// app.post("/createShop", async (req: Request, res: Response) => {
//     const { name,  } = req.body;
//     const createTodo = await prisma.todo.create({
//         data:{
//             name,
//             isCompleted,
//         },
//     });
//     return res.json(createTodo);
// });


// app.post("/createShop", async (req: Request, res: Response) => {
//     try {
//         const {
//             name,
//             locationId, // LocationのID (オプショナル)
//             description, // 説明 (オプショナル)
//             genreId, // GenreのID (オプショナル)
//             photos, // 写真のURLリスト (オプショナル)
//         } = req.body;

//         // `Shop` レコードを作成
//         const createShop = await prisma.shop.create({
//             data: {
//                 name,
//                 locationId, // NULL許可されているので、指定しなくてもOK
//                 description,
//                 genreId,
//                 photos: {
//                     create: photos?.map((url: string) => ({
//                         url,
//                     })) || [], // photosが存在する場合のみPhotoを作成
//                 },
//             },
//             include: {
//                 photos: true, // 作成したPhotoも含めて返す
//             },
//         });

//         return res.json(createShop);
//     } catch (error) {
//         console.error("Error creating shop:", error);
//         return res.status(500).json({ error: "Failed to create shop" });
//     }
// });



// app.put("/editShop/:id", async (req: Request, res: Response) => {
//     const id = Number(req.params.id);
//     const { title, isCompleted } = req.body;
//     const editTodo = await prisma.todo.update({
//         where: { id },
//         data:{
//             title,
//             isCompleted,
//         },
//     });
//     return res.json(editTodo);
// });

// app.delete("/deleteShop/:id", async (req: Request, res: Response) => {
//     const id = Number(req.params.id);
//     const deleteTodo = await prisma.todo.delete({
//         where: { id },
//     });
//     return res.json(deleteTodo);
// });



app.listen(PORT, () => console.log("server is running"));
