const express = require("express")
const app =express()
const PORT = 3000

app.use(express.json())//parsear / traducir el req.body para que no sea undefined

app.use("/users",require("./routes/users.js"))
app.use("/posts",require("./routes/posts.js"))

app.listen(PORT,()=> console.log(`Servidor levantado en el puerto ${PORT}`))
