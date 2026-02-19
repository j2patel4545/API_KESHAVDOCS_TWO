import Todo from "../modules/TodoSchema.js";

export const createTodo = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate, tags } = req.body;

    const todo = new Todo({
      title,
      description,
      status,
      priority,
      dueDate,
      tags,
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    next(error);
  }
};

export const getTodos = async (req, res, next) => {
  try {
    const { status, tag } = req.query;
    let filter = { isDeleted: false };

    if (status) filter.status = status;
    if (tag) filter.tags = tag;

    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.isDeleted) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.isDeleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const { title, description, status, priority, dueDate, tags } = req.body;

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (status !== undefined) todo.status = status;
    if (priority !== undefined) todo.priority = priority;
    if (dueDate !== undefined) todo.dueDate = dueDate;
    if (tags !== undefined) todo.tags = tags;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo || todo.isDeleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.isDeleted = true;
    await todo.save();

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};
