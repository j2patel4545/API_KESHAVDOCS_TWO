import mongoose from "mongoose";

const STATUS = ["pending", "in-progress", "completed"];
const PRIORITY = ["low", "medium", "high"];

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    status: {
      type: String,
      enum: STATUS,
      default: "pending",
    },
    priority: {
      type: String,
      enum: PRIORITY,
      default: "medium",
    },
    dueDate: {
      type: Date,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt
  }
);

// Virtual field to check if Todo is overdue
todoSchema.virtual("isOverdue").get(function () {
  return this.dueDate ? new Date() > this.dueDate && this.status !== "completed" : false;
});

// Pre-save hook (async/await safe)
todoSchema.pre("save", async function () {
  console.log(`Saving Todo: ${this.title}`);
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
