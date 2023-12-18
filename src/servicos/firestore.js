import { db } from "../config/firebase";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, onSnapshot } from "firebase/firestore";

export async function salvarTarefa(data){
    try{
        await addDoc(collection(db, 'tarefas'), data)
    } catch(error) {
        console.log('Erro:', error)
        return 'erro'
    }
}

export async function pegarTarefas(data){
    try{
        const querySnapshot = await getDocs(collection(db, "tarefas"));
        let tarefas= []
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            let tarefa = {id: doc.id, ...doc.data()}
            tarefas.push(tarefa)
        });
        return tarefas
    } catch(error) {
        console.log('Erro:', error);
        return [];
    }
}

export async function pegarTarefasTempoReal(setTarefas) {
    const ref = query(collection(db, "tarefas"))
    onSnapshot(ref, (querySnapshot) => {
        const tarefas = []
        querySnapshot.forEach(( doc ) => {
            tarefas.push({
                id:doc.id, ... doc.data()
            })
        })
        setTarefas(tarefas)
    })
}

export async function atualizarTarefa(tarefaID, data){
    try{
        const tarefaRef = doc(db, 'tarefas', tarefaID);
        await updateDoc(tarefaRef, data)
        return 'ok'
    } catch{
        return 'error'
    }
}

export async function deletarTarefa(tarefaID){
    try{
        const tarefaRef = doc(db, 'tarefas', tarefaID);
        await deleteDoc(tarefaRef)
        return 'ok'
    } catch{
        return 'error'
    }
}