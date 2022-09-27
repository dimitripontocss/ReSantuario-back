import app from "./index";

app.listen(process.env.PORT, () => {
    console.log(`Server on! na porta ${process.env.PORT}`);
});