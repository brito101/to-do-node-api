import { Request, Response } from "express"
import { Todo } from "../models/Todo"

export const ping = (req: Request, res: Response) => {
  res.json({ pong: true })
}

export const all = async (req: Request, res: Response) => {
  const list = await Todo.findAll()
  res.status(200)
  res.json({ list })
}

export const add = async (req: Request, res: Response) => {
  if (req.body.title) {
    let done = false
    if (req.body.done) {
      switch (req.body.done.toLowerCase()) {
        case "true":
        case "1":
          done = true
          break
        case "false":
        case "0":
          done = false
          break
      }
    }
    let todo = await Todo.create({
      title: req.body.title,
      done: done,
    })
    res.status(201)
    res.json({ item: todo })
  } else {
    res.status(406)
    res.json({ error: "Dados não enviados" })
  }
}

export const edit = async (req: Request, res: Response) => {
  let id = req.params.id
  let todo = await Todo.findByPk(id)
  if (todo) {
    if (req.body.title) {
      todo.title = req.body.title
    }
    if (req.body.done) {
      switch (req.body.done.toLowerCase()) {
        case "true":
        case "1":
          todo.done = true
          break
        case "false":
        case "0":
          todo.done = false
          break
      }
    }
    await todo.save()
    res.status(202)
    res.json({ item: todo })
  } else {
    res.status(204)
    res.json({ error: "Tarefa não encontrada" })
  }
}

export const remove = async (req: Request, res: Response) => {
  let { id } = req.params
  let todo = await Todo.findByPk(id)
  if (todo) {
    await todo.destroy()
    res.status(202)
    res.json({ message: "Tarefa deleteda" })
  } else {
    res.status(204)
    res.json({ error: "Tarefa não encontrada" })
  }
}
