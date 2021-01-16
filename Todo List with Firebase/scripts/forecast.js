class Forecast{
    constructor(){
        this.conn = db.collection('todos')
    }

    async init(callback){
        await this.conn.onSnapshot(snapshot =>{
            callback(snapshot.docChanges());
        })
    }

    async addTodo(todo){
       await this.conn.add({
            title: todo
        }).then(() =>{
            console.log("Todo was added")
        })
    }

    async removeTodo(id){
        await this.conn.doc(id).delete().then(()=>{
            console.log('Todo was deleted')
        })
    }


    
}